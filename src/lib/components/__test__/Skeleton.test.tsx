import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import style from "../Skeleton/Skeleton.module.css";
import { Skeleton } from "..";

describe("Skeleton", () => {
  it("should always have the 'skeleton' class", () => {
    render(<Skeleton testId='skeleton' />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveClass(style.skeleton);
  });

  it("should apply default height and width", () => {
    render(<Skeleton testId='skeleton' />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveStyle({ height: "16px", width: "100%" });
  });

  it("should apply numeric height as px", () => {
    render(<Skeleton testId='skeleton' height={32} />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({ height: "32px" });
  });

  it("should apply string height directly", () => {
    render(<Skeleton testId='skeleton' height='5rem' />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({ height: "5rem" });
  });

  it("should apply numeric width as px", () => {
    render(<Skeleton testId='skeleton' width={120} />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({ width: "120px" });
  });

  it("should apply string width directly", () => {
    render(<Skeleton testId='skeleton' width='50%' />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({ width: "50%" });
  });
});
