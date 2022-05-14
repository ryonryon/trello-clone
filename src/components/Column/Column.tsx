import { CSSProperties, useState } from "react";
import styled from "styled-components";

import Card from "../Card";
import Ticket from "../../interfaces/Ticket";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnFooter } from "./ColumnFooter";
import { ColumnBody, DraggableColumnBody } from "./ColumnBody";

export interface ColumnProps {
  title: string;
  items?: Ticket[];
  draggable?: boolean;
  onEditClick?: () => void;
  onAddTicket?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default function Column({
  title,
  items = [],
  draggable,
  onEditClick,
  onAddTicket,
  className,
  style,
}: ColumnProps): JSX.Element {
  const [tickets, setTickets] = useState<Ticket[]>(items);

  return (
    <Body className={className} style={style}>
      <ColumnHeader title={title} />
      {draggable ? (
        <DraggableColumnBody setTickets={setTickets} title={title} tickets={tickets} onEditClick={onEditClick} />
      ) : (
        <ColumnBody tickets={tickets} onEditClick={onEditClick} />
      )}
      <ColumnFooter onAddTicket={onAddTicket} />
    </Body>
  );
}

const Body = styled(Card)`
  background-color: #ebecf0;
  min-width: 320px;
  padding: 4px;
  cursor: pointer;
`;
