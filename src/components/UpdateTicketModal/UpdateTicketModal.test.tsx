import { fireEvent, render, screen } from "@testing-library/react";
import UpdateTicketModal from "./UpdateTicketModal";

describe("<UpdateTicketModal />", () => {
  describe("Passed isOpen", () => {
    test(" - the component IS NOT rendered when it is true", () => {
      // Arrange
      const dialogTestId = "dialog";
      const mockedTicket = {
        id: 9999,
        name: "mocked ticket name",
        description: "mocked ticket description",
        order: 0,
      };

      render(<UpdateTicketModal isOpen={false} ticket={mockedTicket} />);

      // Assert
      expect(screen.queryByTestId(dialogTestId)).toBeNull();
    });

    test(" - the component is rendered when it is true", () => {
      // Arrange
      const mockedTicket = {
        id: 9999,
        name: "mocked ticket name",
        description: "mocked ticket description",
        order: 0,
      };
      const dialogTestId = "dialog";

      render(<UpdateTicketModal isOpen={true} ticket={mockedTicket} />);
      const renderedDialog = screen.getByTestId(dialogTestId);

      // Assert
      expect(renderedDialog).toBeTruthy();
    });
  });

  describe("Passed onClose", () => {
    test("- clicking close button trigger onClose", () => {
      // Arrange
      const modalCloseButtonTestId = `icon_button`;
      const mockedTicket = {
        id: 9999,
        name: "mocked ticket name",
        description: "mocked ticket description",
        order: 0,
      };
      const mockedCallbackFn = jest.fn();

      render(<UpdateTicketModal isOpen={true} ticket={mockedTicket} onClose={mockedCallbackFn} />);
      const closeButton = screen.getByTestId(modalCloseButtonTestId);

      // Act
      fireEvent.click(closeButton);

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });

    test("- key down esc key trigger onClose", () => {
      // Arrange
      const modalCloseButtonTestId = `dialog`;
      const mockedTicket = {
        id: 9999,
        name: "mocked ticket name",
        description: "mocked ticket description",
        order: 0,
      };
      const mockedCallbackFn = jest.fn();

      render(<UpdateTicketModal isOpen={true} ticket={mockedTicket} onClose={mockedCallbackFn} />);
      const renderedModal = screen.getByTestId(modalCloseButtonTestId);

      // Act
      fireEvent.keyDown(renderedModal, { key: "Escape" });

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });
  });

  test("Passed ticket - it should render all given needed info", () => {
    // Arrange
    const mockedTicket = {
      id: 9999,
      name: "mocked ticket name",
      description: "mocked ticket description",
      order: 0,
    };

    render(<UpdateTicketModal isOpen={true} ticket={mockedTicket} />);

    const allColumnLabels = screen.getAllByLabelText("editable-label");

    // Assert
    expect(allColumnLabels[0]).toHaveProperty("value", mockedTicket.name);
    // UpdateTicketModel's buttons
    expect(screen.getByText("Members")).toBeTruthy();
    expect(screen.getByText("Labels")).toBeTruthy();
    expect(screen.getByText("Checklist")).toBeTruthy();
    expect(screen.getByText("Dates")).toBeTruthy();
    expect(screen.getByText("Attachment")).toBeTruthy();
    expect(screen.getByText("Cover")).toBeTruthy();
    expect(screen.getByText("Custom Fields")).toBeTruthy();
    expect(screen.getByText("Start free trial")).toBeTruthy();
    expect(screen.getByText("Add Power-Ups")).toBeTruthy();
    expect(screen.getByText("Add button")).toBeTruthy();
    expect(screen.getByText("Move")).toBeTruthy();
    expect(screen.getByText("Copy")).toBeTruthy();
    expect(screen.getByText("Make template")).toBeTruthy();
    expect(screen.getByText("Watch")).toBeTruthy();
    expect(screen.getByText("Archive")).toBeTruthy();
    expect(screen.getByText("Delete")).toBeTruthy();
    expect(screen.getByText("Share")).toBeTruthy();
  });
});
