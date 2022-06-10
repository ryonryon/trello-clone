import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";

import Avatar from "./Avatar";

export default {
  title: "Avatar",
  component: Avatar,
  argTypes: {},
  args: {
    alt: "Test",
    src: "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg",
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <BackGround>
    <Container>
      <Avatar {...args} size="S" />
    </Container>
    <Container>
      <Avatar {...args} size="M" />
    </Container>
    <Container>
      <Avatar {...args} size="L" />
    </Container>
  </BackGround>
);

export const Basic = Template.bind({});

export const WithoutImage = Template.bind({});

WithoutImage.args = {
  alt: "Test",
  src: undefined,
};

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #ffffff;
  padding: 50px;
`;

const Container = styled.div`
  padding: 15px;
  align-self: center;
`;
