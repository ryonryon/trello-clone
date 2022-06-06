import { createContext } from "react";
import { render, screen } from "@testing-library/react";
import { useTypeSafeContext } from "./useTypeSafeContext";

const MockedContext = createContext<string | undefined>(undefined);

// mock function to test `useTypeSafeContext()`. Renderes passed context value if it HAS value
function MockedContextComponent(): JSX.Element {
  const contextValue = useTypeSafeContext(MockedContext);
  return <div>{contextValue}</div>;
}

describe("useTypeSafeContext()", () => {
  test("Passed valid context - should render a component that contains passed value via context", () => {
    // arrange
    const mockedContextValue = "Lorem Ipsum";

    render(
      <MockedContext.Provider value={mockedContextValue}>
        <MockedContextComponent />
      </MockedContext.Provider>,
    );

    // assert
    expect(screen.getByText(mockedContextValue)).toBeTruthy();
  });

  test("Passed undefined context - should throw an error that indicates the context is broken", () => {
    // arrange
    const mockedContextValue = undefined;
    const expectedErrorMessage = "useContext must be inside a Provider with a value";

    // Assert
    expect(() =>
      render(
        <MockedContext.Provider value={mockedContextValue}>
          <MockedContextComponent />
        </MockedContext.Provider>,
      ),
    ).toThrow(new Error(expectedErrorMessage));
  });
});
