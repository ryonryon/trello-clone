import { render, screen, within, fireEvent } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import { mockGetComputedStyle, mockDndSpacing } from "react-beautiful-dnd-test-utils";

import Ticket from "../../interfaces/Ticket";
import { GrabbedItemContext, GRABBED_ITEM_CATEGORY } from "../Project/DnDColumnList";
import { ColumnBody, DnDColumnBody } from "./ColumnBody";

describe("<ColumnBody />", () => {
  test("passed appropriate props - It should render given ticket with title", () => {
    // Arrange
    const firstTicketTitle = mockedTickets[0].name;
    const secondTicketTitle = mockedTickets[1].name;
    const thirdTicketTitle = mockedTickets[2].name;
    const mockedOnEditCallback = jest.fn();

    render(<ColumnBody tickets={mockedTickets} onEditClick={mockedOnEditCallback} />);

    // Act
    screen.getAllByTestId("ticketEditButton").forEach((element) => {
      fireEvent.click(element);
    });

    // Assert
    expect(screen.getByText(firstTicketTitle)).toBeTruthy();
    expect(screen.getByText(secondTicketTitle)).toBeTruthy();
    expect(screen.getByText(thirdTicketTitle)).toBeTruthy();
    expect(mockedOnEditCallback).toBeCalledTimes(mockedTickets.length);
  });
});

describe("<DnDColumnBody />", () => {
  beforeEach(() => {
    mockGetComputedStyle();
  });

  test("passed appropriate props - It should render given ticket with title, edit icons", async () => {
    // Arrange
    const mockedColumnTitle = "Lorem Ipsum";
    const firstTicketTitle = mockedTickets[0].name;
    const secondTicketTitle = mockedTickets[1].name;
    const thirdTicketTitle = mockedTickets[2].name;
    const mockedCallback = jest.fn();

    const mockedOnEditCallback = jest.fn();

    const { container } = render(
      <GrabbedItemContext.Provider value={GRABBED_ITEM_CATEGORY.ROW_TICKET}>
        <DragDropContext onDragEnd={mockedCallback}>
          <DnDColumnBody
            columnId={1}
            title={mockedColumnTitle}
            tickets={mockedTickets}
            onEditClick={mockedOnEditCallback}
          />
        </DragDropContext>
      </GrabbedItemContext.Provider>,
    );

    mockDndSpacing(container);

    // Act
    screen.getAllByTestId("ticketEditButton").forEach((element) => {
      fireEvent.click(element);
    });
    // // this function doesn't run drag on test. Need further research.
    // await makeDnd({
    //   getDragElement: () => screen.getByText(firstTicketTitle).closest(DND_DRAGGABLE_DATA_ATTR),
    //   direction: DND_DIRECTION_DOWN,
    //   positions: 2,
    // });

    // Assert
    expect(screen.getByText(firstTicketTitle)).toBeTruthy();
    expect(screen.getByText(secondTicketTitle)).toBeTruthy();
    expect(screen.getByText(thirdTicketTitle)).toBeTruthy();
    expect(mockedOnEditCallback).toBeCalledTimes(mockedTickets.length);
    // Check if tickets are in expected order
    verifyTicketOrderInColumn(`columContainer-${mockedColumnTitle}`, [
      firstTicketTitle,
      secondTicketTitle,
      thirdTicketTitle,
    ]);
  });
});

const mockedTickets: Ticket[] = [
  {
    id: 101,
    name: "electronic typesetting",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    order: 1,
  },
  {
    id: 102,
    name: "Aldus PageMaker",
    description: "Aldus PageMaker including versions of Lorem Ipsum",
    order: 2,
  },
  {
    id: 103,
    name: "Why do we use it?",
    description: "It is a long established fact that a reader will be distracted",
    order: 3,
  },
];

const verifyTicketOrderInColumn = (columnTestId: string, orderedTickets: string[]): void => {
  const tickets = within(screen.getByTestId(columnTestId))
    .getAllByTestId("ticket")
    .map((x) => x.textContent);

  expect(tickets).toEqual(orderedTickets);
};
