import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Position } from "..";
import style from "../Position/Position.module.css";

describe("Position", () => {
  it("should always have the 'position' class", () => {
    render(<Position testId='position' />);
    const el = screen.getByTestId("position");
    expect(el.classList.contains(style.position)).toBe(true);
  });

  it("should render children correctly", () => {
    const { getByTestId } = render(
      <Position testId='position-test'>
        <span>Child</span>
      </Position>
    );

    const el = getByTestId("position-test");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("Child");
  });

  it("should accept external classes", () => {
    render(<Position testId='position' className='custom-class' />);
    expect(screen.getByTestId("position")).toHaveClass("custom-class");
  });

  it('should apply default position class "relative"', () => {
    const { getByTestId } = render(<Position testId='position-test' />);
    expect(getByTestId("position-test")).toHaveClass("relative");
  });

  it('should apply "absolute" position class', () => {
    const { getByTestId } = render(
      <Position position='absolute' testId='position-test' />
    );
    expect(getByTestId("position-test")).toHaveClass("absolute");
  });

  it("should apply style props as strings", () => {
    const { getByTestId } = render(
      <Position
        top='10px'
        right='1rem'
        bottom='5%'
        left='auto'
        zIndex={99}
        testId='position-test'
      />
    );

    expect(getByTestId("position-test")).toHaveStyle({
      top: "10px",
      right: "1rem",
      bottom: "5%",
      left: "auto",
      zIndex: 99,
    });
  });

  it("should convert numeric props to px", () => {
    const { getByTestId } = render(
      <Position
        top={20}
        left={30}
        right={5}
        bottom={0}
        testId='position-test'
      />
    );

    expect(getByTestId("position-test")).toHaveStyle({
      top: "20px",
      left: "30px",
      right: "5px",
      bottom: "0px",
    });
  });
});
