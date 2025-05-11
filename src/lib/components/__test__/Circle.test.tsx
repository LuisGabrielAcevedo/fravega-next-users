import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Circle } from "..";
import style from "../Circle/Circle.module.css";

describe("Circle", () => {
  it("should always have the 'circle' class", () => {
    render(<Circle testId='circle' />);
    const el = screen.getByTestId("circle");
    expect(el.classList.contains(style.circle)).toBe(true);
  });

  it("should render children correctly", () => {
    render(
      <Circle testId='circle-test'>
        <span>Child</span>
      </Circle>
    );
    const el = screen.getByTestId("circle-test");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("Child");
  });

  it("should accept external classes", () => {
    render(<Circle testId='circle' className='custom-class' />);
    expect(screen.getByTestId("circle")).toHaveClass("custom-class");
  });

  it("should not apply fixed size if 'size' is not provided", () => {
    render(<Circle testId='circle-test' />);
    const el = screen.getByTestId("circle-test");
    expect(el.style.width).toBe("");
    expect(el.style.height).toBe("");
  });

  it("should apply numeric size as px", () => {
    render(<Circle size={80} testId='circle-test' />);
    const el = screen.getByTestId("circle-test");
    expect(el).toHaveStyle({ width: "80px", height: "80px" });
  });

  it("should apply string size directly", () => {
    render(<Circle size='6rem' testId='circle-test' />);
    const el = screen.getByTestId("circle-test");
    expect(el).toHaveStyle({ width: "6rem", height: "6rem" });
  });
});
