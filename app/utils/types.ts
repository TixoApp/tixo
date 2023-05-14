export type Attendee = {
  ticketId: string;
  status: "used" | "unused";
};

export type Event = {
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
