import { render, screen, fireEvent } from "@testing-library/react";
import EditableTicket from "./EditableTicket";

describe("<EditableTicket />", () => {
  test("Passed value - it should be rendered with given props", () => {
    // Arrange
    const mockedValue = "This is mocked value";

    render(<EditableTicket value={mockedValue} />);
    const renderedEditableTicket = screen.getByLabelText("editable-ticket");

    // Assert
    expect(renderedEditableTicket).toHaveProperty("value", mockedValue);
  });

  test("Passed placeholder - it should be rendered with given props", () => {
    // Arrange
    const mockedPlaceholder = "This is mocked placeholder";

    render(<EditableTicket placeholder={mockedPlaceholder} />);
    const renderedEditableTicket = screen.getByLabelText("editable-ticket");

    // Assert
    expect(renderedEditableTicket).toHaveProperty("placeholder", mockedPlaceholder);
  });

  describe("Passed onBlur", () => {
    test(" - focus out should fire passed function", () => {
      // Arrange
      const mockedCallbackFn = jest.fn();

      render(<EditableTicket onBlur={mockedCallbackFn} />);
      const renderedEditableTicket = screen.getByLabelText("editable-ticket");

      // Act
      fireEvent.blur(renderedEditableTicket);

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });

    test(" - Enter key down should fire passed function", () => {
      // Arrange
      const mockedCallbackFn = jest.fn();

      render(<EditableTicket onBlur={mockedCallbackFn} />);
      const renderedEditableTicket = screen.getByLabelText("editable-ticket");

      // Act
      fireEvent.keyDown(renderedEditableTicket, { key: "Enter" });

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });

    test(" - Escape key down should fire passed function", () => {
      // Arrange
      const mockedCallbackFn = jest.fn();

      render(<EditableTicket onBlur={mockedCallbackFn} />);
      const renderedEditableTicket = screen.getByLabelText("editable-ticket");

      // Act
      fireEvent.keyDown(renderedEditableTicket, { key: "Escape" });

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });

    test(" - OnBlur returns initial value when user didn't change the value", () => {
      // Arrange
      const mockedValue = "This is mocked value";
      const mockedCallbackFn = jest.fn();

      render(<EditableTicket value={mockedValue} onBlur={mockedCallbackFn} />);
      const renderedEditableTicket = screen.getByLabelText("editable-ticket");

      // Act
      fireEvent.blur(renderedEditableTicket);

      // Assert
      expect(mockedCallbackFn).toBeCalledWith(mockedValue);
    });

    test(" - OnBlur returns changed value when user changed the value", () => {
      // Arrange
      const mockedValue = "This is mocked value";
      const changedMockedValue = "changed mocked value";
      const mockedCallbackFn = jest.fn();

      render(<EditableTicket value={mockedValue} onBlur={mockedCallbackFn} />);
      const renderedEditableTicket = screen.getByLabelText("editable-ticket");

      // Act
      fireEvent.change(renderedEditableTicket, { target: { value: changedMockedValue } });
      fireEvent.blur(renderedEditableTicket);

      // Assert
      expect(mockedCallbackFn).toBeCalledWith(changedMockedValue);
    });
  });
});
