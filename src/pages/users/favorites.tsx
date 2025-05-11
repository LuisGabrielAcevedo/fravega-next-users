import {
  BackButton,
  FavoriteUserList,
  Loading,
  MainLayout,
} from "@/components";
import { Box, HStack, VStack } from "@/lib/components";
import { NextPage } from "next";

const FavoriteUsersPage: NextPage = () => {
  return (
    <Box backgroundColor='neutral50'>
      <MainLayout
        title='Frávega usuarios favoritos'
        description='Frávega, lista de mis usuarios favoritos'
        subtitle='Mis usuarios favoritos'
      >
        <Loading />
        <Box paddingY='xl' paddingX='md'>
          <VStack gap={24}>
            <HStack>
              <BackButton />
            </HStack>
            <Box testId='favorite-user-list-component'>
              <FavoriteUserList />
            </Box>
          </VStack>
        </Box>
      </MainLayout>
    </Box>
  );
};

export default FavoriteUsersPage;
