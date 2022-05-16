import { ColumnFooter } from "./ColumnFooter";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<ColumnFooter />", () => {
  test("Passed onClick function - it should trigger passed callback upon click", () => {
    // Arrange
    const mockedCallback = jest.fn();

    render(<ColumnFooter onAddTicket={mockedCallback} />);
    const addButton = screen.getByRole("button");

    // Act
    fireEvent.click(addButton);

    // Assert
    expect(mockedCallback).toBeCalled();
    expect(screen.getByText("Add a card")).toBeTruthy();
  });
});
