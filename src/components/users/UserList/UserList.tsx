"use client";
import { useRouter } from "next/router";
import { Box, HStack, VStack } from "@/lib/components";
import React, { useEffect } from "react";
import { useUsers } from "@/store/hooks";
import { UserListSearch } from "./components/UserListSearch/UserListSearch";
import { UserListContent } from "./components/UserListContent/UserListContent";
import { useQueryParam } from "@/hooks";

export const UserList: React.FC = () => {
  const router = useRouter();
  const { q, setQ } = useQueryParam();
  const { getUsersSearchAction } = useUsers();

  useEffect(() => {
    if (!router.isReady) return;
    getUsersSearchAction(q);
  }, [q, router.isReady, getUsersSearchAction]);

  return (
    <VStack testId='user-list' gap={32}>
      <HStack justify='center'>
        <UserListSearch defaultValue={q} onSearch={setQ} />
      </HStack>
      <Box testId='user-list-content-component'>
        <UserListContent {...{ q }} />
      </Box>
    </VStack>
  );
};
