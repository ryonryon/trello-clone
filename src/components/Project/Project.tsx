import { useState } from "react";
import styled from "styled-components";
import { Add, Star } from "@material-ui/icons";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

import { reorderListItems } from "../../utils/dragAndDrop";

import ColumnDefinition from "../../interfaces/Column";
import ProjectDefinition from "../../interfaces/Project";

import Button from "../Button";
import IconButton from "../IconButton";
import EditableLabel from "../EditableLabel";
import Column from "../Column";

export interface Props {
  project: ProjectDefinition;
}

export default function Project({ project }: Props): JSX.Element {
  const [columns, setColumns] = useState<ColumnDefinition[]>(project.columns);

  const handleOnDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const reorderedColumns = reorderListItems(columns, source.index, destination.index);

    setColumns(reorderedColumns);
  };

  return (
    <Root>
      <Header>
        <EditableTitle value={project.name} />

        <StarButton>
          <Star />
        </StarButton>
      </Header>

      <Panels>
        {/* TODO: Bring DnD part of component out of this component */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <ColumnListContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid={`columListContainer-${project.name}`}
              >
                {columns.map((column, index) => (
                  <Draggable key={column.id} draggableId={`column_${column.id}`} index={index}>
                    {(provided) => (
                      <ColumnListContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Column key={`column-${column.id}`} title={column.name} items={column.tickets} draggable />
                      </ColumnListContainer>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ColumnListContainer>
            )}
          </Droppable>
          <AnotherListButton title="Add another list" icon={<Add />} textLeft />
        </DragDropContext>
      </Panels>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const EditableTitle = styled(EditableLabel)`
  font-weight: 600;
`;

const StarButton = styled(IconButton)`
  background-color: #0000001;

  &:hover {
    background-color: #00000029;
  }
`;

const Panels = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  align-items: baseline;
`;

const ColumnListContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;

const AnotherListButton = styled(Button)`
  min-width: 320px;
  background-color: #0000001;

  &:hover {
    background-color: #00000029;
  }
`;
