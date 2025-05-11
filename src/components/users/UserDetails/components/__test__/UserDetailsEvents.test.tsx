import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserDetailsEvents } from "../UserDetailsEvents/UserDetailsEvents";
import userEvent from "@testing-library/user-event";
import { IGithubEvent } from "@/interfaces";
import { mockGithubEvent } from "@/mocks";

const generateEvent = (id: number): IGithubEvent => ({
  ...mockGithubEvent,
  id: id.toString(),
});

describe("UserDetailsEvents", () => {
  it("should render the component container", () => {
    const events = [generateEvent(1)];
    render(<UserDetailsEvents events={events} />);
    expect(screen.getByTestId("user-details-events")).toBeInTheDocument();
  });

  it("should render fallback text when there are no events", () => {
    render(<UserDetailsEvents events={[]} />);
    expect(screen.getByText("No hay eventos registrados.")).toBeInTheDocument();
  });

  it("should render up to 5 events initially", () => {
    const events = Array.from({ length: 10 }, (_, i) => generateEvent(i));
    render(<UserDetailsEvents events={events} />);
    const visibleRepos = screen.getAllByTestId("event");
    expect(visibleRepos.length).toBe(5);
  });

  it("should toggle show all events when 'Ver más' is clicked", async () => {
    const user = userEvent.setup();
    const events = Array.from({ length: 8 }, (_, i) => generateEvent(i));
    render(<UserDetailsEvents events={events} />);

    expect(screen.getByText("Ver más")).toBeInTheDocument();

    await user.click(screen.getByText("Ver más"));
    const allEvents = screen.getAllByTestId("event");
    expect(allEvents.length).toBe(8);

    await user.click(screen.getByText("Ver menos"));
    const reducedEvents = screen.getAllByTestId("event");
    expect(reducedEvents.length).toBe(5);
  });

  it("should not render 'Ver más' if there are 5 or fewer events", () => {
    const events = Array.from({ length: 3 }, (_, i) => generateEvent(i));
    render(<UserDetailsEvents events={events} />);
    expect(screen.queryByText("Ver más")).not.toBeInTheDocument();
  });
});
