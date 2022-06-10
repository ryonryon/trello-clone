export const CREATE_TICKET = (projectId: number, columnId: number): string =>
  `http://localhost:5030/projects/${projectId}/columns/${columnId}/tickets`;
export const GET_TICKET_BY_ID = (projectId: number, ticketId: number): string =>
  `http://localhost:5030/projects/${projectId}/tickets/${ticketId}`;
