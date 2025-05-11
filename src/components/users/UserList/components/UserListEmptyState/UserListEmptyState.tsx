import React from "react";
import { Box, Text, VStack } from "@/lib/components";
import { Message } from "@/components";

export const UserListEmptyState: React.FC<{ q: string }> = ({ q }) => {
  return (
    <Box testId='user-list-empty-state'>
      <Message
        title={
          <VStack>
            <Text as='p' size={20} weight='semibold' align='center'>
              {q
                ? "No encontramos resultados para"
                : "No hay usuarios registrados"}
            </Text>
            {!!q && (
              <VStack gap={16}>
                <Text
                  size={20}
                  weight='medium'
                  color='indigo600'
                  align='center'
                >
                  {`"${q}"`}
                </Text>
              </VStack>
            )}
          </VStack>
        }
        description={q && "Te recomendamos revisar la escritura de la palabra."}
      />
    </Box>
  );
};
