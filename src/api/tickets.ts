export const CREATE_TICKET = (projectId: number, columnId: number): string =>
  `http://localhost:5030/projects/${projectId}/columns/${columnId}/tickets`;
