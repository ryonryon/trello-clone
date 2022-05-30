import styled from "styled-components";
import { Add, FilterList, FlashOn, GroupAdd, MoreHoriz, People, StarBorder, TableChart } from "@material-ui/icons";

import { UPDATE_PROJECT_TITLE } from "../../api";
import { useMutation } from "../../hooks/useMutation";
import ProjectDefinition from "../../interfaces/Project";
import _Button from "../Button";
import IconButton from "../IconButton";
import EditableLabel from "../EditableLabel";
import DnDColumnList from "./DnDColumnList";

export interface Props {
  project: ProjectDefinition;
}

export default function Project({ project }: Props): JSX.Element {
  const { call } = useMutation<ProjectDefinition>(UPDATE_PROJECT_TITLE(project.id), "PUT");

  const handleBlur = async (value: string) => {
    await call({
      variables: { name: value },
    });
  };

  return (
    <Root>
      <Container>
        <Header>
          <HeaderLeft>
            <Button title="Board" icon={<TableChart />} data-testid="boardButton" />

            <EditableTitle value={project.name} onBlur={handleBlur} />

            <StarButton data-testid="starButton">
              <StarBorder />
            </StarButton>

            <Button title="test" data-testid="testButton" />

            <Button title="Workspace visible" icon={<People />} data-testid="workSpaceButton" />

            <ShareButton title="Share" icon={<GroupAdd />} data-testid="shareButton" />
          </HeaderLeft>

          <HeaderRight>
            <Button title="Power-Ups" data-testid="powerUpsButton" />

            <Button title="Automation" icon={<FlashOn />} data-testid="automationButton" />

            <Button title="Filter" icon={<FilterList />} data-testid="filterButton" />

            <Button title="Show manu" icon={<MoreHoriz />} data-testid="showMenuButton" />
          </HeaderRight>
        </Header>

        <Panels>
          <DnDColumnList projectColumns={project.columns} />

          <AnotherListButton title="Add another list" icon={<Add />} textLeft />
        </Panels>
      </Container>
    </Root>
  );
}

const Root = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding: 8px;

  & > div:first-child {
    margin-bottom: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > * {
    margin-right: 8px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & > * {
    margin-right: 8px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > * {
    margin-right: 8px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const EditableTitle = styled(EditableLabel)`
  font-weight: 600;
`;

const Button = styled(_Button)`
  color: #172b4d;
`;

const StarButton = styled(IconButton)`
  background-color: #0000001;

  &:hover {
    background-color: #00000029;
  }
`;

const ShareButton = styled(Button)`
  background-color: #0179bf;
  color: #ffffff;

  &:hover {
    background-color: #026aa7;
  }
`;

const Panels = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  align-items: start;
  overflow-x: scroll;
`;

const AnotherListButton = styled(Button)`
  min-width: 320px;
  background-color: #0000001;

  &:hover {
    background-color: #00000029;
  }
`;
