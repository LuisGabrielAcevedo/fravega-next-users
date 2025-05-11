import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserList } from "..";
import { useRouter } from "next/router";
import { useUsers } from "@/store/hooks";
import { useQueryParam } from "@/hooks";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../store/hooks", () => ({
  useUsers: jest.fn(),
}));

jest.mock("../../hooks", () => ({
  useQueryParam: jest.fn(),
}));

describe("UserList", () => {
  const getUsersSearchAction = jest.fn();
  const query = "test";

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
      isReady: true,
      query: { q: query },
    });

    (useQueryParam as jest.Mock).mockReturnValue({
      q: query,
      setQ: jest.fn(),
    });

    (useUsers as jest.Mock).mockReturnValue({
      getUsersSearchAction,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the correct structure", () => {
    render(<UserList />);
    expect(screen.getByTestId("user-list-search")).toBeInTheDocument();
    expect(
      screen.getByTestId("user-list-content-component")
    ).toBeInTheDocument();
  });

  it("should call getUsersSearchAction with the query param", () => {
    render(<UserList />);
    expect(getUsersSearchAction).toHaveBeenCalledWith(query);
  });

  it("should not call getUsersSearchAction if router is not ready", () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
      isReady: false,
      query: { q: "test" },
    });

    render(<UserList />);
    expect(getUsersSearchAction).not.toHaveBeenCalled();
  });
});
