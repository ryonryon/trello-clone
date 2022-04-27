import styled from "styled-components";
import { MoreHoriz } from "@material-ui/icons";
import IconButton from "./IconButton";

export default {
  title: "IconButton",
  component: IconButton,
};

export const Basic = (): JSX.Element => (
  <BackGround>
    <IconButton>
      <MoreHoriz />
    </IconButton>
  </BackGround>
);

const BackGround = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #f9f9f9;
  padding: 50px;
`;
