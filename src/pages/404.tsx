import { NextPage } from "next";
import { BackButton, Message } from "@/components";
import { Box, HStack, VStack } from "@/lib/components";
import { geistSans } from "@/styles/fonts";

const NotFountPage: NextPage = () => {
  return (
    <Box
      testId='not-found-page'
      className={geistSans.className}
      paddingY='xl'
      paddingX='md'
    >
      <VStack gap={24}>
        <HStack>
          <BackButton />
        </HStack>
        <Message
          title='Página no encontrada'
          description='Parece que este usuario no existe o ya no está disponible.'
        />
      </VStack>
    </Box>
  );
};

export default NotFountPage;
