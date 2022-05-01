import styled from "styled-components";
import EditableLabel from "./EditableLabel";

export default {
  title: "EditableLabel",
  component: EditableLabel,
};

export const Basic = (): JSX.Element => (
  <BackGround>
    <EditableLabel
      value="editable label"
      onBlur={(value) => {
        console.log(value);
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
