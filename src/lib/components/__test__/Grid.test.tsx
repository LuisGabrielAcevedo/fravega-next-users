import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import style from "../Grid/Grid.module.css";
import { Grid } from "..";
import * as LibTypes from "@/lib/types";

describe("Grid", () => {
  it("should always have the 'grid' class", () => {
    render(<Grid testId='grid' />);
    const el = screen.getByTestId("grid");
    expect(el.classList.contains(style.grid)).toBe(true);
  });

  it("renders children properly", () => {
    render(
      <Grid>
        <div>Contenido</div>
      </Grid>
    );
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("should accept external classes", () => {
    render(<Grid testId='grid' className='custom-class' />);
    expect(screen.getByTestId("grid")).toHaveClass("custom-class");
  });

  it("should support all gap values", () => {
    const gapValues: LibTypes.GapType[] = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40];
    gapValues.forEach((gap) => {
      render(<Grid testId={`gap-${gap}`} gap={gap} />);
      const el = screen.getByTestId(`gap-${gap}`);
      expect(el.classList.contains(style[`gap${gap}`])).toBe(true);
    });
  });
});
