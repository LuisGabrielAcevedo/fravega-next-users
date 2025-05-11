import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import style from "../IconButton/IconButton.module.css";
import { IconButton } from "..";
import userEvent from "@testing-library/user-event";

describe("IconButton", () => {
  it("should always have the 'iconButton' class", () => {
    render(<IconButton testId='iconButton' />);
    const el = screen.getByTestId("iconButton");
    expect(el.classList.contains(style.iconButton)).toBe(true);
  });

  it("renders children properly", () => {
    render(
      <IconButton>
        <div>Icon</div>
      </IconButton>
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  it("should accept external classes", () => {
    render(<IconButton testId='icon-button' className='custom-class' />);
    expect(screen.getByTestId("icon-button")).toHaveClass("custom-class");
  });

  it("should call onClick when clicked", async () => {
    const onClick = jest.fn();
    render(
      <IconButton testId='clickable-icon-button' onClick={onClick}>
        Click me
      </IconButton>
    );
    const component = screen.getByTestId("clickable-icon-button");
    await userEvent.click(component);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
