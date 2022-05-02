import { ComponentStory } from "@storybook/react";
import styled from "styled-components";

import Ticket from "../../interfaces/Ticket";
import Panel from "./Panel";

const items: Ticket[] = [
  { id: 1, name: "test ticket 1", description: "", order: 0 },
  { id: 2, name: "test ticket 2", description: "", order: 1 },
  { id: 3, name: "test ticket 3", description: "", order: 2 },
  { id: 4, name: "test ticket 4", description: "", order: 3 },
];

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
  items,
};

export const Draggable = Template.bind({});

Draggable.args = {
  ...Basic.args,
  title: "test panel with tickets",
  items,
  draggable: true,
};

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
