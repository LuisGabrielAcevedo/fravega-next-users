import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import style from "../Grid/Grid.module.css";
import { Spacer } from "..";

describe("Spacer", () => {
  it("should always have the 'spacer' class", () => {
    render(<Spacer testId='spacer' />);
    const el = screen.getByTestId("spacer");
    expect(el.classList.contains(style.spacer)).toBe(true);
  });
});
