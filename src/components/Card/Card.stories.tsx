import styled from "styled-components";
import Card from "./Card";

export default {
  title: "Card",
  component: Card,
};

export const Basic = () => (
  <BackGround>
    <Card
      style={{
        width: "250px",
        height: "350px",
        backgroundColor: "white",
      }}
    />
  </BackGround>
);

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
