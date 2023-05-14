import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import fs from "fs";
import { Web3Storage, File, Blob } from "web3.storage";
import { MongoClient, ServerApiVersion } from "mongodb";
import { createClient } from "pexels";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8888;

const WEB3_STORAGE_API_KEY = process.env.WEB3_STORAGE_API_KEY ?? "";
const MONGO_USER = process.env.MONGO_USER ?? "";
const MONGO_PW = process.env.MONGO_PW ?? "";

const client = new Web3Storage({
  token: WEB3_STORAGE_API_KEY,
  endpoint: new URL("https://api.web3.storage"),
});

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@cluster0.hsk5jk6.mongodb.net/?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

type Attendee = {
  ticketId: string;
  status: "used" | "unused";
};

type Event = {
  eventName: string;
  description: string;
  hostName: string;
  hostId: string;
  location: string;
  date: string;
  time: string;
  maxTickets: number;
  costPerTicket: number;
  isTokenGated: boolean;
  attendees: Record<string, Attendee>;
  creationTxn: any;
  eventId: string;
};

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/event/id/:id", async (req: Request, res: Response) => {
  try {
    await mongoClient.connect();

    const eventsCollection = await mongoClient.db("tixo").collection("events");

    const { id } = req.params;

    console.log("fetch requests for ", id);

    const event = await eventsCollection.findOne({ _id: id as any });

    console.log("made it");

    res.status(200).send({ message: "Event fetched successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Event fetching failed" });
  }
});

app.get("/event/address/:address", async (req: Request, res: Response) => {
  try {
    await mongoClient.connect();

    const eventsCollection = await mongoClient.db("tixo").collection("events");

    const { address } = req.params;

    console.log("fetch requests for ", address);

    const events = await eventsCollection
      .find({ [`attendees.${address}`]: { $exists: true } })
      .toArray();

    console.log("fetched events: ", events);

    res.status(200).send({ message: "Events fetched successfully", events });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Events fetching failed" });
  }
});

app.post("/createEvent", async (req: Request, res: Response) => {
  try {
    await mongoClient.connect();

    const eventsCollection = mongoClient.db("tixo").collection("events");

    const newEvent: Event = req.body;

    const event = {
      _id: newEvent.eventId,
      ...newEvent,
    };

    await eventsCollection.insertOne(event as any);

    res.status(200).send({
      message: "Event created successfully",
      eventId: newEvent.eventId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Event creation failed" });
  }
});

app.put("/updateEvent/:id", async (req: Request, res: Response) => {
  try {
    await mongoClient.connect();

    const eventsCollection = mongoClient.db("tixo").collection("events");

    const { id } = req.params;
    const eventUpdate = req.body;

    console.log(eventUpdate);

    const result = await eventsCollection.updateOne(
      { _id: id as any },
      { $set: eventUpdate }
    );

    if (result.matchedCount === 0) {
      res.status(404).send({ message: "No event with that ID was found." });
    } else {
      res.status(200).send({ message: "Event updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Event update failed" });
  }
});

app.post("/validateTicket", async (req: Request, res: Response) => {
  try {
    await mongoClient.connect();

    const eventsCollection = mongoClient.db("tixo").collection("events");

    const { eventId, ticketId, address } = req.body;

    console.log("event id, ticket id received: ", eventId, ticketId);

    const event: any = await eventsCollection.findOne({ _id: eventId as any });

    if (event.attendees[address].status === "used") {
      res.status(500).send({ message: "Ticket already used" });
      return;
    }

    const newEvent = JSON.parse(JSON.stringify(event));
    newEvent.attendees[address].status = "used";

    const result = await eventsCollection.updateOne(
      { _id: eventId as any },
      { $set: newEvent }
    );

    if (result.matchedCount === 0) {
      res
        .status(404)
        .send({ message: "No event with that ID and ticketId was found." });
    } else {
      res.status(200).send({ message: "Ticket validated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Ticket validation failed" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
