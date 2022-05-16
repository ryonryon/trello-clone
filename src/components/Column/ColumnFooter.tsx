import styled from "styled-components";
import { Add, FileCopy } from "@material-ui/icons";

import Button from "../Button";
import IconButton from "../IconButton";

interface ColumnFooterProps {
  // This shouldn't be optional but we'll add API later so we can fix then I suppose.
  onAddTicket?: () => void;
}

export function ColumnFooter({ onAddTicket }: ColumnFooterProps): JSX.Element {
  return (
    <FooterBody onClick={onAddTicket}>
      <AddATicketButton title="Add a card" icon={<Add />} textLeft />
      <IconButton>
        <FileCopy />
      </IconButton>
    </FooterBody>
  );
}

const FooterBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const AddATicketButton = styled(Button)`
  width: 100%;
`;
