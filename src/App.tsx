import { useEffect, useReducer } from "react";
import styled, { createGlobalStyle } from "styled-components";

import projectReducer from "./store";
import { GET_PROJECT_BY_ID } from "./api";
import { useFetch } from "./hooks/useFetch";
import { ProjectContext, ProjectReducerContext } from "./context/project";
import ProjectDefinition from "./interfaces/Project";

import LoadingSpinner from "./components/LoadingSpinner";
import Project from "./components/Project";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: Open Sans, Montserrat, Roboto;
}
`;

export default function App(): JSX.Element {
  const { data: projectResponse, isLoading } = useFetch<ProjectDefinition>(GET_PROJECT_BY_ID(1));
  const [project, dispatch] = useReducer(projectReducer.reducer, projectReducer.initialState);

  useEffect(() => {
    // once project has been fetched, it updates project which is used in the app as "state"
    projectResponse && dispatch(projectReducer.updatedProject(projectResponse));
  }, [projectResponse]);

  return (
    <Body>
      <GlobalStyle />
      {isLoading ? (
        <Container>
          <LoadingSpinner size="M" />
        </Container>
      ) : (
        <ProjectReducerContext.Provider value={dispatch}>
          <ProjectContext.Provider value={project}>
            <Project />
          </ProjectContext.Provider>
        </ProjectReducerContext.Provider>
      )}
    </Body>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  display: flex;
  height: 100vh;
`;
