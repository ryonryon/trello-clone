import { CSSProperties, useState } from "react";
import {
  Draggable,
  DragDropContext,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  Droppable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";

const _App = styled.div``;

const grid = 8;

interface Item {
  id: string;
  content: string;
}

function getItems(count: number): Item[] {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));
}

function reorder(list: Item[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function getListStyle(isDraggingOver: boolean): CSSProperties {
  return {
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  };
}

function getItemStyle(
  isDragging: boolean,
  draggableStyle?: DraggingStyle | NotDraggingStyle
): CSSProperties {
  return {
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
  };
}

export default function App() {
  const [items, setItems] = useState<Item[]>(getItems(10));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const _items = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(_items);
  };

  return (
    <_App>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </_App>
  );
}
