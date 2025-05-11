import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { UserCard } from "..";
import { mockUser } from "@/mocks";

describe("UserCard", () => {
  it("should render always the user login", () => {
    render(<UserCard user={mockUser} />);
    const el = screen.getByText(mockUser.login);
    expect(el).toBeInTheDocument();
  });

  it("should render always the user avatar", () => {
    render(<UserCard user={mockUser} />);
    const avatarEl = screen.getByAltText(`user ${mockUser.login}`);
    const src = avatarEl.getAttribute("src");
    expect(src).toContain("avatars.githubusercontent.com");
  });

  it('should render "empty heart icon" by default', () => {
    render(<UserCard user={mockUser} />);
    const iconEl = screen.getByAltText("user no favorite");
    expect(iconEl).toBeInTheDocument();
  });

  it('should render "solid heart icon" when favorite', () => {
    render(<UserCard user={mockUser} isFavorite />);
    const iconEl = screen.getByAltText("user favorite");
    expect(iconEl).toBeInTheDocument();
  });

  it("should call onFavorite fn when favorite icon is clicked", async () => {
    const handleFavorite = jest.fn();
    render(<UserCard user={mockUser} onFavorite={handleFavorite} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(handleFavorite).toHaveBeenCalledWith(mockUser);
  });

  it("should have a link to the user details page", () => {
    render(<UserCard user={mockUser} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/users/${mockUser.login}`);
  });
});
