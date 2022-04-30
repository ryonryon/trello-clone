import styled from "styled-components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Add } from "@material-ui/icons";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: { onClick: { action: "clicked. Args" } },
  args: {
    title: "Love!",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <BackGround>
    <Button {...args} />
  </BackGround>
);

export const Basic = Template.bind({});

export const WithIcon = Template.bind({});

WithIcon.args = {
  ...Basic.args,
  icon: <Add />,
};

export const WithIconAndTextLeft = Template.bind({});

WithIconAndTextLeft.args = {
  ...Basic.args,
  textLeft: true,
  icon: <Add />,
};

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
