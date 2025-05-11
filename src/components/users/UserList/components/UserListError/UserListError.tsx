import React from "react";
import { Message } from "@/components";
import { Box, Text } from "@/lib/components";

export const UserListError: React.FC = () => {
  return (
    <Box testId='user-list-error'>
      <Message
        type='error'
        title={
          <Text as='p' size={20} weight='semibold' align='center'>
            Error
          </Text>
        }
        description='La búsqueda de usuarios no esta disponible.'
      />
    </Box>
  );
};
