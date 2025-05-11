"use client";
import React from "react";
import { Grid, Text } from "@/lib/components";
import { UserCard, Message } from "@/components";
import { useUsers } from "@/store/hooks";

export const FavoriteUserList: React.FC = () => {
  const { favoriteUsers, toggleFavoriteUser } = useUsers();

  if (!favoriteUsers.length)
    return (
      <Message
        title={
          <Text as='p' size={20} weight='semibold' align='center'>
            Aún no tienes usuarios favoritos
          </Text>
        }
        description='Haz clic en el corazón para agregarlos a tu lista.'
      />
    );

  return (
    <Grid testId='favorite-user-list' gap={16}>
      {favoriteUsers.map((user) => (
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
