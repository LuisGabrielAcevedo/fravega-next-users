import { IGithubRepository } from "@/interfaces";
import { Box, HStack, Spacer, Text, VStack } from "@/lib/components";
import Image from "next/image";
import React, { useState } from "react";
import folder from "@/assets/icons/folder-line.svg";
import { formatDate } from "@/utils";

export const UserDetailsRepositories: React.FC<{
  repositories: IGithubRepository[];
}> = ({ repositories }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleRepos = showAll ? repositories : repositories.slice(0, 5);
  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <Box
      testId='user-details-repos'
      borderColor='neutral200'
      padding='md'
      radius='md'
    >
      <VStack gap={16}>
        <Text as='h4' size={16} weight='medium'>
          Repositorios
        </Text>
        <VStack>
          {repositories && repositories.length > 0 ? (
            visibleRepos.map((repo) => (
              <Box padding='sm' testId='repository' key={repo.id}>
                <HStack gap={8} stretch align='center'>
                  <Image src={folder} alt={repo.name} />
                  <Text ellipsis color='neutral600'>
                    {repo.name}
                  </Text>
                  <Spacer />
                  <Text fit='content' color='neutral400' size={14}>
                    {formatDate(repo.updated_at)}
                  </Text>
                </HStack>
              </Box>
            ))
          ) : (
            <Text color='neutral400'>No hay repositorios disponibles.</Text>
          )}
        </VStack>
        {repositories.length > 5 && (
          <HStack justify='flex-end'>
            <a onClick={toggleShowAll} className='primaryLink'>
              {showAll ? "Ver menos" : "Ver más"}
            </a>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};
