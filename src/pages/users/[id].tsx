import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { MainLayout, UserDetails, BackButton } from "@/components";
import { Box, HStack, VStack } from "@/lib/components";
import {
  IGithubEvent,
  IGithubRepository,
  IGithubUserDetail,
  IGithubUser,
} from "@/interfaces";
import {
  getUserBySlugAction,
  getUserEventsAction,
  getUserFollowersAction,
  getUserRepositoriesAction,
} from "@/store/actions";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.id as string;
  const user = await getUserBySlugAction(slug);

  if (!user) {
    return {
      notFound: true,
    };
  }

  const [repositories, events, followers] = await Promise.all([
    getUserRepositoriesAction(slug),
    getUserEventsAction(slug),
    getUserFollowersAction(slug),
  ]);

  return {
    props: { user, repositories, events, followers },
  };
};

const UserDetailsPage: NextPage<{
  user: IGithubUserDetail;
  repositories: IGithubRepository[];
  events: IGithubEvent[];
  followers: IGithubUser[];
}> = ({ user, repositories, events, followers }) => {
  return (
    <MainLayout
      title={user.name || user.login}
      description={`Decripción del usuario ${user.name || user.login}`}
      subtitle='Usuarios'
    >
      <Box paddingY='xl' paddingX='md'>
        <VStack gap={24}>
          <HStack>
            <BackButton />
          </HStack>
          <UserDetails {...{ user, repositories, events, followers }} />
        </VStack>
      </Box>
    </MainLayout>
  );
};

export default UserDetailsPage;
