import { ComponentStory } from "@storybook/react";
import styled from "styled-components";

import Column from "../Column";
// import Project from "./Project";
// import Ticket from "../Ticket";

// export default {
//   title: "Project",
//   component: Project,
//   argTypes: {
//     onClick: { action: "onClick clicked" },
//     onEditClick: { action: "onEditClick clicked" },
//   },
//   args: {
//     title: "test panel",
//   },
// };

const Template: ComponentStory<typeof Column> = (args) => (
  <BackGround>
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
  </BackGround>
);

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
