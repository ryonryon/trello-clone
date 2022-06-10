import { useState } from "react";
import styled from "styled-components";
import { FilterList, FlashOn, GroupAdd, MoreHoriz, People, StarBorder, TableChart } from "@material-ui/icons";

import ProjectDefinition from "../../interfaces/Project";
import { UPDATE_PROJECT_TITLE } from "../../api";
import { useMutation } from "../../hooks/useMutation";
import { useTypeSafeContext } from "../../hooks/useTypeSafeContext";
import { ProjectContext } from "../../context/project";
import { OnTicketClickContext } from "../../context/ticket";

import AdditionColumn from "../AdditionColumn";
import _Button from "../Button";
import EditableLabel from "../EditableLabel";
import IconButton from "../IconButton";
import TicketDetailModal from "../TicketDetailModal";
import DnDColumnList from "./DnDColumnList";

export default function Project(): JSX.Element {
  const [updatingTicketId, setUpdatingTicketId] = useState<number | null>(null);

  const project = useTypeSafeContext(ProjectContext);
  const { call } = useMutation<ProjectDefinition>(UPDATE_PROJECT_TITLE(project.id), "PUT");

  const handleBlur = async (value: string) => {
    await call({
      variables: { name: value },
    });
  };

  const handleTicketClick = (ticketId: number) => {
    setUpdatingTicketId(ticketId);
  };

  const handleTicketDetailModalClose = () => {
    setUpdatingTicketId(null);
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
          <OnTicketClickContext.Provider value={{ onTicketClick: handleTicketClick }}>
            <DnDColumnList projectColumns={project.columns} />
          </OnTicketClickContext.Provider>
          <AdditionColumn />
        </Panels>
      </Container>

      <TicketDetailModal
        isOpen={Boolean(updatingTicketId)}
        ticketId={updatingTicketId}
        onClose={handleTicketDetailModalClose}
      />
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
