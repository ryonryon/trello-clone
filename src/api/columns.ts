export const UPDATE_COLUMN_TITLE = (projectId: number, columnId: number): string =>
  `http://localhost:5030/projects/${projectId}/columns/${columnId}`;
