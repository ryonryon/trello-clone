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
  test("passed appropriate props - It should render given ticket with title", () => {
    // Arrange
    const mockedColumn = {
      id: 1,
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
  });
});
