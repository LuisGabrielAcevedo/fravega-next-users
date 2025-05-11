import { act } from "@testing-library/react";
import { mockUser } from "@/mocks";
import { useUsersStore } from "..";

describe("useUsersStore", () => {
  afterEach(() => {
    useUsersStore.setState(useUsersStore.getInitialState());
  });

  it("should have the correct initial state", () => {
    const state = useUsersStore.getState();
    expect(state.users).toEqual([]);
    expect(state.favoriteUsers).toEqual([]);
    expect(state.loading).toBe("LOADED");
    expect(state.error).toBeNull();
  });

  it("should update users with setUsers", () => {
    act(() => {
      useUsersStore.getState().setUsers([mockUser]);
    });
    expect(useUsersStore.getState().users).toEqual([mockUser]);
  });

  it("should update favorite users with setFavoriteUsers", () => {
    act(() => {
      useUsersStore.getState().setFavoriteUsers([mockUser]);
    });
    expect(useUsersStore.getState().favoriteUsers).toEqual([mockUser]);
  });

  it("should update loading state with setLoading", () => {
    act(() => {
      useUsersStore.getState().setLoading("GET_USERS_LOADING");
    });
    expect(useUsersStore.getState().loading).toBe("GET_USERS_LOADING");
  });

  it("should update error state with setError", () => {
    act(() => {
      useUsersStore.getState().setError("Some error");
    });
    expect(useUsersStore.getState().error).toBe("Some error");
  });

  it("should clear error state with setError(null)", () => {
    act(() => {
      useUsersStore.getState().setError("Initial error");
    });
    act(() => {
      useUsersStore.getState().setError(null);
    });
    expect(useUsersStore.getState().error).toBeNull();
  });
});
