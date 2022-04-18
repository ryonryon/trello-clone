import styled from "styled-components";
import IconButton from "./IconButton";

export default {
  title: "IconButton",
  component: IconButton,
};

export const Basic = () => (
  <BackGround>
    <IconButton style={{ width: "200px" }} />
  </BackGround>
);

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
