import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Spinner, Text } from "@chakra-ui/react";

export default function ValidateTicket() {
  const router = useRouter();
  const [validationStatus, setValidationStatus] = useState(
    "Validating ticket..."
  );

  useEffect(() => {
    const validateTicket = async () => {
      const { eventId, ticketId, address } = router.query;

      if (eventId && ticketId && address) {
        try {
          const response = await axios.post(
            "http://localhost:8888/validateTicket",
            {
              eventId: eventId as string,
              ticketId: ticketId as string,
              address: address as string,
            }
          );

          if (response.data.message === "Ticket validated successfully") {
            setValidationStatus("Ticket validated.");
          } else {
            setValidationStatus("Ticket validation failed.");
          }
        } catch (error) {
          console.error(error);
          setValidationStatus("Ticket validation failed.");
        }
      }
    };

    validateTicket();
  }, [router.query]);

  return (
    <Box padding="6" boxShadow="lg" bg="white">
      {validationStatus === "Validating ticket..." ? <Spinner /> : null}
      <Text>{validationStatus}</Text>
    </Box>
  );
}
