import { CSSProperties, useState } from "react";
import styled from "styled-components";

import Card from "../Card";
import Ticket from "../../interfaces/Ticket";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnFooter } from "./ColumnFooter";
import { ColumnBody, DnDColumnBody } from "./ColumnBody";

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
      <Container>
        <ColumnHeader title={title} />
        {draggable ? (
          <DnDColumnBody setTickets={setTickets} title={title} tickets={tickets} onEditClick={onEditClick} />
        ) : (
          <ColumnBody tickets={tickets} onEditClick={onEditClick} />
        )}
        <ColumnFooter onAddTicket={onAddTicket} />
      </Container>
    </Body>
  );
}

const Body = styled(Card)`
  min-width: 320px;
  margin-right: 12px;
  cursor: pointer;
`;

const Container = styled.div`
  background-color: #ebecf0;
`;
