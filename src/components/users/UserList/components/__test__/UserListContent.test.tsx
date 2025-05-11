import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { UserListContent } from "../UserListContent/UserListContent";
import { useUsers } from "@/store/hooks";
import { mockUser } from "@/mocks";

jest.mock("../../../../../store/hooks", () => ({
  useUsers: jest.fn(),
}));

describe("UserListContent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be render only the error component", () => {
    (useUsers as jest.Mock).mockReturnValue({
      error: "Some error",
    });
    render(<UserListContent q='test' />);
    const errorEl = screen.queryByTestId("user-list-error");
    expect(errorEl).toBeInTheDocument();
    const loadingEl = screen.queryByTestId("user-list-loading-state");
    expect(loadingEl).not.toBeInTheDocument();
    const emptyEl = screen.queryByTestId("user-list-empty-state");
    expect(emptyEl).not.toBeInTheDocument();
    const usersEl = screen.queryByTestId("user-list-content");
    expect(usersEl).not.toBeInTheDocument();
  });

  it("should be render only the loading component", () => {
    (useUsers as jest.Mock).mockReturnValue({
      loading: "Loading",
    });
    render(<UserListContent q='test' />);
    const errorEl = screen.queryByTestId("user-list-error");
    expect(errorEl).not.toBeInTheDocument();
    const loadingEl = screen.queryByTestId("user-list-loading-state");
    expect(loadingEl).toBeInTheDocument();
    const emptyEl = screen.queryByTestId("user-list-empty-state");
    expect(emptyEl).not.toBeInTheDocument();
    const usersEl = screen.queryByTestId("user-list-content");
    expect(usersEl).not.toBeInTheDocument();
  });

  it("should be render only the empty component", () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [],
      loading: "LOADED",
      error: null,
    });
    render(<UserListContent q='test' />);
    const errorEl = screen.queryByTestId("user-list-error");
    expect(errorEl).not.toBeInTheDocument();
    const loadingEl = screen.queryByTestId("user-list-loading-state");
    expect(loadingEl).not.toBeInTheDocument();
    const emptyEl = screen.queryByTestId("user-list-empty-state");
    expect(emptyEl).toBeInTheDocument();
    const usersEl = screen.queryByTestId("user-list-content");
    expect(usersEl).not.toBeInTheDocument();
  });

  it("should be render only the users component", () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [mockUser],
      loading: "LOADED",
      error: null,
      favoriteUsers: [],
    });
    render(<UserListContent q='test' />);
    const errorEl = screen.queryByTestId("user-list-error");
    expect(errorEl).not.toBeInTheDocument();
    const loadingEl = screen.queryByTestId("user-list-loading-state");
    expect(loadingEl).not.toBeInTheDocument();
    const emptyEl = screen.queryByTestId("user-list-empty-state");
    expect(emptyEl).not.toBeInTheDocument();
    const usersEl = screen.queryByTestId("user-list-content");
    expect(usersEl).toBeInTheDocument();
  });

  it("should render user as favorite and call toggleFavoriteUser on click", async () => {
    const toggleFavoriteUser = jest.fn();

    (useUsers as jest.Mock).mockReturnValue({
      users: [mockUser],
      loading: "LOADED",
      error: null,
      favoriteUsers: [mockUser],
      toggleFavoriteUser,
    });

    render(<UserListContent q='test' />);

    const favoriteIcon = screen.getByAltText("user favorite");
    expect(favoriteIcon).toBeInTheDocument();

    const user = userEvent.setup();
    const button = screen.queryByRole("button") as HTMLElement;
    await user.click(button);
    expect(toggleFavoriteUser).toHaveBeenCalledWith(mockUser);
  });
});
