import { render, screen, fireEvent } from "@testing-library/react";
import Avatar from "./Avatar";

describe("<Avatar />", () => {
  test("Passed alt - it should be rendered with given props", () => {
    // Arrange
    const mockedAlt = "mocked alt";

    render(<Avatar alt={mockedAlt} size="S" />);
    const renderedAvatar = screen.findByText(mockedAlt.charAt(0));

    // Assert
    expect(renderedAvatar).toBeTruthy();
  });

  test("Passed src - it should be rendered with given props", async () => {
    // Arrange
    const mockedAlt = "mocked alt";
    const mockedSrc =
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg";

    render(<Avatar size="S" alt={mockedAlt} src={mockedSrc} />);
    const renderedAvatar = await screen.findByAltText<HTMLImageElement>(mockedAlt);

    // Assert
    expect(renderedAvatar.src).toBe(mockedSrc);
  });

  describe("Passed size", () => {
    test("- it should be rendered with diameter 32px", () => {
      // Arrange
      const mockedAlt = "mocked alt";

      render(<Avatar alt={mockedAlt} size="S" />);

      const headerClass = Avatar({ size: "S" }).type.styledComponentId;
      const MyHeaderRoots = document.getElementsByClassName(headerClass);
      const style = window.getComputedStyle(MyHeaderRoots[0]);

      // Assert
      expect(style.height).toBe("32px");
      expect(style.width).toBe("32px");
    });

    test("- it should be rendered with diameter 40px", () => {
      // Arrange
      const mockedAlt = "mocked alt";

      render(<Avatar alt={mockedAlt} size="M" />);

      const headerClass = Avatar({ size: "M" }).type.styledComponentId;
      const MyHeaderRoots = document.getElementsByClassName(headerClass);
      const style = window.getComputedStyle(MyHeaderRoots[0]);

      // Assert
      expect(style.height).toBe("40px");
      expect(style.width).toBe("40px");
    });

    test("- it should be rendered with diameter 48px", () => {
      // Arrange
      const mockedAlt = "mocked alt";

      render(<Avatar alt={mockedAlt} size="L" />);

      const headerClass = Avatar({ size: "L" }).type.styledComponentId;
      const MyHeaderRoots = document.getElementsByClassName(headerClass);
      const style = window.getComputedStyle(MyHeaderRoots[0]);

      // Assert
      expect(style.height).toBe("48px");
      expect(style.width).toBe("48px");
    });
  });
});
