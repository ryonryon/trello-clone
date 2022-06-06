import { render, screen } from "@testing-library/react";

import { TestRendererWithContext } from "../../utils/testRendererWithContext";
import { MOCKED_PROJECT } from "./constants";
import DnDColumnList from "./DnDColumnList";

describe("<DnDColumnList />", () => {
  test("Given projectColumns - it should render all given tickets and columns", () => {
    // Arrange
    const firstColumnTitle = MOCKED_PROJECT.columns[0].name;
    const secondColumnTitle = MOCKED_PROJECT.columns[1].name;
    const thirdColumnTitle = MOCKED_PROJECT.columns[2].name;

    render(<DnDColumnList projectColumns={MOCKED_PROJECT.columns} />, { wrapper: TestRendererWithContext });

    const allColumnLabels = screen.getAllByLabelText("editable-label");

    // Assert
    // column title
    expect(allColumnLabels[0]).toHaveProperty("value", firstColumnTitle);
    expect(allColumnLabels[1]).toHaveProperty("value", secondColumnTitle);
    expect(allColumnLabels[2]).toHaveProperty("value", thirdColumnTitle);

    // column footer - check if all columns as its footer
    const allFooters = screen.getAllByText("Add a card");
    expect(allFooters.length).toBe(3);

    // tickets - check if all tickets in column are rendered
    for (const column of MOCKED_PROJECT.columns) {
      for (const ticket of column.tickets) {
        expect(screen.getByText(ticket.name)).toBeTruthy();
      }
    }
  });
});
