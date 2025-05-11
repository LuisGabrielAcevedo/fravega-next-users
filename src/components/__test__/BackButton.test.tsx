import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BackButton } from "..";

describe("BackButton", () => {
  it("should render back icon inside a link to home", () => {
    render(<BackButton />);

    const icon = screen.getByAltText("back");
    expect(icon).toBeInTheDocument();

    const link = icon.closest("a");
    expect(link).toHaveAttribute("href", "/");
  });
});
