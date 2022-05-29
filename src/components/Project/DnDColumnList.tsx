import { useState, createContext } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, DraggableLocation, DragStart, Droppable, DropResult } from "react-beautiful-dnd";

import { moveItemToAnotherList, reorderSameListItems } from "../../utils/dragAndDrop";

import ColumnDefinition from "../../interfaces/Column";
import Column from "../Column";

export const GRABBED_ITEM_CATEGORY = {
  COLUMN: "COLUMN",
  ROW_TICKET: "ROW_TICKET",
} as const;

type GrabbedItemCategory = keyof typeof GRABBED_ITEM_CATEGORY;

export const GrabbedItemContext = createContext<GrabbedItemCategory | null>(null);

interface DnDColumnListProps {
  projectColumns: ColumnDefinition[];
}

/**
 * Panel of drag-and-drop-able columns. It has logic to;
 * - move dragged item with the same list
 * - move dragged item to another list
 * - disable different item's drop -> e.g. when ticket is dragged, it can't be dropped upon column's drop area
 * @param projectColumns - current focused project's list of column
 */
export default function DnDColumnList({ projectColumns }: DnDColumnListProps): JSX.Element {
  const [columns, setColumns] = useState<ColumnDefinition[]>(projectColumns);
  /** this state is passed via context to disable droppable on ticket area when column is dragged */
  const [grabbedItem, setGrabbedItem] = useState<GrabbedItemCategory | null>(null);

  // Set grabbed item to disable drop on unrelated place
  const handleOnDragStart = ({ draggableId }: DragStart) => {
    const grabbedItemCategory = draggableId.includes("column_")
      ? GRABBED_ITEM_CATEGORY.COLUMN
      : GRABBED_ITEM_CATEGORY.ROW_TICKET;

    setGrabbedItem(grabbedItemCategory);
  };

  const handleOnDragEnd = ({ destination, source }: DropResult) => {
    // Reset Grabbed item to make all items grabbable
    if (!destination) {
      setGrabbedItem(null);
      return;
    }

    // When the target item is ticket
    if (grabbedItem === GRABBED_ITEM_CATEGORY.ROW_TICKET) {
      handleOnTicketDragEnd({ destination, source });
      return;
    }

    const reorderedColumns = reorderSameListItems(columns, source.index, destination.index);
    setNewColumns(reorderedColumns);
  };

  const handleOnTicketDragEnd = ({
    destination,
    source,
  }: {
    destination: DraggableLocation;
    source: DraggableLocation;
  }) => {
    const sourceDroppableElementIdx = columns.findIndex((column) => column.id === Number(source.droppableId));
    const destinationDroppableElementIdx = columns.findIndex(
      (column) => column.id === Number(destination?.droppableId),
    );
    const isDroppedOnSameColumn = source.droppableId === destination?.droppableId;

    if (isDroppedOnSameColumn) {
      const targedColumn = columns[sourceDroppableElementIdx];
      const reorderedTickets = reorderSameListItems(targedColumn.tickets, source.index, destination.index);

      const newColumns = [...columns];
      newColumns[sourceDroppableElementIdx].tickets = reorderedTickets;

      setNewColumns(newColumns);
      return;
    }

    // When dropped on another columns
    const sourceColumn = columns[sourceDroppableElementIdx].tickets;
    const destinationColumn = columns[destinationDroppableElementIdx].tickets;
    const { resultSource, resultDestination } = moveItemToAnotherList(
      sourceColumn,
      destinationColumn,
      source.index,
      destination.index,
    );
    const newColumns = [...columns];
    newColumns[sourceDroppableElementIdx].tickets = resultSource;
    newColumns[destinationDroppableElementIdx].tickets = resultDestination;
    setNewColumns(newColumns);
  };

  const setNewColumns = (newColumns: ColumnDefinition[]) => {
    setGrabbedItem(null);
    setColumns(newColumns);
  };

  return (
    <GrabbedItemContext.Provider value={grabbedItem}>
      <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
        <Droppable
          droppableId="column_droppable"
          direction="horizontal"
          // this droppable area should be disabled when gragged item is ticket(row)
          isDropDisabled={grabbedItem === GRABBED_ITEM_CATEGORY.ROW_TICKET}
        >
          {(provided) => (
            <ColumnListContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              data-testid={`columListContainer`}
            >
              {columns.map((column, index) => (
                <Draggable key={column.id} draggableId={`column_${column.id}`} index={index}>
                  {(provided) => (
                    <ColumnListContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      tabIndex={-1}
                    >
                      <Column key={`column-${column.id}`} column={column} draggable />
                    </ColumnListContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ColumnListContainer>
          )}
        </Droppable>
      </DragDropContext>
    </GrabbedItemContext.Provider>
  );
}

const ColumnListContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;
