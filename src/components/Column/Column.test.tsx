import { render, screen, fireEvent } from "@testing-library/react";

import Column from "./Column";

const mockedUseMutationCall = jest.fn();

jest.mock("../../hooks/useMutation", () => {
  return {
    __esModule: true,
    useMutation: jest.fn(() => {
      return {
        call: mockedUseMutationCall,
      };
    }),
  };
});

describe("<Column />", () => {
  test("passed appropriate props - it should render given ticket with title", () => {
    // Arrange
    const mockedColumnId = 1;
    const mockedColumn = {
      id: mockedColumnId,
      name: "mocked column name",
      order: 0,
      tickets: [],
    };
    const changedMockedValue = "changed mocked value";

    render(<Column column={mockedColumn} />);

    const renderedEditableLabel = screen.getByLabelText("editable-label");

    // Act
    fireEvent.change(renderedEditableLabel, { target: { value: changedMockedValue } });
    fireEvent.blur(renderedEditableLabel);

    // Assert
    expect(mockedUseMutationCall).toBeCalledTimes(1);
    expect(mockedUseMutationCall).toBeCalledWith({
      variables: { name: changedMockedValue },
    });
  });

  test("passed appropriate props - it should render given ticket with title", () => {
    // Arrange
    const mockedColumnId = 2;
    const mockedColumn = {
      id: mockedColumnId,
      name: "mocked column name",
      order: 0,
      tickets: [],
    };
    const mockedChangedValue = "mocked changed value";

    render(<Column column={mockedColumn} />);
    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);
    const editableTicket = screen.getByLabelText("editable-ticket");
    fireEvent.change(editableTicket, { target: { value: mockedChangedValue } });

    // Act
    fireEvent.keyDown(editableTicket, { key: "Enter" });

    // Assert
    expect(mockedUseMutationCall).toBeCalledTimes(2);
    expect(mockedUseMutationCall).toBeCalledWith({
      variables: { name: mockedChangedValue },
    });
  });
});
