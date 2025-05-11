import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserDetailsInfo } from "../UserDetailsInfo/UserDetailsInfo";
import { IGithubUserDetail } from "@/interfaces";
import { mockGithubUserDetail } from "@/mocks";

describe("UserDetailsInfo", () => {
  it("should render the container with user details", () => {
    render(<UserDetailsInfo user={mockGithubUserDetail} />);
    expect(screen.getByTestId("user-details-info")).toBeInTheDocument();
  });

  it("should render the avatar image", () => {
    render(<UserDetailsInfo user={mockGithubUserDetail} />);
    expect(screen.getByAltText(mockGithubUserDetail.login)).toBeInTheDocument();
  });

  it("should render user name and login", () => {
    render(<UserDetailsInfo user={mockGithubUserDetail} />);
    expect(screen.getByText(mockGithubUserDetail.login)).toBeInTheDocument();
    expect(screen.getByText(mockGithubUserDetail.name!)).toBeInTheDocument();
  });

  it("should render followers and following counts", () => {
    render(<UserDetailsInfo user={mockGithubUserDetail} />);
    expect(
      screen.getByText(mockGithubUserDetail.followers.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGithubUserDetail.following.toString())
    ).toBeInTheDocument();
    expect(screen.getByText("Seguidores")).toBeInTheDocument();
    expect(screen.getByText("Seguidos")).toBeInTheDocument();
  });

  it("should render bio if available", () => {
    render(<UserDetailsInfo user={mockGithubUserDetail} />);
    expect(screen.getByText(mockGithubUserDetail.bio!)).toBeInTheDocument();
  });

  it("should render location if available", () => {
    render(<UserDetailsInfo user={mockGithubUserDetail} />);
    expect(
      screen.getByText(mockGithubUserDetail.location!)
    ).toBeInTheDocument();
  });

  it("should render favorite button", () => {
    render(<UserDetailsInfo user={mockGithubUserDetail} />);
    expect(screen.getByTestId("favorite-icon-button")).toBeInTheDocument();
  });

  it("should not render bio or location if they are missing", () => {
    const userWithoutOptionalFields: IGithubUserDetail = {
      ...mockGithubUserDetail,
      bio: null,
      location: "",
    };

    render(<UserDetailsInfo user={userWithoutOptionalFields} />);
    expect(screen.queryByText("Fullstack Developer")).not.toBeInTheDocument();
    expect(screen.queryByText("Buenos Aires")).not.toBeInTheDocument();
  });
});
