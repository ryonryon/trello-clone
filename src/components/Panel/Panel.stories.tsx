import styled from "styled-components";
import Ticket from "../Ticket";
import Panel from "./Panel";

export default {
  title: "Panel",
  component: Panel,
  argTypes: {
    onClick: { action: "onClick clicked" },
    onEditClick: { action: "onEditClick clicked" },
  },
};

export const Basic = () => (
  <BackGround>
    <Panel title="test panel" />
  </BackGround>
);

export const WithTickets = () => (
  <BackGround>
    <Panel title="test panel with tickets">
      <Ticket title="test ticket 1" />
      <Ticket title="test ticket 2" />
      <Ticket title="test ticket 3" />
    </Panel>
  </BackGround>
);

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
