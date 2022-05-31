import { MoreHoriz } from "@material-ui/icons";
import styled from "styled-components";

import EditableLabel from "../EditableLabel";
import IconButton from "../IconButton";

interface ColumnHeader {
  title: string;
  onTitleBlur: (value: string) => void;
}

export function ColumnHeader({ title, onTitleBlur }: ColumnHeader): JSX.Element {
  return (
    <Root>
      <EditableTitle value={title} onBlur={onTitleBlur} />

      <IconButton>
        <MoreHoriz />
      </IconButton>
    </Root>
  );
}

const Root = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 4px 8px;
`;

const EditableTitle = styled(EditableLabel)`
  width: 100%;
  font-weight: 600;
`;
