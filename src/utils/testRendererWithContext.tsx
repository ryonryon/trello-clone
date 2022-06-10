import { useReducer } from "react";
import { ProjectContext, ProjectReducerContext } from "../context/project";
import { OnTicketClickContext } from "../context/ticket";
import { MOCKED_PROJECT } from "../components/Project/constants";
import projectReducer from "../store";

/**
 * A test renderer to pass mocked project via context. Use this component if your component grabs value from context
 */
export function TestRendererWithProjectContext({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  const [project, dispatch] = useReducer(projectReducer.reducer, MOCKED_PROJECT);

  return (
    <ProjectReducerContext.Provider value={dispatch}>
      <ProjectContext.Provider value={project}>{children}</ProjectContext.Provider>
    </ProjectReducerContext.Provider>
  );
}

/**
 * A test renderer to pass mocked project and onTicketClick via context. Use this component if your component grabs value from context
 */
export function TestRendererWithProjectAndOnTicketClickContext({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const [project, dispatch] = useReducer(projectReducer.reducer, MOCKED_PROJECT);

  return (
    <ProjectReducerContext.Provider value={dispatch}>
      <ProjectContext.Provider value={project}>
        <OnTicketClickContext.Provider value={{ onTicketClick: () => {} }}>{children}</OnTicketClickContext.Provider>
      </ProjectContext.Provider>
    </ProjectReducerContext.Provider>
  );
}
