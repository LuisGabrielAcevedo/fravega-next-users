import { useRouter } from "next/router";
import { useCallback } from "react";

export const useQueryParam = () => {
  const router = useRouter();
  const query = router.query.q;
  const q = typeof query === "string" ? query : "";

  const setQ = useCallback(
    (val: string) => {
      router.replace(
        {
          pathname: router.pathname,
          query: val ? { ...router.query, q: val } : {},
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  return { q, setQ };
};
