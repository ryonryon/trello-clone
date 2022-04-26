import { createContext } from "react";

export interface TicketDraggable {
  draggable: boolean;
}

export default createContext<TicketDraggable>({
  draggable: false,
});
