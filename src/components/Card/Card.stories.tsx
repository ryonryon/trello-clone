import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";

import Card from "./Card";

export default {
  title: "Card",
  component: Card,
  argTypes: { onClick: { action: "clicked" } },
  args: {
    style: {
      width: "250px",
      height: "350px",
      backgroundColor: "white",
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <BackGround>
    <Card {...args} />
  </BackGround>
);

export const Basic = Template.bind({});

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
