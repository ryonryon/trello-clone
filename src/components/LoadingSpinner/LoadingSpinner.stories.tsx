import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";

import LoadingSpinner from "./LoadingSpinner";

export default {
  title: "LoadingSpinner",
  component: LoadingSpinner,
  args: {},
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = () => (
  <BackGround>
    <Container>
      <LoadingSpinner size="S" />
    </Container>
    <Container>
      <LoadingSpinner size="M" />
    </Container>
    <Container>
      <LoadingSpinner size="L" />
    </Container>
  </BackGround>
);

export const Basic = Template.bind({});

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;

const Container = styled.div`
  padding: 15px;
  align-self: center;
`;
