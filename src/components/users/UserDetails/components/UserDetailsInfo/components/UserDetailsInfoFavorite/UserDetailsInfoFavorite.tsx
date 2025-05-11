"use client";
import { IGithubUser } from "@/interfaces";
import { IconButton } from "@/lib/components";
import React from "react";
import Image from "next/image";
import heartLine from "@/assets/icons/heart-rounded-line.svg";
import heartSolid from "@/assets/icons/heart-rounded-solid.svg";
import { useUsers } from "@/store/hooks";

export const UserDetailsInfoFavorite: React.FC<{ user: IGithubUser }> = ({
  user,
}) => {
  const { favoriteUsers, toggleFavoriteUser } = useUsers();
  const isFavorite = favoriteUsers.some((u) => u.id === user.id);
  return (
    <IconButton
      testId='favorite-icon-button'
      onClick={() => toggleFavoriteUser(user)}
    >
      <Image
        src={isFavorite ? heartSolid : heartLine}
        alt={isFavorite ? "user favorite" : "user no favorite"}
      />
    </IconButton>
  );
};
