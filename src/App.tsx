import styled, { createGlobalStyle } from "styled-components";

import ProjectDefinition from "./interfaces/Project";
import { useFetch } from "./hooks/useFetch";
import LoadingSpinner from "./components/LoadingSpinner";
import Panel from "./components/Panel";
import Project from "./components/Project";

const GlobalStyle = createGlobalStyle`
  font-family: Open Sans, Montserrat, Roboto
`;

export default function App(): JSX.Element {
  const { data: project, isLoading } = useFetch<ProjectDefinition>("http://localhost:5030/projects/1");

  return (
    <div>
      <GlobalStyle />
      {isLoading || !project ? (
        <Container>
          <LoadingSpinner size="M" />
        </Container>
      ) : (
        <Project title={project.name}>
          {project.columns.map((column) => (
            <Panel key={`panel-${column.id}`} title={column.name} items={column.tickets} />
          ))}
        </Project>
      )}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
