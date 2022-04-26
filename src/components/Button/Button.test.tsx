import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

test("Passed tittle - it should be rendered with given props", () => {
  // Arrange
  const mockedTitle = "This is mocked title";
  const { getByText } = render(<Button title="falsy" />);

  // Assert
  expect(getByText(mockedTitle)).toBeTruthy();
});
