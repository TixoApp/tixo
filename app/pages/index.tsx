import { useContext, useState } from "react";
import styles from "@styles/Home.module.css";
import { useAccount, useSigner } from "wagmi";
import {
  VStack,
  Input,
  Textarea,
  Switch,
  Button,
  Text,
  Spinner,
  HStack,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { Event } from "@utils/types";
import { ethers } from "ethers";
import TixoCollectionV1 from "@data/TixoCollectionV1.json";
import Landing from "@components/Landing";
import { ImageContext } from "./_app";

const NFT_ADDRESS = process.env.NEXT_PUBLIC_TIXO_ADDRESS;

function ImageSelector() {
  const images = ["/0.jpg", "/1.png", "/2.jpg", "/3.jpg"];
  const { setSelectedImage } = useContext(ImageContext);

  return (
    <VStack className={styles.inputContainer}>
      <Text>Select background</Text>
      <HStack>
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt=""
            onClick={() => setSelectedImage(image)}
            style={{ cursor: "pointer" }}
            className={styles.imageSelection}
          />
        ))}
      </HStack>
    </VStack>
  );
}

function App() {
  const { address } = useAccount();
  const { data: signer, isError } = useSigner();
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [hostName, setHostName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxTickets, setMaxTickets] = useState(100);
  const [costPerTicket, setCostPerTicket] = useState(0);
  const [isTokenGated, setIsTokenGated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [eventId, setEventId] = useState("");
  const [uploadedImage, setUploadedImage] = useState<Blob>();

  // maybe save metadata on-chain via IPFS
  const createEvent = async () => {
    setLoading(true);

    try {
      const contract = new ethers.Contract(
        NFT_ADDRESS,
        TixoCollectionV1.abi,
        signer
      );

      const lastEventIdBN = await contract.getLastEventId();

      // TODO: denominate in ETH
      const txnResult = await contract.createEvent(costPerTicket, maxTickets);

      const event: Event = {
        eventName,
        description,
        hostName,
        hostId: address,
        location,
        date,
        time,
        maxTickets,
        costPerTicket,
        isTokenGated,
        attendees: {},
        creationTxn: txnResult,
        eventId: String(lastEventIdBN.toNumber() + 1),
      };

      const response = await axios.post(
        "http://localhost:8888/createEvent",
        event
      );
      console.log(response.data);
      setEventId(response.data.eventId);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function handleImageUpload(e) {
    setUploadedImage(e.target.files[0]);
  }

  if (!address) return <Landing />;

  if (isSuccess)
    return (
      <main className={styles.main}>
        <Text>Event Created Successfully</Text>
        <Link href={`/event/${eventId}`}>
          <Button className={styles.button}>Go to event</Button>
        </Link>
      </main>
    );

  return (
    <main className={styles.main}>
      <VStack gap={5}>
        <HStack alignItems="flex-start" gap={10}>
          <VStack height="600px" overflowY="scroll">
            <VStack className={styles.inputContainer}>
              <Text>Event Title</Text>
              <Input
                className={styles.input}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text>Description</Text>
              <Textarea
                className={styles.input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text>Hosted by</Text>
              <Input
                className={styles.input}
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text>Location</Text>
              <Input
                className={styles.input}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text>Date</Text>
              <Input
                type="date"
                className={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text>Time</Text>
              <Input
                type="time"
                className={styles.input}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text>Number of Spots</Text>
              <Input
                className={styles.input}
                value={maxTickets}
                onChange={(e) => setMaxTickets(Number(e.target.value))}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text>Cost per ticket</Text>
              <Input
                className={styles.input}
                value={costPerTicket}
                onChange={(e) => setCostPerTicket(Number(e.target.value))}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text>Is Token Gated</Text>
              <Switch
                className={styles.input}
                isChecked={isTokenGated}
                onChange={(e) => setIsTokenGated(e.target.checked)}
              ></Switch>
            </VStack>
          </VStack>
          <VStack gap={5}>
            {!uploadedImage ? (
              <VStack className={styles.inputContainer}>
                <Text>Image</Text>
                <VStack className={styles.imageUploadContainer}>
                  <input
                    type="file"
                    name="images"
                    id="images"
                    required
                    multiple
                    onChange={handleImageUpload}
                    className={styles.imageInput}
                  />
                  <VStack className={styles.imageInputText}>
                    {/* <Image
                  alt="upload"
                  src="/upload.png"
                  className={styles.imageUploaderIcon}
                ></Image> */}
                    <Text className={styles.uploaderTitle3}>Upload image</Text>
                    <Text className={styles.uploaderTitle4}>
                      File types supported: jpg, png, svg
                    </Text>
                    <Text className={styles.uploaderSubtitle}>
                      Max size: 35MB
                    </Text>
                  </VStack>
                </VStack>
              </VStack>
            ) : (
              <Image
                alt="preview"
                src={uploadedImage ? URL.createObjectURL(uploadedImage) : ""}
                className={styles.previewContainer}
              ></Image>
            )}
            <ImageSelector />
          </VStack>
        </HStack>
        <Button onClick={createEvent} className={styles.button}>
          {isLoading ? <Spinner color="black" /> : "Create Event"}
        </Button>
      </VStack>
    </main>
  );
}

/*

- event name
- description
- hosted by ___
- location
- date
- time
- # of spots
- cost per ticket
- token gated

*/

export default App;
