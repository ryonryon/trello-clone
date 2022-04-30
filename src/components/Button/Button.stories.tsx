import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Add } from "@material-ui/icons";
import styled from "styled-components";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: { onClick: { action: "clicked" } },
  args: {
    title: "Submit",
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
