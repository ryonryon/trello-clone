import { ComponentStory } from "@storybook/react";
import styled from "styled-components";

import EditableTicket from "./EditableTicket";

export default {
  title: "EditableTicket",
  component: EditableTicket,
  argTypes: {
    onChange: { action: "input changed" },
    onEnter: { action: "entered" },
    onBlur: { action: "blurred" },
  },
  args: {
    placeholder: "placeholder",
  },
};

const Template: ComponentStory<typeof EditableTicket> = (args) => (
  <BackGround>
    <EditableTicket {...args} />
  </BackGround>
);

export const Basic = Template.bind({});

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
