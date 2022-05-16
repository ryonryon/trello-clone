import { CSSProperties } from "react";
import styled from "styled-components";
import { Draggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { Edit, Notes } from "@material-ui/icons";

import Card from "../Card";
import IconButton from "../IconButton";

function getItemStyle(
  isDragging: boolean,
  draggableStyle?: DraggingStyle | NotDraggingStyle | undefined,
): CSSProperties {
  return {
    userSelect: "none",
    background: isDragging ? "lightgreen" : "inherited",
    ...draggableStyle,
  };
}

export interface TicketProps {
  title: string;
  description?: string;
  onClick?: () => void;
  onEditClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export interface DraggableTicketProps extends TicketProps {
  id: number;
  index: number;
}

export function Ticket({ title, description, onEditClick, onClick, className, style }: TicketProps): JSX.Element {
  return (
    <_Card onClick={onClick} className={className} style={style}>
      <Main>
        <Title>{title}</Title>
        {description && <Notes />}
      </Main>

      <IconButton data-testid="ticketEditButton" onClick={onEditClick}>
        <Edit />
      </IconButton>
    </_Card>
  );
}

export function DraggableTicket({ id, index, ...ticketProps }: DraggableTicketProps): JSX.Element {
  return (
    <Draggable key={`${id}`} draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <CardDraggableWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          data-testid="ticket"
        >
          <Ticket {...ticketProps} />
        </CardDraggableWrapper>
      )}
    </Draggable>
  );
}

const CardDraggableWrapper = styled.div``;

const _Card = styled(Card)`
  display: flex;
  background-color: #ffffff;
  padding: 6px 0px 4px 8px;
  margin: 0 8px;
  margin-top: 4px;

  cursor: pointer;

  &:hover {
    background-color: #ebecf0;
  }

  & > div:last-child {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  &:hover > div:last-child {
    opacity: 0.8;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  & > svg {
    font-size: 18px;
    color: gray;
  }
`;

const Title = styled.span`
  margin-bottom: 8px;
`;
