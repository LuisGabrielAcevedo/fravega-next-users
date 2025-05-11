import React from "react";
import { IGithubUserDetail } from "@/interfaces";
import { Box, Circle, HStack, Position, Text, VStack } from "@/lib/components";
import Image from "next/image";
import place from "@/assets/icons/marker-pin-01-line.svg";
import { UserDetailsInfoFavorite } from "./components/UserDetailsInfoFavorite/UserDetailsInfoFavorite";

export const UserDetailsInfo: React.FC<{ user: IGithubUserDetail }> = ({
  user,
}) => {
  return (
    <Box
      isRelative
      testId='user-details-info'
      borderColor='neutral200'
      padding='md'
      radius='md'
    >
      <VStack gap={16} align='center'>
        <Circle>
          <Image
            priority
            src={user.avatar_url}
            alt={user.login}
            width={140}
            height={140}
          />
        </Circle>
        <VStack align='center'>
          <Text as='h4' size={20} weight='medium'>
            {user.login}
          </Text>
          <Text as='h3' color='neutral600'>
            {user.name}
          </Text>
        </VStack>
        <HStack gap={32} align='center' justify='center'>
          <VStack align='center' justify='center'>
            <Text size={28} weight='semibold'>
              {user.followers}
            </Text>
            <Text size={14} weight='medium'>
              Seguidores
            </Text>
          </VStack>
          <VStack align='center'>
            <Text size={28} weight='semibold'>
              {user.following}
            </Text>
            <Text size={14} weight='medium'>
              Seguidos
            </Text>
          </VStack>
        </HStack>
        {!!user.bio && (
          <Text align='center' color='neutral400'>
            {user.bio}
          </Text>
        )}
        {!!user.location && (
          <HStack gap={8}>
            <Image src={place} alt={user.location} />
            <Text color='neutral600'>{user.location}</Text>
          </HStack>
        )}
      </VStack>
      <Position position='absolute' top={8} right={8}>
        <UserDetailsInfoFavorite user={user} />
      </Position>
    </Box>
  );
};
