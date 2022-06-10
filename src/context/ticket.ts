import { createContext } from "react";

export const OnTicketClickContext = createContext<{ onTicketClick: (ticketId: number) => void } | undefined>({
  onTicketClick: () => {},
});
