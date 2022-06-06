import { useState, createContext } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, DraggableLocation, DragStart, Droppable, DropResult } from "react-beautiful-dnd";

import { ProjectReducerContext } from "../../context/project";
import { moveItemToAnotherList, reorderSameListItems } from "../../utils/dragAndDrop";
import { useTypeSafeContext } from "../../hooks/useTypeSafeContext";
import { updatedColumn } from "../../store/project";

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
  const dispatch = useTypeSafeContext(ProjectReducerContext);
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

    const reorderedColumns = reorderSameListItems(projectColumns, source.index, destination.index);
    setNewColumns(reorderedColumns);
  };

  const handleOnTicketDragEnd = ({
    destination,
    source,
  }: {
    destination: DraggableLocation;
    source: DraggableLocation;
  }) => {
    const sourceDroppableElementIdx = projectColumns.findIndex((column) => column.id === Number(source.droppableId));
    const destinationDroppableElementIdx = projectColumns.findIndex(
      (column) => column.id === Number(destination?.droppableId),
    );
    const isDroppedOnSameColumn = source.droppableId === destination?.droppableId;

    if (isDroppedOnSameColumn) {
      const targedColumn = projectColumns[sourceDroppableElementIdx];
      const reorderedTickets = reorderSameListItems(targedColumn.tickets, source.index, destination.index);

      const newColumns = [...projectColumns];
      newColumns[sourceDroppableElementIdx].tickets = reorderedTickets;

      setNewColumns(newColumns);
      return;
    }

    // When dropped on another projectColumns
    const sourceColumn = projectColumns[sourceDroppableElementIdx].tickets;
    const destinationColumn = projectColumns[destinationDroppableElementIdx].tickets;
    const { resultSource, resultDestination } = moveItemToAnotherList(
      sourceColumn,
      destinationColumn,
      source.index,
      destination.index,
    );
    const newColumns = [...projectColumns];
    newColumns[sourceDroppableElementIdx].tickets = resultSource;
    newColumns[destinationDroppableElementIdx].tickets = resultDestination;
    setNewColumns(newColumns);
  };

  const setNewColumns = (newColumns: ColumnDefinition[]) => {
    setGrabbedItem(null);
    dispatch(updatedColumn(newColumns));
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
              {projectColumns.map((column, index) => (
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
