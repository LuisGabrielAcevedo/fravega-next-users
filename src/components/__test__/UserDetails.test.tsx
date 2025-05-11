import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserDetails } from "..";
import {
  mockGithubEvent,
  mockGithubRepository,
  mockGithubUserDetail,
  mockUser,
} from "@/mocks";

describe("UserDetails", () => {
  it("should render the correct structure", () => {
    render(
      <UserDetails
        user={mockGithubUserDetail}
        events={[mockGithubEvent]}
        followers={[mockUser]}
        repositories={[mockGithubRepository]}
      />
    );
    const userInfo = screen.getByTestId("user-details-info");
    expect(userInfo).toBeInTheDocument();
    const followersEl = screen.getByTestId("user-details-followers");
    expect(followersEl).toBeInTheDocument();
    const eventsEl = screen.getByTestId("user-details-events");
    expect(eventsEl).toBeInTheDocument();
    const reposEl = screen.getByTestId("user-details-repos");
    expect(reposEl).toBeInTheDocument();
  });
});
