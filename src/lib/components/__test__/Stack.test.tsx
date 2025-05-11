import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Center, HStack, Stack, VStack } from "..";
import style from "../Stack/Stack.module.css";
import { toCamelCase } from "@/lib/utils";
import * as LibTypes from "@/lib/types";

describe("Stack", () => {
  it("should always have the 'stack' class", () => {
    render(
      <Stack testId='stack'>
        <div>Child</div>
      </Stack>
    );
    const component = screen.getByTestId("stack");
    expect(component.classList.contains(style.stack)).toBe(true);
  });

  it("renders children properly", () => {
    render(
      <Stack>
        <div>Contenido</div>
      </Stack>
    );
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("should accept external classes", () => {
    render(<Stack testId='stack' className='custom-class' />);
    expect(screen.getByTestId("stack")).toHaveClass("custom-class");
  });

  it("should support all gap values", () => {
    const gapValues: LibTypes.GapType[] = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40];
    gapValues.forEach((gap) => {
      render(<Stack testId={`gap-${gap}`} gap={gap} />);
      const el = screen.getByTestId(`gap-${gap}`);
      expect(el.classList.contains(style[`gap${gap}`])).toBe(true);
    });
  });

  it("should support all direction values", () => {
    const directionValues: LibTypes.DirectionType[] = [
      "row",
      "column",
      "row-reverse",
      "column-reverse",
    ];

    directionValues.forEach((direction) => {
      render(<Stack testId={`stack-${direction}`} direction={direction} />);
      const el = screen.getByTestId(`stack-${direction}`);
      const className = toCamelCase(`direction-${direction}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should support all align values", () => {
    const alignValues: LibTypes.AlignItemsType[] = [
      "center",
      "flex-end",
      "flex-start",
      "stretch",
    ];

    alignValues.forEach((align) => {
      render(<Stack testId={`align-${align}`} align={align} />);
      const el = screen.getByTestId(`align-${align}`);
      const className = toCamelCase(`align-${align}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should support all justify values", () => {
    const justifyValues: LibTypes.JustifyContentType[] = [
      "center",
      "flex-end",
      "flex-start",
      "space-between",
    ];

    justifyValues.forEach((justify) => {
      render(<Stack testId={`justify-${justify}`} justify={justify} />);
      const el = screen.getByTestId(`justify-${justify}`);
      const className = toCamelCase(`justify-${justify}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should support all wrap values", () => {
    const wrapValues: LibTypes.WrapType[] = ["nowrap", "wrap", "wrap-reverse"];

    wrapValues.forEach((wrap) => {
      render(<Stack testId={`wrap-${wrap}`} wrap={wrap} />);
      const el = screen.getByTestId(`wrap-${wrap}`);
      const className = toCamelCase(`wrap-${wrap}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should apply the 'stretch' class when stretch is true", () => {
    render(<Stack testId='stretch' stretch />);
    const el = screen.getByTestId("stretch");
    expect(el.classList.contains(style.stretch)).toBe(true);
  });

  it("should support fit values", () => {
    const fitValues: LibTypes.FitType[] = ["content", "space"];

    fitValues.forEach((fit) => {
      render(<Stack testId={`fit-${fit}`} fit={fit} />);
      const el = screen.getByTestId(`fit-${fit}`);
      const className = toCamelCase(`fit-${fit}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should support noAutoMinSize values", () => {
    render(<Stack testId='noAutoMinSize-width' noAutoMinSize='width' />);
    const elWidth = screen.getByTestId("noAutoMinSize-width");
    expect(elWidth.classList.contains(style.minWidth0)).toBe(true);
    expect(elWidth.classList.contains(style.minHeight0)).toBe(false);

    render(<Stack testId='noAutoMinSize-height' noAutoMinSize='height' />);
    const elHeight = screen.getByTestId("noAutoMinSize-height");
    expect(elHeight.classList.contains(style.minWidth0)).toBe(false);
    expect(elHeight.classList.contains(style.minHeight0)).toBe(true);

    render(<Stack testId='noAutoMinSize-both' noAutoMinSize='both' />);
    const elBoth = screen.getByTestId("noAutoMinSize-both");
    expect(elBoth.classList.contains(style.minWidth0)).toBe(true);
    expect(elBoth.classList.contains(style.minHeight0)).toBe(true);
  });
});

describe("VStack", () => {
  it("should always have the 'directionColumn' class", () => {
    render(
      <VStack testId='column'>
        <div>Child</div>
      </VStack>
    );
    const component = screen.getByTestId("column");
    expect(component.classList.contains(style.directionColumn)).toBe(true);
  });
});

describe("HStack", () => {
  it("should always have the 'directionRow' class", () => {
    render(
      <HStack testId='row'>
        <div>Child</div>
      </HStack>
    );
    const component = screen.getByTestId("row");
    expect(component.classList.contains(style.directionRow)).toBe(true);
  });
});

describe("Center", () => {
  it("should always have the 'directionRow' 'alignCenter' and 'justifyCenter' classes", () => {
    render(
      <Center testId='center'>
        <div>Child</div>
      </Center>
    );
    const component = screen.getByTestId("center");
    expect(component.classList.contains(style.directionRow)).toBe(true);
    expect(component.classList.contains(style.alignCenter)).toBe(true);
    expect(component.classList.contains(style.justifyCenter)).toBe(true);
  });
});
