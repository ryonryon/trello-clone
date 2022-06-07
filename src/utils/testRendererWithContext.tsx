import { useReducer } from "react";
import { ProjectContext, ProjectReducerContext } from "../context/project";
import { MOCKED_PROJECT } from "../components/Project/constants";
import projectReducer from "../store";

/**
 * A test renderer to pass mocked project via context. Use this component if your component grabs value from context
 */
export function TestRendererWithContext({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  const [project, dispatch] = useReducer(projectReducer.reducer, MOCKED_PROJECT);

  return (
    <ProjectReducerContext.Provider value={dispatch}>
      <ProjectContext.Provider value={project}>{children}</ProjectContext.Provider>
    </ProjectReducerContext.Provider>
  );
}
