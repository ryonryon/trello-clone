import { fireEvent, render, screen } from "@testing-library/react";
import { TestRendererWithProjectContext } from "../../utils/testRendererWithContext";
import TicketDetailModal from "./TicketDetailModal";

const mockedName = "mocked ticket name";
const mockedDescription = "mocked ticket description";

jest.mock("../../hooks/useFetch", () => {
  return {
    __esModule: true,
    useFetch: jest.fn(() => {
      return {
        data: {
          name: mockedName,
          description: mockedDescription,
        },
      };
    }),
  };
});

describe("<TicketDetailModal />", () => {
  describe("Passed isOpen", () => {
    test(" - the component IS NOT rendered when it is true", () => {
      // Arrange
      const dialogTestId = "dialog";
      const mockedTicketId = 9999;

      render(<TicketDetailModal isOpen={false} ticketId={mockedTicketId} />, {
        wrapper: TestRendererWithProjectContext,
      });

      // Assert
      expect(screen.queryByTestId(dialogTestId)).toBeNull();
    });

    test(" - the component is rendered when it is true", () => {
      // Arrange
      const mockedTicketId = 9999;
      const dialogTestId = "dialog";

      render(<TicketDetailModal isOpen={true} ticketId={mockedTicketId} />, {
        wrapper: TestRendererWithProjectContext,
      });
      const renderedDialog = screen.getByTestId(dialogTestId);

      // Assert
      expect(renderedDialog).toBeTruthy();
    });
  });

  describe("Passed onClose", () => {
    test("- clicking close button trigger onClose", () => {
      // Arrange
      const modalCloseButtonTestId = `icon_button`;
      const mockedTicketId = 9999;
      const mockedCallbackFn = jest.fn();

      render(<TicketDetailModal isOpen={true} ticketId={mockedTicketId} onClose={mockedCallbackFn} />, {
        wrapper: TestRendererWithProjectContext,
      });
      const closeButton = screen.getByTestId(modalCloseButtonTestId);

      // Act
      fireEvent.click(closeButton);

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });

    test("- key down esc key trigger onClose", () => {
      // Arrange
      const modalCloseButtonTestId = `dialog`;
      const mockedTicketId = 9999;
      const mockedCallbackFn = jest.fn();

      render(<TicketDetailModal isOpen={true} ticketId={mockedTicketId} onClose={mockedCallbackFn} />, {
        wrapper: TestRendererWithProjectContext,
      });
      const renderedModal = screen.getByTestId(modalCloseButtonTestId);

      // Act
      fireEvent.keyDown(renderedModal, { key: "Escape" });

      // Assert
      expect(mockedCallbackFn).toBeCalled();
    });
  });

  test("Passed ticketId - it should render all given needed info", async () => {
    // Arrange
    const mockedTicketId = 9999;

    render(<TicketDetailModal isOpen={true} ticketId={mockedTicketId} />, { wrapper: TestRendererWithProjectContext });

    const renderedEditableLabel = screen.getByLabelText("editable-label");
    const renderedAvatar = await screen.findByAltText<HTMLImageElement>("Mr Pug");

    // Assert
    // title
    expect(renderedEditableLabel).toHaveProperty("value", mockedName);

    // Avatar
    expect(renderedAvatar).toBeTruthy();

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
