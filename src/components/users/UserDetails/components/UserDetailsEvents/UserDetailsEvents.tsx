import React, { useState } from "react";
import style from "./UserDetailsEvents.module.css";
import { IGithubEvent } from "@/interfaces";
import { Box, HStack, Text, VStack } from "@/lib/components";
import folder from "@/assets/icons/folder-line.svg";
import Image from "next/image";

export const UserDetailsEvents: React.FC<{ events: IGithubEvent[] }> = ({
  events,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleEvents = showAll ? events : events.slice(0, 5);
  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <Box
      testId='user-details-events'
      borderColor='neutral200'
      padding='md'
      radius='md'
    >
      <VStack gap={16}>
        <Text as='h4' size={16} weight='medium'>
          Eventos de tus seguidores
        </Text>
        <VStack>
          {events.length ? (
            visibleEvents.map((event, index) => (
              <Box key={event.id} testId='event'>
                <HStack gap={16}>
                  <VStack align='center'>
                    <Box
                      fit='space'
                      borderColor={
                        index > 0 || (index === 0 && showAll)
                          ? "neutral200"
                          : "neutral0"
                      }
                    />
                    <Box
                      className={style.userDetailsEventsPoint}
                      backgroundColor='indigo400'
                      radius='round'
                    />
                    <Box
                      fit='space'
                      borderColor={
                        index < visibleEvents.length - 1 ||
                        (showAll && index < events.length - 1)
                          ? "neutral200"
                          : "neutral0"
                      }
                    />
                  </VStack>
                  <Box paddingY='sm'>
                    <VStack gap={4}>
                      <HStack gap={4}>
                        <Image src={folder} alt={event.repo.name} />
                        <Text color='neutral600'>{event.repo.name}</Text>
                      </HStack>
                      <Text weight='medium'>{event.actor.login}</Text>
                    </VStack>
                  </Box>
                </HStack>
              </Box>
            ))
          ) : (
            <Text color='neutral400'>No hay eventos registrados.</Text>
          )}
        </VStack>
        {events.length > 5 && (
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
