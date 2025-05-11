import React from "react";
import { IGithubUser } from "@/interfaces";
import {
  Box,
  Text,
  VStack,
  IconButton,
  Position,
  Circle,
} from "@/lib/components";
import Image from "next/image";
import heartLine from "@/assets/icons/heart-rounded-line.svg";
import heartSolid from "@/assets/icons/heart-rounded-solid.svg";
import Link from "next/link";

export const UserCard: React.FC<{
  user: IGithubUser;
  isFavorite?: boolean;
  onFavorite?: (user: IGithubUser) => void;
}> = ({ user, isFavorite, onFavorite }) => {
  return (
    <Link href={`/users/${user.login}`} className='cleanLink'>
      <Box
        isRelative
        padding='md'
        shadow='md'
        backgroundColor='neutral0'
        radius='sm'
        testId='user-card'
      >
        <VStack gap={16} align='center'>
          <Circle>
            <Image
              src={user.avatar_url}
              alt={`user ${user.login}`}
              width={100}
              height={100}
            />
          </Circle>
          <Text as='h1' transform='capitalize' size={16}>
            {user.login}
          </Text>
        </VStack>
        <Position position='absolute' top={8} right={8}>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavorite?.(user);
            }}
          >
            <Image
              src={isFavorite ? heartSolid : heartLine}
              alt={isFavorite ? "user favorite" : "user no favorite"}
            />
          </IconButton>
        </Position>
      </Box>
    </Link>
  );
};
