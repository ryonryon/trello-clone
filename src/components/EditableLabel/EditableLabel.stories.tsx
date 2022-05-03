import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";
import EditableLabel from "./EditableLabel";

export default {
  title: "EditableLabel",
  component: EditableLabel,
  argTypes: { onBlur: { action: "blured" } },
  args: {
    value: "editable label",
  },
} as ComponentMeta<typeof EditableLabel>;

const Template: ComponentStory<typeof EditableLabel> = (args) => (
  <BackGround>
    <EditableLabel {...args} />
  </BackGround>
);

export const Basic = Template.bind({});

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
