import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Text } from "..";
import { toCamelCase } from "@/lib/utils";
import * as LibTypes from "@/lib/types";
import style from "../Text/Text.module.css";

describe("Text", () => {
  it("should always have the 'text' class", () => {
    render(<Text testId='text' />);
    const el = screen.getByTestId("text");
    expect(el.classList.contains(style.text)).toBe(true);
  });

  it("renders children properly", () => {
    render(<Text>Text</Text>);
    expect(screen.getByText("Text")).toBeInTheDocument();
  });

  it("should accept external classes", () => {
    render(<Text testId='text' className='custom-class' />);
    expect(screen.getByTestId("text")).toHaveClass("custom-class");
  });

  it("should render as a 'span' by default", () => {
    render(<Text testId='text'>Hello</Text>);
    const el = screen.getByTestId("text");
    expect(el.tagName.toLowerCase()).toBe("span");
  });

  it("should apply font size", () => {
    render(
      <Text testId='size' size={16}>
        Hello
      </Text>
    );
    const el = screen.getByTestId("size");
    expect(el.classList.contains(style.text16)).toBe(true);
  });

  it("should apply line height", () => {
    render(
      <Text testId='lh' lineHeight={24}>
        Hello
      </Text>
    );
    const el = screen.getByTestId("lh");
    expect(el.classList.contains(style.leading24)).toBe(true);
  });

  it("should apply font weight", () => {
    render(
      <Text testId='weight' weight='bold'>
        Hello
      </Text>
    );
    const el = screen.getByTestId("weight");
    expect(el.classList.contains(style.fontBold)).toBe(true);
  });

  it("should apply color", () => {
    render(
      <Text color='neutral900' testId='color' weight='bold'>
        Hello
      </Text>
    );
    const el = screen.getByTestId("color");
    expect(el.classList.contains("textNeutral900")).toBe(true);
  });

  it("should apply text alignment", () => {
    render(
      <Text testId='align' align='center'>
        Hello
      </Text>
    );
    const el = screen.getByTestId("align");
    expect(el.classList.contains(style.alignCenter)).toBe(true);
  });

  it("should support fit values", () => {
    const fitValues: LibTypes.FitType[] = ["content", "space"];

    fitValues.forEach((fit) => {
      render(<Text testId={`fit-${fit}`} fit={fit} />);
      const el = screen.getByTestId(`fit-${fit}`);
      const className = toCamelCase(`fit-${fit}`);
      expect(el.classList.contains(style[className])).toBe(true);
    });
  });

  it("should apply ellipsis class", () => {
    render(
      <Text testId='ellipsis' ellipsis>
        Ellipsis
      </Text>
    );
    const el = screen.getByTestId("ellipsis");
    expect(el.classList.contains(style.ellipsis)).toBe(true);
  });

  it("should apply text decoration style", () => {
    render(
      <Text testId='decoration' textDecoration='underline-dotted'>
        Text
      </Text>
    );
    const el = screen.getByTestId("decoration");
    expect(el.classList.contains(style.underlineDotted)).toBe(true);
  });

  it("should apply word break", () => {
    render(
      <Text testId='break' wordBreak='break-word'>
        Break
      </Text>
    );
    const el = screen.getByTestId("break");
    expect(el.classList.contains(style.breakWord)).toBe(true);
  });
});
