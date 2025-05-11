import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Box } from "../Box/Box";
import style from "../Box/Box.module.css";
import { toCamelCase } from "@/lib/utils";
import * as LibTypes from "@/lib/types";

const paddingValues: LibTypes.PaddingType[] = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
];

describe("Box", () => {
  it("should always have the 'box' class", () => {
    render(<Box testId='box' />);
    const el = screen.getByTestId("box");
    expect(el.classList.contains(style.box)).toBe(true);
  });

  it("renders children properly", () => {
    render(
      <Box>
        <div>Contenido</div>
      </Box>
    );
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("should accept external classes", () => {
    render(<Box testId='box' className='custom-class' />);
    expect(screen.getByTestId("box")).toHaveClass("custom-class");
  });

  it("should support all padding values", () => {
    paddingValues.forEach((padding) => {
      render(<Box testId={`padding-${padding}`} padding={padding} />);
      const el = screen.getByTestId(`padding-${padding}`);
      const className = toCamelCase(`padding-${padding}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should support all paddingX values", () => {
    paddingValues.forEach((padding) => {
      render(<Box testId={`paddingX-${padding}`} paddingX={padding} />);
      const el = screen.getByTestId(`paddingX-${padding}`);
      const className = toCamelCase(`paddingX-${padding}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should support all paddingY values", () => {
    paddingValues.forEach((padding) => {
      render(<Box testId={`paddingY-${padding}`} paddingY={padding} />);
      const el = screen.getByTestId(`paddingY-${padding}`);
      const className = toCamelCase(`paddingY-${padding}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should apply border base class if borderColor or borderWidth is set", () => {
    render(<Box testId='border' borderColor='neutral900' borderWidth='sm' />);
    const el = screen.getByTestId("border");
    expect(el.classList.contains(style.border)).toBe(true);
  });

  it("should apply specific border width and color classes", () => {
    render(
      <Box testId='borderDetails' borderColor='neutral900' borderWidth='md' />
    );
    const el = screen.getByTestId("borderDetails");
    expect(el.classList.contains(style["borderMd"])).toBe(true);
    expect(el.classList.contains("borderNeutral900")).toBe(true);
  });

  it("should apply borderSm if only borderColor is provided", () => {
    render(<Box testId='borderSm' borderColor='neutral900' />);
    const el = screen.getByTestId("borderSm");
    expect(el.classList.contains(style.borderSm)).toBe(true);
  });

  it("should apply background color class", () => {
    render(<Box testId='bg' backgroundColor='neutral900' />);
    const el = screen.getByTestId("bg");
    expect(el.classList.contains("bgNeutral900")).toBe(true);
  });

  it("should apply radius class", () => {
    render(<Box testId='radius' radius='lg' />);
    const el = screen.getByTestId("radius");
    expect(el.classList.contains(style["radiusLg"])).toBe(true);
  });

  it("should apply shadow class", () => {
    render(<Box testId='shadow' shadow='md' />);
    const el = screen.getByTestId("shadow");
    expect(el.classList.contains(style["shadowMd"])).toBe(true);
  });

  it("should apply stretch class", () => {
    render(<Box testId='stretch' stretch />);
    const el = screen.getByTestId("stretch");
    expect(el.classList.contains(style.stretch)).toBe(true);
  });

  it("should support fit values", () => {
    const fitValues: LibTypes.FitType[] = ["content", "space"];

    fitValues.forEach((fit) => {
      render(<Box testId={`fit-${fit}`} fit={fit} />);
      const el = screen.getByTestId(`fit-${fit}`);
      const className = toCamelCase(`fit-${fit}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should support noAutoMinSize values", () => {
    render(<Box testId='noAutoMinSize-width' noAutoMinSize='width' />);
    const elWidth = screen.getByTestId("noAutoMinSize-width");
    expect(elWidth.classList.contains(style.minWidth0)).toBe(true);
    expect(elWidth.classList.contains(style.minHeight0)).toBe(false);

    render(<Box testId='noAutoMinSize-height' noAutoMinSize='height' />);
    const elHeight = screen.getByTestId("noAutoMinSize-height");
    expect(elHeight.classList.contains(style.minWidth0)).toBe(false);
    expect(elHeight.classList.contains(style.minHeight0)).toBe(true);

    render(<Box testId='noAutoMinSize-both' noAutoMinSize='both' />);
    const elBoth = screen.getByTestId("noAutoMinSize-both");
    expect(elBoth.classList.contains(style.minWidth0)).toBe(true);
    expect(elBoth.classList.contains(style.minHeight0)).toBe(true);
  });

  it("should apply clickable class when onClick is defined", () => {
    render(<Box testId='clickable' onClick={() => {}} />);
    const el = screen.getByTestId("clickable");
    expect(el.classList.contains(style.clickable)).toBe(true);
  });

  it("should call onClick when clicked", async () => {
    const onClick = jest.fn();
    render(
      <Box testId='clickable-box' onClick={onClick}>
        Click me
      </Box>
    );
    const component = screen.getByTestId("clickable-box");
    await userEvent.click(component);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
