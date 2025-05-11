import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { mockUser } from "@/mocks";
import { useUsers } from "@/store/hooks";
import { FavoriteUserList } from "..";

jest.mock("../../store/hooks", () => ({
  useUsers: jest.fn(),
}));

describe("FavoriteUserList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the message component with a empty message when favoriteUsers is empty", () => {
    (useUsers as jest.Mock).mockReturnValue({
      favoriteUsers: [],
      toggleFavoriteUser: jest.fn(),
    });
    render(<FavoriteUserList />);
    const messageEl = screen.getByTestId("message");
    expect(messageEl).toBeInTheDocument();
    const title = screen.getByText("Aún no tienes usuarios favoritos");
    expect(title).toBeInTheDocument();
    const description = screen.getByText(
      "Haz clic en el corazón para agregarlos a tu lista."
    );
    expect(description).toBeInTheDocument();
  });

  it("should render the users grid when favoriteUsers has data", () => {
    (useUsers as jest.Mock).mockReturnValue({
      favoriteUsers: [mockUser],
      toggleFavoriteUser: jest.fn(),
    });
    render(<FavoriteUserList />);
    const el = screen.queryByTestId("favorite-user-list");
    expect(el).toBeInTheDocument();
  });

  it("should render the same amount of cards that I receive in the hook", () => {
    (useUsers as jest.Mock).mockReturnValue({
      favoriteUsers: [mockUser],
      toggleFavoriteUser: jest.fn(),
    });
    render(<FavoriteUserList />);
    const cards = screen.getAllByTestId("user-card");
    expect(cards.length).toBe([mockUser].length);
  });

  it("should call toggleFavoriteUser when the heart button on some card is clicked", async () => {
    const toggleFavoriteUser = jest.fn();
    (useUsers as jest.Mock).mockReturnValue({
      favoriteUsers: [mockUser],
      toggleFavoriteUser,
    });
    render(<FavoriteUserList />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(toggleFavoriteUser).toHaveBeenCalledWith(mockUser);
  });
});
