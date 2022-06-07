import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Add, Close } from "@material-ui/icons";

import { ProjectContext, ProjectReducerContext } from "../../context/project";
import { addedNewColumn } from "../../store/project";
import { CREATE_COLUMN } from "../../api/columns";
import { useMutation } from "../../hooks/useMutation";
import { useTypeSafeContext } from "../../hooks/useTypeSafeContext";

import Column, { ColumnResponse } from "../../interfaces/Column";

import Button from "../Button";
import Card from "../Card";
import LoadingSpinner from "../LoadingSpinner";

export default function AdditionColumn(): JSX.Element {
  const project = useTypeSafeContext(ProjectContext);
  const dispatch = useTypeSafeContext(ProjectReducerContext);

  const editableTitleRef = useRef<HTMLInputElement>(null);
  const { call: requestCreateColumn, isLoading } = useMutation<ColumnResponse>(CREATE_COLUMN(project.id), "POST");

  const [isColumnExpaned, setIsColumnExpanded] = useState(false);
  const [columnTitleValue, setColumnTitleValue] = useState("");

  // It should focus on text input when the component is expanded
  useEffect(() => {
    editableTitleRef?.current && editableTitleRef.current.focus();
  }, [isColumnExpaned]);

  const handleEditableTitleChange = (e: FormEvent<HTMLInputElement>) => {
    setColumnTitleValue(e.currentTarget.value);
  };

  const handleOnClickAddColumn = () => {
    setIsColumnExpanded(true);
  };

  const handleOnClineCloseButton = () => {
    if (isLoading) return;
    setIsColumnExpanded(false);
  };

  const handleOnClickAddButton = async () => {
    if (isLoading) return;
    const newColumn = await requestCreateColumn({ variables: { name: columnTitleValue } });

    if (newColumn) {
      const mappedNewColumn: Column = {
        id: newColumn.id,
        name: newColumn.name,
        order: newColumn.sort,
        tickets: [],
      };
      dispatch(addedNewColumn(mappedNewColumn));
    }
    setIsColumnExpanded(false);
  };

  return (
    <Root>
      <Container>
        {isColumnExpaned ? (
          <EditableTitleContainer>
            <EditableTitle
              ref={editableTitleRef}
              placeholder="Enter list title..."
              value={columnTitleValue}
              onChange={handleEditableTitleChange}
            />
          </EditableTitleContainer>
        ) : (
          <AnotherListButton title="Add another list" icon={<Add />} textLeft onClick={handleOnClickAddColumn} />
        )}
        <ExpandableContainer isExpanded={isColumnExpaned} data-testid={`AdditionColumn_expandableContainer`}>
          <AddCardButton
            title="Add card"
            onClick={handleOnClickAddButton}
            textLeft={isLoading}
            icon={
              isLoading ? (
                <SpinnerWrapper>
                  <LoadingSpinner size="S" />
                </SpinnerWrapper>
              ) : undefined
            }
          />
          <CloseButtonWrapper onClick={handleOnClineCloseButton} data-testid={`AdditionColumn_closeButton`}>
            <Close fontSize="medium" />
          </CloseButtonWrapper>
        </ExpandableContainer>
      </Container>
    </Root>
  );
}

interface ExpandableContainerProps {
  isExpanded: boolean;
}

const Root = styled.div`
  min-width: 320px;
  cursor: pointer;
`;

const Container = styled(Card)`
  width: 100%;
  background-color: #ebecf0;
`;

const EditableTitleContainer = styled.div`
  padding: 6px 6px 0 6px;
`;

const EditableTitle = styled.input`
  width: 100%;
  display: block;
  background-color: #fafbfc;

  font-size: 16px;
  font-family: inherited;

  padding: 8px 12px;

  border: none;
  outline: none;
  line-height: 20px;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 2px #0079bf;
  border-radius: 3px;
  border-color: #0179bf;
  border-radius: 3px;
`;

const AnotherListButton = styled(Button)`
  width: 100%;
  background-color: #0000001;

  &:hover {
    background-color: #00000029;
  }
`;

const ExpandableContainer = styled.div<ExpandableContainerProps>`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  align-items: center;

  max-height: ${(props) => (props.isExpanded ? "500px" : "0")};
  padding: ${(props) => (props.isExpanded ? "6px 6px 6px 6px" : "0 6px 0 6px")};
  transition: all 0.1s;
`;

const AddCardButton = styled(Button)`
  background-color: #0179bf;
  color: #ffffff;

  &:hover {
    background-color: #026aa7;
  }
`;

const SpinnerWrapper = styled.div`
  padding-right: 6px;
`;

const CloseButtonWrapper = styled.a`
  display: flex;
  width: 32px;
  height: 32px;
  color: #42526e;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000000;
  }
`;
