import { CSSProperties, useState } from "react";
import styled from "styled-components";

import ColumnDefinition from "../../interfaces/Column";

import Card from "../Card";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnFooter } from "./ColumnFooter";
import { ColumnBody, DnDColumnBody } from "./ColumnBody";
import _EditableTicket from "../EditableTicket";

export interface ColumnProps {
  column: ColumnDefinition;
  draggable?: boolean;
  onEditClick?: () => void;
  onAddTicket?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}

export default function Column({
  column,
  draggable,
  onEditClick,
  onAddTicket = () => {},
  className,
  style,
}: ColumnProps): JSX.Element {
  const [isAddingTicket, setAddingTicket] = useState(false);

  const handleBlur = (value: string) => {
    onAddTicket(value);

    setAddingTicket(false);
  };

  const handleAddTicket = () => {
    setAddingTicket(true);
  };

  return (
    <Body className={className} style={style}>
      <Container>
        <ColumnHeader title={column.name} />
        {draggable ? (
          <DnDColumnBody title={column.name} columnId={column.id} tickets={column.tickets} onEditClick={onEditClick} />
        ) : (
          <ColumnBody tickets={column.tickets} onEditClick={onEditClick} />
        )}

        {isAddingTicket && <EditableTicket onBlur={handleBlur} />}

        <ColumnFooter onAddTicket={handleAddTicket} />
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

const EditableTicket = styled(_EditableTicket)`
  width: 100%;
`;
