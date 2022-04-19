import styled from "styled-components";
import { Add } from "@material-ui/icons";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Basic = () => (
  <BackGround>
    <Button title="Submit" />
  </BackGround>
);

export const WithIcon = () => (
  <BackGround>
    <Button title="Submit" icon={<Add />} />
  </BackGround>
);

export const WithIconAndTextLeft = () => (
  <BackGround>
    <Button title="Submit" icon={<Add />} textLeft />
  </BackGround>
);

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
