import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDetailsFollowers } from "../UserDetailsFollowers/UserDetailsFollowers";
import { IGithubUser } from "@/interfaces";
import { mockUser } from "@/mocks";

const generateFollower = (id: number): IGithubUser => ({
  ...mockUser,
  id,
  login: `user${id}`,
  avatar_url: `https://avatars.githubusercontent.com/u/${id}`,
});

describe("UserDetailsFollowers", () => {
  it("should render the component container", () => {
    const followers = [generateFollower(1)];
    render(<UserDetailsFollowers followers={followers} />);
    expect(screen.getByTestId("user-details-followers")).toBeInTheDocument();
  });

  it("should render fallback text when there are no followers", () => {
    render(<UserDetailsFollowers followers={[]} />);
    expect(screen.getByText("No hay seguidores.")).toBeInTheDocument();
  });

  it("should render up to 5 followers initially", () => {
    const followers = Array.from({ length: 10 }, (_, i) => generateFollower(i));
    render(<UserDetailsFollowers followers={followers} />);
    const visibleFollowers = screen.getAllByTestId("follower");
    expect(visibleFollowers.length).toBe(5);
  });

  it("should toggle show all followers when 'Ver más' is clicked", async () => {
    const user = userEvent.setup();
    const followers = Array.from({ length: 8 }, (_, i) => generateFollower(i));
    render(<UserDetailsFollowers followers={followers} />);

    expect(screen.getByText("Ver más")).toBeInTheDocument();

    await user.click(screen.getByText("Ver más"));
    const allFollowers = screen.getAllByTestId("follower");
    expect(allFollowers.length).toBe(8);

    await user.click(screen.getByText("Ver menos"));
    const reducedFollowers = screen.getAllByTestId("follower");
    expect(reducedFollowers.length).toBe(5);
  });

  it("should not render 'Ver más' if there are 5 or fewer followers", () => {
    const followers = Array.from({ length: 3 }, (_, i) => generateFollower(i));
    render(<UserDetailsFollowers followers={followers} />);
    expect(screen.queryByText("Ver más")).not.toBeInTheDocument();
  });
});
