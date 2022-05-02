import Ticket from "./Ticket";

export default interface Column {
  id: number;
  name: string;
  order: number;
  tickets: Ticket[];
}
