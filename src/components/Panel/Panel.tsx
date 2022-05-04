import { CSSProperties, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Add, MoreHoriz, FileCopy } from "@material-ui/icons";
import styled from "styled-components";

import Button from "../Button";
import Card from "../Card";
import IconButton from "../IconButton";
import TicketDraggableContext from "./TicketDraggableContext";
import TicketComp from "../Ticket";
import Ticket from "../../interfaces/Ticket";
import EditableLabel from "../EditableLabel";

function getListStyle(isDraggingOver: boolean): CSSProperties {
  return {
    background: isDraggingOver ? "lightblue" : "inherited",
    width: "100%",
  };
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export interface Props {
  title: string;
  items?: Ticket[];
  draggable?: boolean;
  onEditClick?: () => void;
  onAddTicket?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default function Panel({ title, items = [], draggable = false, ...props }: Props): JSX.Element {
  const [_item, setItem] = useState<Ticket[]>(items);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    const items = reorder(_item, source.index, destination.index);

    setItem(items);
  };

  return (
    <_Card {...props}>
      <Content>
        <Header>
          <EditableTitle value={title} />

          <IconButton>
            <MoreHoriz />
          </IconButton>
        </Header>

        {draggable ? (
          <TicketDraggableContext.Provider value={{ draggable: true }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <Tickets
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {_item.map((item, i) => (
                      <TicketComp key={`panel:${title}-ticket:${item.id}`} id={item.id} title={item.name} index={i} />
                    ))}
                  </Tickets>
                )}
              </Droppable>
            </DragDropContext>
          </TicketDraggableContext.Provider>
        ) : (
          <Tickets>
            {_item.map((item, i) => (
              <TicketComp key={`panel:${title}-ticket:${item.id}`} id={item.id} title={item.name} index={i} />
            ))}
          </Tickets>
        )}

        <Footer>
          <AddATicketButton title="Add a card" icon={<Add />} textLeft />

          <IconButton>
            <FileCopy />
          </IconButton>
        </Footer>
      </Content>
    </_Card>
  );
}

const _Card = styled(Card)`
  background-color: #ebecf0;
  min-width: 320px;
  padding: 4px;
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const EditableTitle = styled(EditableLabel)`
  width: 100%;
  font-weight: 600;
`;

const Tickets = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 4px;

  & > div {
    margin-bottom: 4px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const AddATicketButton = styled(Button)`
  width: 100%;
`;
