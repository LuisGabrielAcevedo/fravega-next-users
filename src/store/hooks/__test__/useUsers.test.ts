import { renderHook, act } from "@testing-library/react";
import { mockUser } from "@/mocks";
import { API } from "@/store/requests";
import { useUsers } from "../useUsers";

jest.mock("../../requests", () => ({
  API: {
    users: {
      getUsers: jest.fn(),
      getUsersSearch: jest.fn(),
    },
  },
}));

jest.mock("../../zustand", () => ({
  useUsersStore: jest.fn(),
}));

import { useUsersStore as originalUseUsersStore } from "../../zustand";

const useUsersStore = originalUseUsersStore as jest.MockedFunction<
  typeof originalUseUsersStore
>;

describe("useUsers", () => {
  const setUsers = jest.fn();
  const setFavoriteUsers = jest.fn();
  const setLoading = jest.fn();
  const setError = jest.fn();

  const mockUsersStoreReturn = (overrides = {}) => {
    useUsersStore.mockReturnValue({
      users: [],
      favoriteUsers: [],
      loading: "LOADED",
      error: null,
      setUsers,
      setFavoriteUsers,
      setLoading,
      setError,
      ...overrides,
    });
  };

  beforeEach(() => {
    mockUsersStoreReturn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getUsersAction should fetch users and update state", async () => {
    const mockUsers = [mockUser];
    (API.users.getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUsersAction();
    });

    expect(setLoading).toHaveBeenCalledWith("GET_USER_LOADING");
    expect(API.users.getUsers).toHaveBeenCalled();
    expect(setUsers).toHaveBeenCalledWith(mockUsers);
    expect(setLoading).toHaveBeenCalledWith("LOADED");
  });

  it("getUsersAction should set error and finalize loading if API call fails", async () => {
    const error = "Fetch failed";
    (API.users.getUsers as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUsersAction();
    });

    expect(setLoading).toHaveBeenCalledWith("GET_USER_LOADING");
    expect(setError).toHaveBeenCalledWith(`GET_USERS_ERROR: ${error}`);
    expect(setLoading).toHaveBeenLastCalledWith("LOADED");
  });

  it("getUsersSearchAction should call getUsersSearch and update state", async () => {
    const mockSearch = { items: [mockUser] };
    (API.users.getUsersSearch as jest.Mock).mockResolvedValueOnce(mockSearch);

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUsersSearchAction("test");
    });

    expect(API.users.getUsersSearch).toHaveBeenCalledWith("test");
    expect(setUsers).toHaveBeenCalledWith(mockSearch.items);
  });

  it("getUsersSearchAction should set error if search fails", async () => {
    const error = "Search failed";
    (API.users.getUsersSearch as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUsersSearchAction("query");
    });

    expect(setError).toHaveBeenCalledWith(`GET_USERS_ERROR: ${error}`);
    expect(setLoading).toHaveBeenLastCalledWith("LOADED");
  });

  it("getUsersSearchAction should fallback to getUsersAction if query is empty", async () => {
    const mockUsers = [mockUser];
    (API.users.getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUsersSearchAction("");
    });

    expect(API.users.getUsers).toHaveBeenCalled();
    expect(setUsers).toHaveBeenCalledWith(mockUsers);
  });

  it("toggleFavoriteUser should add and remove user correctly", () => {
    const user = mockUser;

    mockUsersStoreReturn({ favoriteUsers: [] });
    const { result, rerender } = renderHook(() => useUsers());

    act(() => {
      result.current.toggleFavoriteUser(user);
    });
    expect(setFavoriteUsers).toHaveBeenCalledWith([user]);

    mockUsersStoreReturn({ favoriteUsers: [user] });
    rerender();

    act(() => {
      result.current.toggleFavoriteUser(user);
    });
    expect(setFavoriteUsers).toHaveBeenCalledWith([]);
  });
});
