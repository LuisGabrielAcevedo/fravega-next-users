import {
  IGithubEvent,
  IGithubRepository,
  IGithubUser,
  IGithubUserDetail,
} from "@/interfaces";
import style from "./UserDetails.module.css";
import { Box, VStack } from "@/lib/components";
import React from "react";
import { UserDetailsInfo } from "./components/UserDetailsInfo/UserDetailsInfo";
import { UserDetailsRepositories } from "./components/UserDetailsRepositories/UserDetailsRepositories";
import { UserDetailsEvents } from "./components/UserDetailsEvents/UserDetailsEvents";
import { UserDetailsFollowers } from "./components/UserDetailsFollowers/UserDetailsFollowers";

export const UserDetails: React.FC<{
  user: IGithubUserDetail;
  repositories: IGithubRepository[];
  events: IGithubEvent[];
  followers: IGithubUser[];
}> = ({ user, repositories, events, followers }) => {
  return (
    <VStack
      className={style.userDetailsContainer}
      testId='user-details'
      gap={16}
    >
      <Box className={style.userDetailsLeftSection}>
        <UserDetailsInfo user={user} />
      </Box>
      <Box className={style.userDetailsRightSection}>
        <VStack gap={16}>
          <UserDetailsRepositories repositories={repositories} />
          <UserDetailsFollowers followers={followers} />
          <UserDetailsEvents events={events} />
        </VStack>
      </Box>
    </VStack>
  );
};
