import { render, screen } from "@testing-library/react";

import { MOCKED_PROJECT } from "./constants";
import Project from "./Project";

describe("<Project />", () => {
  test("Given project - it should render all given needed info", () => {
    // Arrange
    const projectTitle = MOCKED_PROJECT.name;
    const firstColumnTitle = MOCKED_PROJECT.columns[0].name;
    const secondColumnTitle = MOCKED_PROJECT.columns[1].name;
    const thirdColumnTitle = MOCKED_PROJECT.columns[2].name;

    render(<Project project={MOCKED_PROJECT} />);

    const allColumnLabels = screen.getAllByLabelText("editable-label");

    // Assert
    // project title
    expect(allColumnLabels[0]).toHaveProperty("value", projectTitle);
    // project's star icon
    expect(screen.getByText("Board")).toBeTruthy();
    expect(screen.getByTestId("starButton")).toBeTruthy();
    expect(screen.getByText("test")).toBeTruthy();
    expect(screen.getByText("Workspace visible")).toBeTruthy();
    expect(screen.getByText("Share")).toBeTruthy();
    expect(screen.getByText("Power-Ups")).toBeTruthy();
    expect(screen.getByText("Automation")).toBeTruthy();
    expect(screen.getByText("Filter")).toBeTruthy();
    expect(screen.getByText("Show manu")).toBeTruthy();

    // column title
    expect(allColumnLabels[1]).toHaveProperty("value", firstColumnTitle);
    expect(allColumnLabels[2]).toHaveProperty("value", secondColumnTitle);
    expect(allColumnLabels[3]).toHaveProperty("value", thirdColumnTitle);

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
