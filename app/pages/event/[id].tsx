import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Button,
  HStack,
  Spinner,
  Text,
  VStack,
  Image,
  Box,
} from "@chakra-ui/react";
import { Event } from "@utils/types";
import styles from "@styles/Home.module.css";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import TixoCollectionV1 from "@data/TixoCollectionV1.json";
import QRCode from "react-qr-code";
import ReactCardFlip from "react-card-flip";
import { format } from "date-fns";
import { FaMapMarkerAlt, FaSmile } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { ImageContext } from "pages/_app";
import withTransition from "@components/withTransition";

const NFT_ADDRESS = process.env.NEXT_PUBLIC_TIXO_ADDRESS;
const CID = "";

function EventPage() {
  const { address } = useAccount();
  const { data: signer, isError } = useSigner();
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const [txnHash, setTxnHash] = useState<string>("");
  const [ticketId, setTicketId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const toast = useToast();
  const { setSelectedImage } = useContext(ImageContext);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 500;

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

  useEffect(() => {
    if (event && event.bgImage) {
      setSelectedImage("/3-mobile.png");
    }
  }, [event]);

  const handleShareEvent = () => {
    const copyShareMessage = `Check out this event on TIXO: ${window.location.href}`;

    navigator.clipboard
      .writeText(copyShareMessage)
      .then(() => {
        toast({
          title: "Success",
          description: "Event URL copied to clipboard!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Error",
          description: "Failed to copy URL",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const qrUrl = `http://192.168.1.6:3000/validate?eventId=${id}&ticketId=${ticketId}&address=${address}`;

  const formattedTime = useMemo(() => {
    if (!event) return "";

    return new Date(event.date * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
  }, [event]);

  console.log(qrUrl);

  return (
    <main className={styles.main}>
      {!isMobile ? (
        event ? (
          <HStack>
            <VStack alignItems="flex-start" gap={3} maxWidth="500px">
              <Text className={styles.eventTitle}>{event.eventName}</Text>
              <VStack alignItems="flex-start">
                <Text className={styles.eventDate}>
                  {format(new Date(event.date), "eeee, MMMM do")}
                </Text>
                <Text className={styles.eventTime}>{formattedTime}</Text>
              </VStack>

              <VStack alignItems="flex-start">
                <HStack>
                  <FaSmile />
                  <Text>
                    Hosted by{" "}
                    <span className={styles.eventHost}>
                      {event.hostName.toLocaleUpperCase()}
                    </span>
                  </Text>
                </HStack>
                <HStack>
                  <FaMapMarkerAlt />
                  <Text className={styles.eventLocation}>
                    {" "}
                    {event.location.value.structured_formatting.main_text}
                  </Text>
                </HStack>
              </VStack>
              <Text>{event.description}</Text>
              <VStack alignItems="flex-start">
                <Text>
                  Number of Tickets Remaining:{" "}
                  {event.maxTickets - Object.keys(event.attendees).length}/
                  {event.maxTickets}
                </Text>
                <Text>Cost per Ticket: {event.costPerTicket}</Text>
              </VStack>
              {/* <Text>Is Token Gated: {event.isTokenGated ? "Yes" : "No"}</Text> */}
              <HStack gap={1}>
                {!ticketId ? (
                  <Button onClick={handleMintTicket} className={styles.button}>
                    {isLoading ? <Spinner color="black" /> : "Buy Ticket"}
                  </Button>
                ) : (
                  <Button onClick={handleFlip} className={styles.button}>
                    View ticket
                  </Button>
                )}
                <Button onClick={handleShareEvent} className={styles.button}>
                  Share Event
                </Button>
              </HStack>
            </VStack>
            <VStack>
              <Image src="/image.jpg" className={styles.eventImage} />
            </VStack>
          </HStack>
        ) : (
          <Text>Loading...</Text>
        )
      ) : (
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          containerStyle={{ height: "100vh" }}
        >
          <VStack w="100%">
            <Image w="100%" src="/ticket.png" position="absolute" h="95vh" />
            {/* The front of the card */}
            {event ? (
              <VStack className={styles.contentContainer} gap={1}>
                <Image src="/image.jpg" />
                <Text className={styles.eventHeaderMobile}>Event:</Text>
                <Text className={styles.eventTitleMobile}>
                  {event.eventName}
                </Text>
                <VStack alignItems="flex-start">
                  <Text className={styles.eventDateMobile}>
                    {format(new Date(event.date), "eeee, MMMM do")}
                  </Text>
                  <Text className={styles.eventTimeMobile}>
                    {formattedTime}
                  </Text>
                </VStack>
                <VStack alignItems="flex-start">
                  <HStack>
                    <FaSmile />
                    <Text className={styles.eventHostMobile}>
                      Hosted by{" "}
                      <span>{event.hostName.toLocaleUpperCase()}</span>
                    </Text>
                  </HStack>
                  <HStack>
                    <FaMapMarkerAlt />
                    <Text className={styles.eventLocationMobile}>
                      {event.location.value.structured_formatting.main_text}
                    </Text>
                  </HStack>
                </VStack>
                <Text className={styles.eventDescMobile}>
                  {event.description}
                </Text>
                <VStack alignItems="flex-start">
                  <Text className={styles.eventDescMobile}>
                    Tickets Remaining:{" "}
                    {event.maxTickets - Object.keys(event.attendees).length}/
                    {event.maxTickets}
                  </Text>
                  <Text className={styles.eventDescMobile}>
                    Cost per Ticket: {event.costPerTicket}
                  </Text>
                </VStack>
                <VStack w="100%" pt="10px">
                  {!ticketId ? (
                    <Button
                      onClick={handleMintTicket}
                      className={styles.button}
                    >
                      {isLoading ? <Spinner color="black" /> : "Buy Ticket"}
                    </Button>
                  ) : (
                    <Button onClick={handleFlip} className={styles.button}>
                      View ticket
                    </Button>
                  )}
                </VStack>
              </VStack>
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
      )}
      {isMobile && (
        <HStack className={styles.navbar}>
          <Text className={styles.poweredBy}>
            Powered by <span className={styles.logo}>TIXO</span>
          </Text>
        </HStack>
      )}
    </main>
  );
}

export default withTransition(EventPage);
