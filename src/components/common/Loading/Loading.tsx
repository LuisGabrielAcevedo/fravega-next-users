import React, { useEffect, useState } from "react";
import style from "./Loading.module.css";
import { useRouter } from "next/router";
import { Box } from "@/lib/components";

export const Loading: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const stop = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", stop);
    router.events.on("routeChangeError", stop);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", stop);
      router.events.off("routeChangeError", stop);
    };
  }, [router]);
  return loading ? <Box testId='loading' className={style.loading} /> : null;
};
