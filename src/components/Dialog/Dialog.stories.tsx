import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";
import Button from "../Button";
import Card from "../Card";

import Dialog from "./Dialog";

export default {
  title: "Dialog",
  component: Dialog,
  argTypes: { onClose: { action: "clicked" } },
  args: {
    open: true,
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => (
  <BackGround>
    <Dialog {...args}>
      <Card
        style={{
          width: "350px",
          height: "150px",
          backgroundColor: "#fff",
        }}
      >
        <Container>
          <h4>Are you sure you want to continue?</h4>

          <Buttons>
            <Button title="CANCEL" />

            <Button title="SAVE" style={{ backgroundColor: "blue", color: "white", marginLeft: "24px" }} />
          </Buttons>
        </Container>
      </Card>
    </Dialog>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
