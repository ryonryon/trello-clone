import Column from "../interfaces/Column";

export default interface Project {
  id: number;
  name: string;
  columns: Column[];
}
