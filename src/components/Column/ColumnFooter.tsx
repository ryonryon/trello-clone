import { useState } from "react";
import styled from "styled-components";
import { Add, Close, FileCopy } from "@material-ui/icons";

import Button from "../Button";
import IconButton from "../IconButton";
import _EditableTicket from "../EditableTicket";

interface ColumnFooterProps {
  onAddTicket: (value: string) => void;
}

export function ColumnFooter({ onAddTicket }: ColumnFooterProps): JSX.Element {
  const [isAddingTicket, setAddingTicket] = useState(false);
  const [editableTicketValue, setEditableTicketValue] = useState("");

  const handleEditableTicket = (value: string) => {
    setEditableTicketValue(value);
  };

  const handleEnterKeyDown = (value: string) => {
    setAddingTicket(false);
    onAddTicket(value);
    setEditableTicketValue("");
  };

  const handleBlur = () => {
    setAddingTicket(false);
    setEditableTicketValue("");
  };

  const handleAddCardClick = () => {
    setAddingTicket(false);
    onAddTicket(editableTicketValue);
    setEditableTicketValue("");
  };

  const handleClose = () => {
    setAddingTicket(false);
    setEditableTicketValue("");
  };

  const handleAddTicketClick = () => {
    setAddingTicket(true);
  };

  return (
    <Root>
      <Container>
        {isAddingTicket && (
          <EditableTicket
            placeholder="Enter a title for this card..."
            value={editableTicketValue}
            onChange={handleEditableTicket}
            onEnter={handleEnterKeyDown}
            onBlur={handleBlur}
          />
        )}

        <Buttons>
          {isAddingTicket ? (
            <AddingTicketButtons>
              <AddCardButton title="Add card" onClick={handleAddCardClick} />

              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </AddingTicketButtons>
          ) : (
            <>
              <AddATicketButton title="Add a card" icon={<Add />} textLeft onClick={handleAddTicketClick} />

              <IconButton>
                <FileCopy />
              </IconButton>
            </>
          )}
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

const AddingTicketButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  & > * {
    margin-right: 4px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const AddCardButton = styled(Button)`
  background-color: #0179bf;
  color: #ffffff;

  &:hover {
    background-color: #026aa7;
  }
`;

const AddATicketButton = styled(Button)`
  width: 100%;
`;
