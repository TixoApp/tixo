import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Spinner, Text, VStack } from "@chakra-ui/react";
import { Event } from "@utils/types";
import styles from "@styles/Home.module.css";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import TixoCollectionV1 from "@data/TixoCollectionV1.json";
import QRCode from "react-qr-code";
import ReactCardFlip from "react-card-flip";

const NFT_ADDRESS = process.env.NEXT_PUBLIC_TIXO_ADDRESS;
const CID = "";

export default function EventPage() {
  const { address } = useAccount();
  const { data: signer, isError } = useSigner();
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const [txnHash, setTxnHash] = useState<string>("");
  const [ticketId, setTicketId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleMintTicket = useCallback(async () => {
    setLoading(true);
    try {
      const contract = new ethers.Contract(
        NFT_ADDRESS,
        TixoCollectionV1.abi,
        signer
      );

      const txn = await contract.mintWithTokenURI(address, id, CID);
      const lastTicketId = await contract.getLastTicketId(id);

      const ticketId =
        parseInt(id as string) * 10 ** 5 + lastTicketId.toNumber() + 1;

      const newAttendees = JSON.parse(JSON.stringify(event.attendees));

      newAttendees[address] = {
        ticketId,
        status: "unused",
      };

      const updatedEvent = {
        ...event,
        attendees: newAttendees,
      };

      const response = await axios.put(
        `http://localhost:8888/updateEvent/${id}`,
        updatedEvent
      );

      console.log(response.data);

      setEvent(updatedEvent);
      setTxnHash(txn.hash);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [NFT_ADDRESS, address, signer]);

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const res = await axios.get(`http://localhost:8888/event/id/${id}`);
          setEvent(res.data.event);
          console.log(Object.keys(res.data.event.attendees));
          setTicketId(res.data.event.attendees[address].ticketId);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchEvent();
  }, [id]);

  const qrUrl = `http://192.168.1.6:3000/validate?eventId=${id}&ticketId=${ticketId}&address=${address}`;

  console.log(qrUrl);

  return (
    <main className={styles.main}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <VStack>
          {/* The front of the card */}
          {event ? (
            <>
              <Text>Event Name: {event.eventName}</Text>
              <Text>Description: {event.description}</Text>
              <Text>Hosted by: {event.hostName}</Text>
              <Text>Location: {event.location.label}</Text>
              <Text>Date: {event.date}</Text>
              <Text>Time: {event.time}</Text>
              <Text>
                Number of Tickets Remaining:{" "}
                {event.maxTickets - Object.keys(event.attendees).length}/
                {event.maxTickets}
              </Text>
              <Text>Cost per Ticket: {event.costPerTicket}</Text>
              <Text>Is Token Gated: {event.isTokenGated ? "Yes" : "No"}</Text>
              {!ticketId ? (
                <Button onClick={handleMintTicket} className={styles.button}>
                  {isLoading ? <Spinner color="black" /> : "Buy Ticket"}
                </Button>
              ) : (
                <Button onClick={handleFlip} className={styles.button}>
                  View ticket
                </Button>
              )}
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </VStack>

        <VStack>
          {/* The back of the card */}
          {ticketId && (
            <>
              <QRCode value={qrUrl} />
              <Button onClick={handleFlip} className={styles.button}>
                Go back
              </Button>
            </>
          )}
        </VStack>
      </ReactCardFlip>
    </main>
  );
}
