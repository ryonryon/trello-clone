import { ColumnFooter } from "./ColumnFooter";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<ColumnFooter />", () => {
  test("Passed onAddTicket function - it should trigger passed function", () => {
    // Arrange
    const mockedCallback = jest.fn();
    const mockedChangedValue = "mocked changed value";

    render(<ColumnFooter onAddTicket={mockedCallback} />);
    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);
    const editableTicket = screen.getByLabelText("editable-ticket");
    fireEvent.change(editableTicket, { target: { value: mockedChangedValue } });

    // Act
    fireEvent.keyDown(editableTicket, { key: "Enter" });

    // Assert
    expect(mockedCallback).toBeCalled();
    expect(screen.getByText("Add a card")).toBeTruthy();
  });
});
