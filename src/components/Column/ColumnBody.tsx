import { Dispatch, SetStateAction } from "react";
import styled, { CSSProperties } from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { reorderListItems } from "../../utils/dragAndDrop";

import TicketDefinition from "../../interfaces/Ticket";
import { DraggableTicket, Ticket } from "../Ticket/Ticket";

interface ColumnBodyProps {
  tickets: TicketDefinition[];
  // This shouldn't be optional but we'll add API later so we can fix then I suppose.
  onEditClick?: () => void;
}

interface DnDColumnBodyProps extends ColumnBodyProps {
  title: string;
  setTickets: Dispatch<SetStateAction<TicketDefinition[]>>;
}

function getListStyle(isDraggingOver: boolean): CSSProperties {
  return {
    background: isDraggingOver ? "lightblue" : "inherited",
    width: "100%",
  };
}

export function ColumnBody({ tickets, onEditClick }: ColumnBodyProps): JSX.Element {
  return (
    <TicketsContainer>
      {tickets.map((item) => (
        <Ticket key={`ticketId:${item.id}`} title={item.name} onEditClick={onEditClick} />
      ))}
    </TicketsContainer>
  );
}

export function DnDColumnBody({ title, tickets, setTickets, onEditClick }: DnDColumnBodyProps): JSX.Element {
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    const items = reorderListItems(tickets, source.index, destination.index);

    setTickets(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="vertical">
        {(provided, snapshot) => (
          <TicketsContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
            data-testid={`columContainer-${title}`}
          >
            {tickets.map((item, i) => (
              <DraggableTicket
                key={`ticketId:${item.id}`}
                id={item.id}
                title={item.name}
                index={i}
                onEditClick={onEditClick}
              />
            ))}
            {provided.placeholder}
          </TicketsContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const TicketsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 4px;

  & > div {
    margin-bottom: 4px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;
