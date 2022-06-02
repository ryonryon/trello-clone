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
  afterEach(() => {
    mockedUseMutationCall.mockReset();
  });

  test("trigger updateColumnTitle - it should trigger call() from useMutation() properly", () => {
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
    expect(mockedUseMutationCall).toBeCalled();
    expect(mockedUseMutationCall).toBeCalledWith({
      variables: { name: changedMockedValue },
    });
  });

  test("trigger createTicket - it should trigger call() from useMutation() properly", () => {
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
    expect(mockedUseMutationCall).toBeCalled();
    expect(mockedUseMutationCall).toBeCalledWith({
      variables: { name: mockedChangedValue },
    });
  });
});
