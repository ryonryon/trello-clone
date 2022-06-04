import {
  AccessTime,
  Add,
  AddBox,
  ArrowForward,
  AttachFile,
  Check,
  Close,
  CropLandscape,
  FileCopy,
  FormatListBulleted,
  Inbox,
  Label,
  Notes,
  Person,
  Remove,
  Share,
  Style,
  Title,
  Visibility,
  WorkOutline,
} from "@material-ui/icons";
import { FormEvent, useState } from "react";
import styled from "styled-components";

import TicketDefenition from "../../interfaces/Ticket";
import _Button from "../Button";
import _Card from "../Card";
import Dialog from "../Dialog";
import EditableLabel from "../EditableLabel";
import IconButton from "../IconButton";

export interface UpdateTicketModalProps {
  isOpen: boolean;
  ticket: Partial<TicketDefenition>;
  onClose?: () => void;
}

export default function UpdateTicketModal({ isOpen, ticket, onClose }: UpdateTicketModalProps): JSX.Element {
  const [updatingTicket, setUpdatingTicket] = useState(ticket);

  const handleTitleBlur = (name: string) => {
    setUpdatingTicket((prev) => ({ ...prev, name }));
  };

  const handleDescriptionChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setUpdatingTicket((prev) => ({ ...prev, description: event.currentTarget.value }));
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} disableCloseButton>
      <Card>
        <Container>
          <CloseIconButton onClick={onClose}>
            <Close />
          </CloseIconButton>

          <Headline>
            <Title />

            <TicketTitleEditableLabel value={updatingTicket.name} onBlur={handleTitleBlur} />
          </Headline>

          <Content>
            <Main>
              <Paragraph>
                <ParagraphTitle>
                  <Notes />
                  <MainTitle>Description</MainTitle>
                </ParagraphTitle>

                <DescriptionForm>
                  <DescriptionFormContainer>
                    <EditableDescription
                      placeholder="Add a more detailed description…"
                      value={updatingTicket.description}
                      onChange={handleDescriptionChange}
                    />

                    <DescriptionButtons>
                      <DescriptionSaveButton title="Save" />
                      <Button title="Cancel" />

                      <Button title="Formatting help" />
                    </DescriptionButtons>
                  </DescriptionFormContainer>
                </DescriptionForm>
              </Paragraph>

              <Paragraph>
                <ParagraphTitle>
                  <FormatListBulleted />
                  <MainTitle>Activity</MainTitle>

                  <Button title={"Show details"} />
                </ParagraphTitle>
              </Paragraph>
            </Main>

            <Side>
              <SideTitle>Add to card</SideTitle>
              <Button title="Members" icon={<Person />} />
              <Button title="Labels" icon={<Label />} />
              <Button title="Checklist" icon={<Check />} />
              <Button title="Dates" icon={<AccessTime />} />
              <Button title="Attachment" icon={<AttachFile />} />
              <Button title="Cover" icon={<Style />} />
              <Button title="Custom Fields" icon={<CropLandscape />} />

              <SideComment>Add dropdowns, text fields, dates, add more to your cards.</SideComment>

              <Button title="Start free trial" icon={<WorkOutline />} />

              <SideTitle>Powers-Ups</SideTitle>
              <Button title="Add Power-Ups" icon={<Add />} />

              <SideTitle>Automation</SideTitle>
              <Button title="Add button" icon={<Add />} />

              <SideTitle>Actions</SideTitle>
              <Button title="Move" icon={<ArrowForward />} />
              <Button title="Copy" icon={<FileCopy />} />
              <Button title="Make template" icon={<AddBox />} />
              <Button title="Watch" icon={<Visibility />} />
              <Button title="Archive" icon={<Inbox />} />
              <DeleteButton title="Delete" icon={<Remove />} />
              <Button title="Share" icon={<Share />} />
            </Side>
          </Content>
        </Container>
      </Card>
    </Dialog>
  );
}

const Card = styled(_Card)`
  position: relative;
  display: block;
  width: 800px;
  margin: 80px 0;
  padding: 16px;
  background-color: #f4f5f7;
`;

const Container = styled.div`
  width: 100%;
`;

const CloseIconButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 4px;
`;

const Headline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 32px 24px 16px;

  & > svg {
    margin-right: 16px;
  }
`;

const TicketTitleEditableLabel = styled(EditableLabel)`
  width: 100%;
  font-size: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  & > div:first-child {
    margin-right: 16px;
  }
`;

const Main = styled.div`
  flex-grow: 1;
`;

const Paragraph = styled.div``;

const ParagraphTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;

  & > svg {
    margin-right: 16px;
  }
`;

const MainTitle = styled.h2`
  flex-grow: 10;
  margin: 16px 0;
  font-size: 16px;
`;

const DescriptionForm = styled.div`
  width: 100%;
`;

const DescriptionFormContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-left: 40px;
`;

const EditableDescription = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  resize: none;
  margin-bottom: 8px;
  padding-left: 4px;
  border: none;
`;

const DescriptionButtons = styled.div`
  & > *:first-child {
    margin-right: 8px;
  }

  & > *:last-child {
    float: right;
  }
`;

const DescriptionSaveButton = styled(_Button)`
  background-color: #0179bf;
  color: #ffffff;

  &:hover {
    background-color: #026aa7;
  }
`;

const Button = styled(_Button)`
  color: #172b4d;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

  & > * {
    margin-bottom: 8px;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

const DeleteButton = styled(_Button)`
  background-color: #b04632;
  color: #ffffff;

  &:hover {
    background-color: #933b27;
  }
`;

const SideTitle = styled.h3`
  color: #5e6c84;
  font-size: 12px;
`;

const SideComment = styled.span`
  font-size: 12px;
  color: #97a0af;
  letter-spacing: 0.05em;
`;
