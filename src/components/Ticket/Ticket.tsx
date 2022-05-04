import { CSSProperties, useContext } from "react";
import { Draggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { Edit, Notes } from "@material-ui/icons";
import styled from "styled-components";
import IconButton from "../IconButton";
import Card from "../Card";
import { TicketDraggableContext } from "../Panel";

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

export interface Props {
  id: string;
  index?: number;
  title: string;
  description?: string;
  onClick?: () => void;
  onEditClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default function Ticket({
  id,
  index = 0,
  title,
  description,
  onEditClick,
  onClick,
  ...props
}: Props): JSX.Element {
  const { draggable } = useContext(TicketDraggableContext);

  return draggable ? (
    <Draggable key={`${id}`} draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <CardDraggableWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <_Card onClick={onClick} {...props}>
            <Content>
              <Main>
                <Title>{title}</Title>

                {description && <Notes />}
              </Main>

              <IconButton onClick={onEditClick}>
                <Edit />
              </IconButton>
            </Content>
          </_Card>
        </CardDraggableWrapper>
      )}
    </Draggable>
  ) : (
    <_Card onClick={onClick} {...props}>
      <Content>
        <Main>
          <Title>{title}</Title>

          {description && <Notes />}
        </Main>

        <IconButton onClick={onEditClick}>
          <Edit />
        </IconButton>
      </Content>
    </_Card>
  );
}

const CardDraggableWrapper = styled.div``;

const _Card = styled(Card)`
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 6px 4px 4px 8px;
  cursor: pointer;

  &:hover {
    background-color: #ebecf0;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;

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
