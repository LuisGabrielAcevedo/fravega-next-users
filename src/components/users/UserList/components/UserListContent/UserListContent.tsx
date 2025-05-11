import { UserCard } from "@/components";
import { Grid } from "@/lib/components";
import { useUsers } from "@/store/hooks";
import React from "react";
import { UserListError } from "../UserListError/UserListError";
import { UserListLoading } from "../UserListLoading/UserListLoading";
import { UserListEmptyState } from "../UserListEmptyState/UserListEmptyState";

export const UserListContent: React.FC<{ q: string }> = ({ q }) => {
  const { users, loading, error, favoriteUsers, toggleFavoriteUser } =
    useUsers();

  if (error) return <UserListError />;

  if (loading !== "LOADED") return <UserListLoading />;

  if (!users.length) return <UserListEmptyState {...{ q }} />;

  return (
    <Grid testId='user-list-content' gap={16}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isFavorite={favoriteUsers.some((u) => u.id === user.id)}
          onFavorite={() => toggleFavoriteUser(user)}
        />
      ))}
    </Grid>
  );
};
