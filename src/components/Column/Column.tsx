import { CSSProperties } from "react";
import styled from "styled-components";

import ColumnDefinition from "../../interfaces/Column";

import Card from "../Card";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnFooter } from "./ColumnFooter";
import { ColumnBody, DnDColumnBody } from "./ColumnBody";

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
  onAddTicket,
  className,
  style,
}: ColumnProps): JSX.Element {
  return (
    <Root className={className} style={style}>
      <Container>
        <ColumnHeader title={column.name} />
        {draggable ? (
          <DnDColumnBody title={column.name} columnId={column.id} tickets={column.tickets} onEditClick={onEditClick} />
        ) : (
          <ColumnBody tickets={column.tickets} onEditClick={onEditClick} />
        )}

        <ColumnFooter onAddTicket={onAddTicket} />
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
