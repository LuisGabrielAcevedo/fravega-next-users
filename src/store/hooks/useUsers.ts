import { useCallback } from "react";
import { useUsersStore } from "../zustand";
import { API } from "../requests";
import { IGithubUser } from "@/interfaces";

export const useUsers = () => {
  const {
    users,
    favoriteUsers,
    loading,
    error,
    setUsers,
    setFavoriteUsers,
    setLoading,
    setError,
  } = useUsersStore();

  const getUsersAction = useCallback(async () => {
    try {
      setLoading("GET_USER_LOADING");
      const users = await API.users.getUsers();
      setUsers(users);
    } catch (err) {
      setError(`GET_USERS_ERROR: ${err}`);
    } finally {
      setLoading("LOADED");
    }
  }, [setUsers, setLoading, setError]);

  const getUsersSearchAction = useCallback(
    async (q: string) => {
      if (q) {
        try {
          setLoading("GET_USER_LOADING");
          const users = await API.users.getUsersSearch(q);
          setUsers(users.items);
        } catch (err) {
          setError(`GET_USERS_ERROR: ${err}`);
        } finally {
          setLoading("LOADED");
        }
      } else {
        getUsersAction();
      }
    },
    [getUsersAction, setUsers, setLoading, setError]
  );

  const toggleFavoriteUser = useCallback(
    (user: IGithubUser) => {
      const isFavorite = favoriteUsers.some((u) => u.id === user.id);
      const updatedFavorites = isFavorite
        ? favoriteUsers.filter((u) => u.id !== user.id)
        : [...favoriteUsers, user];

      setFavoriteUsers(updatedFavorites);
    },
    [favoriteUsers, setFavoriteUsers]
  );

  return {
    users,
    loading,
    error,
    favoriteUsers,
    getUsersAction,
    toggleFavoriteUser,
    getUsersSearchAction,
  };
};
