import { MoreHoriz } from "@material-ui/icons";
import styled from "styled-components";

import EditableLabel from "../EditableLabel";
import IconButton from "../IconButton";

interface ColumnHeader {
  title: string;
}

export function ColumnHeader({ title }: ColumnHeader): JSX.Element {
  return (
    <HeaderBody>
      <EditableTitle value={title} />
      <IconButton>
        <MoreHoriz />
      </IconButton>
    </HeaderBody>
  );
}

const HeaderBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const EditableTitle = styled(EditableLabel)`
  width: 100%;
  font-weight: 600;
`;
