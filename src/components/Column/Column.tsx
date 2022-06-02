import { CSSProperties } from "react";
import styled from "styled-components";

import { CREATE_TICKET, UPDATE_COLUMN_TITLE } from "../../api";
import { useMutation } from "../../hooks/useMutation";
import ColumnDefinition from "../../interfaces/Column";
import TicketDefinition from "../../interfaces/Ticket";
import Card from "../Card";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnFooter } from "./ColumnFooter";
import { ColumnBody, DnDColumnBody } from "./ColumnBody";

export interface ColumnProps {
  column: ColumnDefinition;
  draggable?: boolean;
  onEditClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default function Column({ column, draggable, onEditClick, className, style }: ColumnProps): JSX.Element {
  const { call: updateColumnTitle } = useMutation<ColumnDefinition>(UPDATE_COLUMN_TITLE(1, column.id), "PATCH");
  const { call: createTicket } = useMutation<TicketDefinition>(CREATE_TICKET(1, column.id), "POST");

  const handleTitleBlur = async (value: string) => {
    await updateColumnTitle({
      variables: { name: value },
    });
  };

  const handleAddTicket = async (value: string) => {
    await createTicket({
      variables: { name: value },
    });
  };

  return (
    <Root className={className} style={style}>
      <Container>
        <ColumnHeader title={column.name} onTitleBlur={handleTitleBlur} />
        {draggable ? (
          <DnDColumnBody title={column.name} columnId={column.id} tickets={column.tickets} onEditClick={onEditClick} />
        ) : (
          <ColumnBody tickets={column.tickets} onEditClick={onEditClick} />
        )}

        <ColumnFooter onAddTicket={handleAddTicket} />
      </Container>
    </Root>
  );
}

const Root = styled.div`
  min-width: 320px;
  margin-right: 12px;
  cursor: pointer;
`;

const Container = styled(Card)`
  width: 100%;
  background-color: #ebecf0;
`;
