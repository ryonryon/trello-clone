import { ColumnFooter } from "./ColumnFooter";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<ColumnFooter />", () => {
  test("Passed onClick function - it should trigger passed callback upon click", () => {
    // Arrange
    const mockedCallback = jest.fn();

    render(<ColumnFooter onAddTicket={mockedCallback} />);
    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    const createTicket = screen.getByLabelText("editable-ticket");

    // Act
    fireEvent.blur(createTicket);

    // Assert
    expect(mockedCallback).toBeCalled();
    expect(screen.getByText("Add a card")).toBeTruthy();
  });
});
