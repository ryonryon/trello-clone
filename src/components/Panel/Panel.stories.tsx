import styled from "styled-components";
import Panel from "./Panel";

export default {
  title: "Panel",
  component: Panel,
  argTypes: {
    onClick: { action: "onClick clicked" },
    onEditClick: { action: "onEditClick clicked" },
  },
};

export const Basic = (): JSX.Element => (
  <BackGround>
    <Panel title="test panel" />
  </BackGround>
);

export const WithTickets = (): JSX.Element => (
  <BackGround>
    <Panel
      title="test panel with tickets"
      items={[
        { id: "id1", title: "test ticket 1" },
        { id: "id2", title: "test ticket 2" },
        { id: "id3", title: "test ticket 3" },
        { id: "id4", title: "test ticket 4" },
      ]}
    />
  </BackGround>
);

export const Draggable = (): JSX.Element => (
  <BackGround>
    <Panel
      title="test panel with tickets"
      items={[
        { id: "id1", title: "test ticket 1" },
        { id: "id2", title: "test ticket 2" },
        { id: "id3", title: "test ticket 3" },
        { id: "id4", title: "test ticket 4" },
      ]}
      draggable
    />
  </BackGround>
);

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
