import { CSSProperties } from "react";
import { Add, Star } from "@material-ui/icons";
import styled from "styled-components";
import Button from "../Button";
import IconButton from "../IconButton";
import EditableLabel from "../EditableLabel";

export interface Props {
  title: string;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Project({ title, children, ...props }: Props): JSX.Element {
  return (
    <Root {...props}>
      <Content>
        <Header>
          <EditableTitle value={title} />

          <StarButton>
            <Star />
          </StarButton>
        </Header>

        <Panels>
          {children}

          <AnotherListButton title="Add another list" icon={<Add />} textLeft />
        </Panels>
      </Content>
    </Root>
  );
}

const Root = styled.div``;

const Content = styled.div`
  width: 100%;
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
  justify-content: flex-start;
  align-items: baseline;

  & > div {
    margin-right: 8px;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

const AnotherListButton = styled(Button)`
  min-width: 320px;
  background-color: #0000001;

  &:hover {
    background-color: #00000029;
  }
`;
