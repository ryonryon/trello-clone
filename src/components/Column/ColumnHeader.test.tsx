import { ColumnHeader } from "./ColumnHeader";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<ColumnHeader />", () => {
  test("passed header - should render with passed value", () => {
    // Arrange
    const mockedTitle = "Lorem Ipsum";

    render(<ColumnHeader title={mockedTitle} />);
    const renderedEditableLabel = screen.getByLabelText("editable-label");

    // Assert
    expect(renderedEditableLabel).toHaveProperty("value", mockedTitle);
  });

  test("change text input value - should change the value currently", () => {
    // Arrange
    const mockedTitle = "Lorem Ipsum";
    const mockedChangedValue = "It is a long established fact that a reader";

    render(<ColumnHeader title={mockedTitle} />);
    const renderedEditableLabel = screen.getByLabelText("editable-label");

    // Act
    fireEvent.change(renderedEditableLabel, { target: { value: mockedChangedValue } });

    // Assert
    expect(renderedEditableLabel).toHaveProperty("value", mockedChangedValue);
  });
});
