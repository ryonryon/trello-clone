import styled from "styled-components";
import Panel from "../Panel";
import Project from "./Project";
import Ticket from "../Ticket";

export default {
  title: "Project",
  component: Project,
};

export const Basic = () => (
  <Project title="test">
    {/* <Panel title="test panel with tickets">
      <Ticket title="test ticket 1" />
      <Ticket title="test ticket 2" />
      <Ticket title="test ticket 3" />
      <Ticket title="test ticket 4" />
    </Panel>

    <Panel title="test panel with tickets">
      <Ticket title="test ticket 1" />
      <Ticket title="test ticket 2" />
    </Panel>

    <Panel title="test panel with tickets">
      <Ticket title="test ticket 3" />
      <Ticket title="test ticket 3" />
      <Ticket title="test ticket 4" />
    </Panel> */}
  </Project>
);
