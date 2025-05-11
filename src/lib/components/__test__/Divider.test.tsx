import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Divider } from "..";
import style from "../Divider/Divider.module.css";
import { toCamelCase } from "@/lib/utils";
import * as LibTypes from "@/lib/types";

const testCases: {
  orientation: LibTypes.DividerOrientationType;
  borderWidth: LibTypes.BorderWidthType;
}[] = [
  { orientation: "horizontal", borderWidth: "sm" },
  { orientation: "horizontal", borderWidth: "lg" },
  { orientation: "vertical", borderWidth: "xs" },
  { orientation: "vertical", borderWidth: "xl" },
];

describe("Divider", () => {
  it("should always have the 'divider' class", () => {
    render(<Divider testId='divider' />);
    const el = screen.getByTestId("divider");
    expect(el.classList.contains(style.divider)).toBe(true);
  });

  it("should accept external classes", () => {
    render(<Divider testId='divider' className='custom-class' />);
    expect(screen.getByTestId("divider")).toHaveClass("custom-class");
  });

  testCases.forEach(({ orientation, borderWidth }) => {
    it(`should render ${orientation} divider with ${borderWidth} border`, () => {
      const testId = `divider-${orientation}-${borderWidth}`;
      render(
        <Divider
          testId={testId}
          orientation={orientation}
          borderWidth={borderWidth}
        />
      );

      const el = screen.getByTestId(testId);
      const orientationClass = toCamelCase(`divider-${orientation}`);
      const borderClass = toCamelCase(
        `divider-${orientation}-border-${borderWidth}`
      );

      expect(el.classList.contains(style[orientationClass])).toBe(true);
      expect(el.classList.contains(style[borderClass])).toBe(true);
    });
  });
});
