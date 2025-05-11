import { IGithubUser } from "@/interfaces";
import { create } from "zustand";

type UserLoadingState = "GET_USERS_LOADING" | "GET_USER_LOADING" | "LOADED";

interface UsersStore {
  users: IGithubUser[];
  favoriteUsers: IGithubUser[];
  loading: UserLoadingState;
  error: string | null;
  setUsers: (users: IGithubUser[]) => void;
  setFavoriteUsers: (users: IGithubUser[]) => void;
  setLoading: (state: UserLoadingState) => void;
  setError: (error: string | null) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  favoriteUsers: [],
  loading: "LOADED",
  error: null,
  setUsers: (users) => set({ users }),
  setFavoriteUsers: (favoriteUsers) => set({ favoriteUsers }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
