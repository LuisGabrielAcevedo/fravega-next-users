import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Message } from "..";

describe("Message", () => {
  it("should show always the title", () => {
    render(<Message title='Test Title' />);
    const titleEl = screen.getByText("Test Title");
    expect(titleEl).toBeInTheDocument();
  });

  it("should not show the description if not provided", () => {
    render(<Message title='No description' />);
    const descriptionEl = screen.queryByTestId("message-description");
    expect(descriptionEl).not.toBeInTheDocument();
  });

  it("should render the description if provided", () => {
    render(<Message title='With description' description='This is a test' />);
    const descriptionEl = screen.queryByTestId("message-description");
    expect(descriptionEl).toBeInTheDocument();
    expect(descriptionEl).toHaveTextContent("This is a test");
  });

  it('should render the "error" icon and styles when type is error', () => {
    render(<Message title='Error' type='error' />);
    const icon = screen.getByAltText("error icon");
    expect(icon).toBeInTheDocument();
    const container = screen.getByTestId("message");
    expect(container).toHaveAttribute("data-testid", "message");
  });

  it('should render the "empty" icon and styles by default', () => {
    render(<Message title='Empty' />);
    const icon = screen.getByAltText("empty icon");
    expect(icon).toBeInTheDocument();
  });
});
