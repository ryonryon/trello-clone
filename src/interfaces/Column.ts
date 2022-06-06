import Project from "./Project";
import Ticket from "./Ticket";

/** Response shape from the server */
export interface ColumnResponse {
  id: number;
  name: string;
  sort: number;
  project: Project;
}

export default interface Column {
  id: number;
  name: string;
  order: number;
  tickets: Ticket[];
}
