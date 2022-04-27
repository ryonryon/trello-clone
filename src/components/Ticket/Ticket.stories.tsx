import styled from "styled-components";
import Ticket from "./Ticket";

export default {
  title: "Ticket",
  component: Ticket,
  argTypes: {
    onClick: { action: "onClick clicked" },
    onEditClick: { action: "onEditClick clicked" },
  },
};

export const Basic = (): JSX.Element => (
  <BackGround>
    <Ticket id="test1" title="test" style={{ width: "300px" }} />
  </BackGround>
);

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
