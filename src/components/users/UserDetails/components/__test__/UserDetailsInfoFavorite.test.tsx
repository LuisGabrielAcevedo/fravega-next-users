import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockUser } from "@/mocks";
import { useUsers } from "@/store/hooks";
import { UserDetailsInfoFavorite } from "../UserDetailsInfo/components/UserDetailsInfoFavorite/UserDetailsInfoFavorite";

jest.mock("../../../../../store/hooks", () => ({
  useUsers: jest.fn(),
}));

describe("UserDetailsInfoFavorite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render favorite icon when user is favorite", () => {
    (useUsers as jest.Mock).mockReturnValue({
      favoriteUsers: [mockUser],
      toggleFavoriteUser: jest.fn(),
    });

    render(<UserDetailsInfoFavorite user={mockUser} />);

    const img = screen.getByAltText("user favorite");
    expect(img).toBeInTheDocument();
  });

  it("should render non-favorite icon when user is not favorite", () => {
    (useUsers as jest.Mock).mockReturnValue({
      favoriteUsers: [],
      toggleFavoriteUser: jest.fn(),
    });

    render(<UserDetailsInfoFavorite user={mockUser} />);

    const img = screen.getByAltText("user no favorite");
    expect(img).toBeInTheDocument();
  });

  it("should call toggleFavoriteUser when button is clicked", async () => {
    const toggleFavoriteUser = jest.fn();
    (useUsers as jest.Mock).mockReturnValue({
      favoriteUsers: [],
      toggleFavoriteUser,
    });

    const user = userEvent.setup();
    render(<UserDetailsInfoFavorite user={mockUser} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(toggleFavoriteUser).toHaveBeenCalledWith(mockUser);
    expect(toggleFavoriteUser).toHaveBeenCalledTimes(1);
  });
});
