import { fireEvent, render, screen } from "@testing-library/react";
import { ColumnHeader } from "./ColumnHeader";

describe("<ColumnHeader />", () => {
  test("passed header - should render with passed value", () => {
    // Arrange
    const mockedTitle = "Lorem Ipsum";
    const mockedOnTitleBlur = jest.fn();

    render(<ColumnHeader title={mockedTitle} onTitleBlur={mockedOnTitleBlur} />);
    const renderedEditableLabel = screen.getByLabelText("editable-label");

    // Assert
    expect(renderedEditableLabel).toHaveProperty("value", mockedTitle);
  });

  test("change text input value - should change the value currently", () => {
    // Arrange
    const mockedTitle = "Lorem Ipsum";
    const mockedChangedValue = "It is a long established fact that a reader";
    const mockedOnTitleBlur = jest.fn();

    render(<ColumnHeader title={mockedTitle} onTitleBlur={mockedOnTitleBlur} />);
    const renderedEditableLabel = screen.getByLabelText("editable-label");

    // Act
    fireEvent.change(renderedEditableLabel, { target: { value: mockedChangedValue } });

    // Assert
    expect(renderedEditableLabel).toHaveProperty("value", mockedChangedValue);
  });

  describe("passed onTitleBlur", () => {
    test("- should be triggered by onBlur", () => {
      // Arrange
      const mockedTitle = "Lorem Ipsum";
      const mockedOnTitleBlur = jest.fn();

      render(<ColumnHeader title={mockedTitle} onTitleBlur={mockedOnTitleBlur} />);
      const renderedEditableLabel = screen.getByLabelText("editable-label");

      // Act
      fireEvent.blur(renderedEditableLabel);

      // Assert
      expect(mockedOnTitleBlur).toBeCalled();
    });

    test("- should be triggered by onBlur", () => {
      // Arrange
      const mockedTitle = "Lorem Ipsum";
      const mockedOnTitleBlur = jest.fn();

      render(<ColumnHeader title={mockedTitle} onTitleBlur={mockedOnTitleBlur} />);
      const renderedEditableLabel = screen.getByLabelText("editable-label");

      // Act
      fireEvent.keyDown(renderedEditableLabel, { key: "Enter" });

      // Assert
      expect(mockedOnTitleBlur).toBeCalled();
    });

    test("- should be triggered by onBlur", () => {
      // Arrange
      const mockedTitle = "Lorem Ipsum";
      const mockedOnTitleBlur = jest.fn();

      render(<ColumnHeader title={mockedTitle} onTitleBlur={mockedOnTitleBlur} />);
      const renderedEditableLabel = screen.getByLabelText("editable-label");

      // Act
      fireEvent.keyDown(renderedEditableLabel, { key: "Escape" });

      // Assert
      expect(mockedOnTitleBlur).toBeCalled();
    });
  });
});
