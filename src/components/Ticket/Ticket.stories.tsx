import { ComponentStory } from "@storybook/react";
import styled from "styled-components";

import Ticket from "./Ticket";

export default {
  title: "Ticket",
  component: Ticket,
  argTypes: {
    onClick: { action: "onClick clicked" },
    onEditClick: { action: "onEditClick clicked" },
  },
  args: {
    id: "test1",
    title: "Test",
    style: { width: "300px", height: "100px" },
  },
};

const Template: ComponentStory<typeof Ticket> = (args) => (
  <BackGround>
    <Ticket {...args} />
  </BackGround>
);

export const Basic = Template.bind({});

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
