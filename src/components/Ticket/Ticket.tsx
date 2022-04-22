import { CSSProperties, useState } from "react";
import { Edit } from "@material-ui/icons";
import styled from "styled-components";
import IconButton from "../IconButton";
import Card from "../Card";

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
  padding: 6px 4px 2px 8px;
  cursor: pointer;

  &:hover {
    background-color: #ebecf0;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
