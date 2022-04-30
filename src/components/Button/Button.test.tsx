import { render, screen, fireEvent } from "@testing-library/react";
import { Add } from "@material-ui/icons";
import Button from "./Button";

describe("<Button />", () => {
  test("Passed title with icon - it should be rendered with given props", () => {
    // Arrange
    const mockedTitle = "This is mocked title";
    const mockedIconTestId = `buttonIcon_${mockedTitle}`;

    render(<Button icon={<Add />} title={mockedTitle} />);
    const renderedButton = screen.getByText(mockedTitle);

    // Assert
    expect(renderedButton).toBeTruthy();
    // Also check if the icon is present
    expect(screen.getByTestId(mockedIconTestId)).toBeTruthy();
  });

  test("Passed onClick - clicking on it should fire passed function", () => {
    // Arrange
    const mockedTitle = "This is mocked title";
    const mockedCallbackFn = jest.fn();

    render(<Button title={mockedTitle} onClick={mockedCallbackFn} />);
    const renderedButton = screen.getByRole("button");

    // Act
    fireEvent.click(renderedButton);

    // Assert
    expect(mockedCallbackFn).toBeCalled();
  });
});
