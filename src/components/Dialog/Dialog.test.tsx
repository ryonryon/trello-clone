import Dialog from "./Dialog";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<Dialog />", () => {
  describe("Passed isOpen", () => {
    test(" - the component IS NOT rendered when it is true", () => {
      // Arrange
      const dialogTestId = "dialog";

      render(<Dialog isOpen={false} />);

      // Assert
      expect(screen.queryByTestId(dialogTestId)).toBeNull();
    });

    test(" - the component is rendered when it is true", () => {
      // Arrange
      const dialogTestId = "dialog";

      render(<Dialog isOpen={true} />);
      const renderedDialog = screen.getByTestId(dialogTestId);

      // Assert
      expect(renderedDialog).toBeTruthy();
    });
  });

  describe("Passed disableCloseButton", () => {
    test("- close button IS NOT rendered when it is true", () => {
      // Arrange
      const closeButtonTestId = "icon_button";

      render(<Dialog isOpen={true} disableCloseButton />);

      // Assert
      expect(screen.queryByTestId(closeButtonTestId)).toBeNull();
    });

    test("- close button is rendered when it is true", () => {
      // Arrange
      const closeButtonTestId = "icon_button";

      render(<Dialog isOpen={true} disableCloseButton={false} />);
      const renderedCloseButton = screen.getByTestId(closeButtonTestId);

      // Assert
      expect(renderedCloseButton).toBeTruthy();
    });
  });

  test("Passed children - child component is rendered when child component is passed", () => {
    // Arrange
    const childComponentTestId = "child_component";

    render(
      <Dialog isOpen={true}>
        <span data-testid="child_component" />
      </Dialog>,
    );
    const renderedChildComponent = screen.getByTestId(childComponentTestId);

    // Assert
    expect(renderedChildComponent).toBeTruthy();
  });

  describe("Passed onClose", () => {
    test("- clicking close button trigger onClose", () => {
      // Arrange
      const dialogCloseButtonTestId = `icon_button`;
      const mockedCallbackFn = jest.fn();

      render(<Dialog isOpen={true} onClose={mockedCallbackFn} />);
      const closeButton = screen.getByTestId(dialogCloseButtonTestId);

      // Act
      fireEvent.click(closeButton);

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });

    test("- key down esc key trigger onClose", () => {
      // Arrange
      const dialogTestId = `dialog`;
      const mockedCallbackFn = jest.fn();

      render(<Dialog isOpen={true} onClose={mockedCallbackFn} />);
      const renderedDialog = screen.getByTestId(dialogTestId);

      // Act
      fireEvent.keyDown(renderedDialog, { key: "Escape" });

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });
  });
});
