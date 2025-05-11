import { Grid, Skeleton } from "@/lib/components";
import React from "react";

export const UserListLoading: React.FC = () => {
  return (
    <Grid testId='user-list-loading-state' gap={16}>
      {Array.from({ length: 16 }).map((_value, i) => (
        <Skeleton key={i} height={168} />
      ))}
    </Grid>
  );
};
