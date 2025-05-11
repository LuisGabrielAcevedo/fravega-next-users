import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ScrollY } from "..";
import style from "../ScrollY/ScrollY.module.css";

describe("ScrollY", () => {
  it("should always have the 'scrollY' class", () => {
    render(<ScrollY testId='scrolly' />);
    const el = screen.getByTestId("scrolly");
    expect(el.classList.contains(style.scrollY)).toBe(true);
  });

  it("should render children correctly", () => {
    render(
      <ScrollY testId='scrolly'>
        <p>Child content</p>
      </ScrollY>
    );
    const el = screen.getByTestId("scrolly");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("Child content");
  });

  it("should accept external classes", () => {
    render(<ScrollY testId='scrollY' className='custom-class' />);
    expect(screen.getByTestId("scrollY")).toHaveClass("custom-class");
  });

  it("should apply overlay scroll by default", () => {
    render(<ScrollY testId='scrolly' />);
    const el = screen.getByTestId("scrolly");
    expect(el.classList.contains(style.overlayScroll)).toBe(true);
  });

  it("should apply auto scroll when overlay is false", () => {
    render(<ScrollY overlay={false} testId='scrolly' />);
    const el = screen.getByTestId("scrolly");
    expect(el.classList.contains(style.autoScroll)).toBe(true);
  });

  it("should apply maxHeight when provided as number", () => {
    render(<ScrollY maxHeight={400} testId='scrolly' />);
    const el = screen.getByTestId("scrolly");
    expect(el).toHaveStyle({ maxHeight: "400px" });
  });

  it("should apply maxHeight when provided as string", () => {
    render(<ScrollY maxHeight='60vh' testId='scrolly' />);
    const el = screen.getByTestId("scrolly");
    expect(el).toHaveStyle({ maxHeight: "60vh" });
  });
});
