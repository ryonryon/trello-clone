import { ComponentStory } from "@storybook/react";
import styled from "styled-components";

import Panel from "./Panel";

export default {
  title: "Panel",
  component: Panel,
  argTypes: {
    onClick: { action: "onClick clicked" },
    onEditClick: { action: "onEditClick clicked" },
  },
  args: {
    title: "test panel",
  },
};

const Template: ComponentStory<typeof Panel> = (args) => (
  <BackGround>
    <Panel {...args} />
  </BackGround>
);

export const Basic = Template.bind({});

export const WithTickets = Template.bind({});

WithTickets.args = {
  ...Basic.args,
  title: "test panel with tickets",
  items: [
    { id: "id1", title: "test ticket 1" },
    { id: "id2", title: "test ticket 2" },
    { id: "id3", title: "test ticket 3" },
    { id: "id4", title: "test ticket 4" },
  ],
};

export const Draggable = Template.bind({});

Draggable.args = {
  ...Basic.args,
  title: "test panel with tickets",
  items: [
    { id: "id1", title: "test ticket 1" },
    { id: "id2", title: "test ticket 2" },
    { id: "id3", title: "test ticket 3" },
    { id: "id4", title: "test ticket 4" },
  ],
  draggable: true,
};

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
