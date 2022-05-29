import { useState } from "react";
import styled from "styled-components";
import { Add, FileCopy } from "@material-ui/icons";

import Button from "../Button";
import IconButton from "../IconButton";
import _EditableTicket from "../EditableTicket";

interface ColumnFooterProps {
  // This shouldn't be optional but we'll add API later so we can fix then I suppose.
  onAddTicket?: (value: string) => void;
}

export function ColumnFooter({ onAddTicket = () => {} }: ColumnFooterProps): JSX.Element {
  const [isAddingTicket, setAddingTicket] = useState(false);

  const handleBlur = (value: string) => {
    onAddTicket(value);

    setAddingTicket(false);
  };

  const handleAddTicket = () => {
    setAddingTicket(true);
  };

  return (
    <Root>
      <Container>
        {isAddingTicket && <EditableTicket placeholder="Enter a title for this card..." onBlur={handleBlur} />}

        <Buttons onClick={handleAddTicket}>
          <AddATicketButton title="Add a card" icon={<Add />} textLeft />

          <IconButton>
            <FileCopy />
          </IconButton>
        </Buttons>
      </Container>
    </Root>
  );
}

const Root = styled.div`
  width: 100%;
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 4px 8px;

  & > div {
    margin-bottom: 8px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;

const EditableTicket = styled(_EditableTicket)`
  width: 100%;
`;

const Buttons = styled.div`
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
