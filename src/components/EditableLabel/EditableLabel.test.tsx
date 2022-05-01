import { render, screen, fireEvent } from "@testing-library/react";
import EditableLabel from "./EditableLabel";

describe("<EditableLabel />", () => {
  test("Passed value - it should be rendered with given props", () => {
    // Arrange
    const mockedValue = "This is mocked value";

    render(<EditableLabel value={mockedValue} />);
    const renderedEditableLabel = screen.getByLabelText("editable-label");

    // Assert
    expect(renderedEditableLabel).toHaveProperty("value", mockedValue);
  });

  describe("Passed onBlur", () => {
    test(" - focus out should fire passed function", () => {
      // Arrange
      const mockedCallbackFn = jest.fn();

      render(<EditableLabel onBlur={mockedCallbackFn} />);
      const renderedEditableLabel = screen.getByLabelText("editable-label");

      // Act
      fireEvent.blur(renderedEditableLabel);

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });

    test(" - Enter key down should fire passed function", () => {
      // Arrange
      const mockedCallbackFn = jest.fn();

      render(<EditableLabel onBlur={mockedCallbackFn} />);
      const renderedEditableLabel = screen.getByLabelText("editable-label");

      // Act
      fireEvent.keyDown(renderedEditableLabel, { key: "Enter" });

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });

    test(" - Escape key down should fire passed function", () => {
      // Arrange
      const mockedCallbackFn = jest.fn();

      render(<EditableLabel onBlur={mockedCallbackFn} />);
      const renderedEditableLabel = screen.getByLabelText("editable-label");

      // Act
      fireEvent.keyDown(renderedEditableLabel, { key: "Escape" });

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });

    test(" - OnBlur returns initial value when user didn't change the value", () => {
      // Arrange
      const mockedValue = "This is mocked value";
      const mockedCallbackFn = jest.fn();

      render(<EditableLabel value={mockedValue} onBlur={mockedCallbackFn} />);
      const renderedEditableLabel = screen.getByLabelText("editable-label");

      // Act
      fireEvent.blur(renderedEditableLabel);

      // Assert
      expect(mockedCallbackFn).toBeCalledWith(mockedValue);
    });

    test(" - OnBlur returns changed value when user changed the value", () => {
      // Arrange
      const mockedValue = "This is mocked value";
      const changedMockedValue = "changed mocked value";
      const mockedCallbackFn = jest.fn();

      render(<EditableLabel value={mockedValue} onBlur={mockedCallbackFn} />);
      const renderedEditableLabel = screen.getByLabelText("editable-label");

      // Act
      fireEvent.change(renderedEditableLabel, { target: { value: changedMockedValue } });
      fireEvent.blur(renderedEditableLabel);

      // Assert
      expect(mockedCallbackFn).toBeCalledWith(changedMockedValue);
    });
  });
});
