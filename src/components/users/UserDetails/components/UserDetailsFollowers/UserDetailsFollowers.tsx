import { IGithubUser } from "@/interfaces";
import { Box, Circle, HStack, Text, VStack } from "@/lib/components";
import Image from "next/image";
import React, { useState } from "react";

export const UserDetailsFollowers: React.FC<{ followers: IGithubUser[] }> = ({
  followers,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleFollowers = showAll ? followers : followers.slice(0, 5);
  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <Box
      testId='user-details-followers'
      borderColor='neutral200'
      padding='md'
      radius='md'
    >
      <VStack gap={16}>
        <Text as='h4' size={16} weight='medium'>
          Seguidores
        </Text>
        <VStack gap={8}>
          {followers.length ? (
            visibleFollowers.map((user) => (
              <Box key={user.id} testId='follower'>
                <HStack gap={16} align='center'>
                  <Circle>
                    <Image
                      src={user.avatar_url}
                      alt={user.login}
                      width={36}
                      height={36}
                    />
                  </Circle>
                  <Text color='neutral600'>{user.login}</Text>
                </HStack>
              </Box>
            ))
          ) : (
            <Text color='neutral400'>No hay seguidores.</Text>
          )}
        </VStack>
        {followers.length > 5 && (
          <HStack justify='flex-end'>
            <a
              onClick={toggleShowAll}
              className='primaryLink'
              role='button'
              tabIndex={0}
            >
              {showAll ? "Ver menos" : "Ver más"}
            </a>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};
