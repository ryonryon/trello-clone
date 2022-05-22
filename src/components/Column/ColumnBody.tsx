import { useContext } from "react";
import styled, { CSSProperties } from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import TicketDefinition from "../../interfaces/Ticket";
import { GrabbedItemContext, GRABBED_ITEM_CATEGORY } from "../Project/DnDColumnList";
import { DraggableTicket, Ticket } from "../Ticket/Ticket";

interface ColumnBodyProps {
  tickets: TicketDefinition[];
  // This shouldn't be optional but we'll add API later so we can fix then I suppose.
  onEditClick?: () => void;
}

interface DnDColumnBodyProps extends ColumnBodyProps {
  title: string;
  columnId: number;
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

export function DnDColumnBody({ title, columnId, tickets, onEditClick }: DnDColumnBodyProps): JSX.Element {
  const grabbedItemContext = useContext(GrabbedItemContext);

  return (
    // this droppable area should be disabled when gragged item is column
    <Droppable droppableId={`${columnId}`} isDropDisabled={grabbedItemContext === GRABBED_ITEM_CATEGORY.COLUMN}>
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
