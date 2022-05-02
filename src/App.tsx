import { createGlobalStyle } from "styled-components";
import Panel from "./components/Panel";
import Project from "./components/Project";
import getProject from "./repositories/getProject";

const GlobalStyle = createGlobalStyle`
  font-family: Open Sans, Montserrat, Roboto
`;

export default function App(): JSX.Element {
  const project = getProject(1);

  return (
    <div>
      <GlobalStyle />

      <Project title={project.name}>
        {project.columns.map((column) => (
          <Panel key={`panel-${column.id}`} title={column.name} items={column.tickets} />
        ))}
      </Project>
    </div>
  );
}
