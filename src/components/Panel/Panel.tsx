import { CSSProperties, ReactChild } from "react";
import { Add, MoreHoriz, FileCopy } from "@material-ui/icons";
import styled from "styled-components";
import Button from "../Button";
import Card from "../Card";
import IconButton from "../IconButton";

export interface Props {
  title: string;
  onEditClick?: () => void;
  onAddTicket?: () => void;
  children?: ReactChild | ReactChild[];
  className?: string;
  style?: CSSProperties;
}

export default function Ticket({
  title,
  onEditClick,
  children,
  ...props
}: Props) {
  return (
    <_Card {...props}>
      <Content>
        <Header>
          <Title>{title}</Title>

          <IconButton>
            <MoreHoriz />
          </IconButton>
        </Header>

        {children && <Tickets>{children}</Tickets>}

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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
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

const Title = styled.h4`
  width: 100%;
  margin: 2px 4px;
  font-weight: 600;
`;

const Tickets = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
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
