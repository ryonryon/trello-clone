import { act, fireEvent, render, screen } from "@testing-library/react";

import { TestRendererWithContext } from "../../utils/testRendererWithContext";
import AdditionColumn from "./AdditionColumn";

import "jest-styled-components";

beforeEach(() => {
  act(() => {
    render(<AdditionColumn />, {
      wrapper: TestRendererWithContext,
    });
  });
});

describe("<AdditionColumn />", () => {
  it("Default render - It should render closed state of the component", () => {
    const closedColumnText = "Add another list";

    expect(screen.getByText(closedColumnText)).toBeTruthy();
  });

  it("Press on the column - It should expand the component and show more items", async () => {
    const closedColumnText = "Add another list";
    const addButtonText = "Add card";
    const editableTitlePlacehold = "Enter list title...";

    // before press on the component - it should show default text
    expect(screen.getByText(closedColumnText)).toBeTruthy();
    expect(screen.getByTestId("AdditionColumn_expandableContainer")).toHaveStyleRule("opacity: 0");

    await act(async () => {
      fireEvent.click(screen.getByText(closedColumnText));
    });

    // after preesing on the component - it should change rendered components
    expect(screen.getByTestId("AdditionColumn_expandableContainer")).toHaveStyleRule("opacity: 1");
    expect(screen.getByText(addButtonText)).toBeTruthy();
    expect(screen.getByPlaceholderText(editableTitlePlacehold)).toBeTruthy();
  });

  it("Press on the close button - It should collapse the component and get back to deafult state", async () => {
    const closedColumnText = "Add another list";
    const addButtonText = "Add card";
    const editableTitlePlacehold = "Enter list title...";

    await act(async () => {
      fireEvent.click(screen.getByText(closedColumnText));
    });

    // after preesing on the component - it should change rendered components
    expect(screen.getByTestId("AdditionColumn_expandableContainer")).toHaveStyleRule("opacity: 1");
    expect(screen.getByText(addButtonText)).toBeTruthy();
    expect(screen.getByPlaceholderText(editableTitlePlacehold)).toBeTruthy();

    // Clinck on close button
    await act(async () => {
      fireEvent.click(screen.getByTestId("AdditionColumn_closeButton"));
    });

    // default state of the component - it should show default text
    expect(screen.queryByText(closedColumnText)).toBeTruthy();
    expect(screen.getByTestId("AdditionColumn_expandableContainer")).toHaveStyleRule("opacity: 0");
  });

  it("Press on the `Add card` button - It should collapse the component and get back to deafult state", async () => {
    const closedColumnText = "Add another list";
    const addButtonText = "Add card";
    const editableTitlePlacehold = "Enter list title...";
    const mockedExpectedValue = "Lorem Ipsum";
    const returnBody = {
      status: 200,
      body: {
        id: 1,
        name: mockedExpectedValue,
        sort: 1,
        project: {},
      },
    };

    // Mock fetch api with successful response body
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(returnBody.body),
      }),
    ) as jest.Mock;

    await act(async () => {
      fireEvent.click(screen.getByText(closedColumnText));
    });

    // after preesing on the component - it should change rendered components
    expect(screen.getByTestId("AdditionColumn_expandableContainer")).toHaveStyleRule("opacity: 1");
    expect(screen.queryByText(closedColumnText)).not.toBeTruthy();
    expect(screen.getByText(addButtonText)).toBeTruthy();
    expect(screen.getByPlaceholderText(editableTitlePlacehold)).toBeTruthy();

    // Clinck on close button
    await act(async () => {
      fireEvent.click(screen.getByText("Add card"));
    });

    // default state of the component - it should show default style
    expect(screen.getByTestId("AdditionColumn_expandableContainer")).toHaveStyleRule("opacity: 0");
  });
});
