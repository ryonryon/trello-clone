import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MoreHoriz } from "@material-ui/icons";
import styled from "styled-components";

import IconButton from "./IconButton";
import Button from "../Button";

export default {
  title: "IconButton",
  component: IconButton,
  argTypes: { onClick: { action: "clicked" } },
  args: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <BackGround>
    <IconButton {...args}>
      <MoreHoriz />
    </IconButton>
  </BackGround>
);

export const Basic = Template.bind({});

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
