import styled from "styled-components";
import { Add, Star } from "@material-ui/icons";

import ProjectDefinition from "../../interfaces/Project";

import Button from "../Button";
import IconButton from "../IconButton";
import EditableLabel from "../EditableLabel";
import DnDColumnList from "./DnDColumnList";

export interface Props {
  project: ProjectDefinition;
}

export default function Project({ project }: Props): JSX.Element {
  return (
    <Root>
      <Header>
        <EditableTitle value={project.name} />

        <StarButton>
          <Star />
        </StarButton>
      </Header>

      <Panels>
        <DnDColumnList projectColumns={project.columns} />
        <AnotherListButton title="Add another list" icon={<Add />} textLeft />
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

const AnotherListButton = styled(Button)`
  min-width: 320px;
  background-color: #0000001;

  &:hover {
    background-color: #00000029;
  }
`;
