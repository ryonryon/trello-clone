import Column from "../interfaces/Column";
import Project from "../interfaces/Project";

// state
const initialState: Project = {
  id: -1,
  name: "",
  columns: [],
};

// actions
const ACTIONS = {
  UPDATED_PROJECT: "@PROJECT/UPDATED_PROJECT",
  UPDATED_COLUMN: "@PROJECT/UPDATED_COLUMN",
  ADDED_NEW_COLUMN: "@PROJECT/ADD_NEW_COLUMN",
} as const;

/**
 * An action to update project. It will replace entire project with passed value
 */
const updatedProject = (project: Project) =>
  ({
    type: ACTIONS.UPDATED_PROJECT,
    payload: project,
  } as const);

/**
 * An action to update column. It will replace entire column with passed value
 */
const updatedColumn = (column: Column[]) =>
  ({
    type: ACTIONS.UPDATED_COLUMN,
    payload: column,
  } as const);

/**
 * An action to add new column to the end of `column` array of project
 */
const addedNewColumn = (newColumn: Column) =>
  ({
    type: ACTIONS.ADDED_NEW_COLUMN,
    payload: newColumn,
  } as const);

// reducers

/**
 * Types for actions passed to the reducer.
 * Make sure to add one here when you create new action to make reducer smart with typescript
 */
type PassedActions =
  | ReturnType<typeof addedNewColumn>
  | ReturnType<typeof updatedProject>
  | ReturnType<typeof updatedColumn>;

/**
 * Reducer of the Project store. You shouldn't need this function to be imported when you want to change state in context.
 * import an action and use it with `dispatch` which is also passed by context.
 */
function reducer(state: Project, action: PassedActions): Project {
  switch (action.type) {
    case ACTIONS.UPDATED_PROJECT:
      return { ...state, ...action.payload };
    case ACTIONS.ADDED_NEW_COLUMN:
      return { ...state, columns: [...state.columns, action.payload] };
    case ACTIONS.UPDATED_COLUMN:
      return { ...state, columns: action.payload };
    default:
      return { ...state };
  }
}

export { initialState, ACTIONS, PassedActions, addedNewColumn, updatedColumn, updatedProject, reducer };
