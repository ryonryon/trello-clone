import { CSSProperties } from "react";
import { Edit } from "@material-ui/icons";
import styled from "styled-components";
import IconButton from "../IconButton";
import { Card } from "../Card";

export interface Props {
  title: string;
  onClick?: () => void;
  onEditClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default function Ticket({
  title,
  onEditClick,
  onClick,
  ...props
}: Props) {
  return (
    <_Card onClick={onClick} {...props}>
      <Content>
        {title}

        <IconButton onClick={onEditClick}>
          <Edit />
        </IconButton>
      </Content>
    </_Card>
  );
}

const _Card = styled(Card)`
  min-height: 30px;
  background-color: #ffffff;
  padding: 6px 8px 2px;
  cursor: pointer;

  &:hover {
    background-color: #cacccb;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
