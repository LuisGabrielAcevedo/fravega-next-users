import { useMemo } from "react";

const buildClassNames = (
  classMap: Record<string, boolean | null | undefined>
): string => {
  return Object.entries(classMap)
    .filter(([, value]) => !!value)
    .map(([key]) => key)
    .join(" ");
};

export const useClassNames = (
  conditionalClasses: Record<string, boolean | null | undefined>,
  baseClasses: string = ""
): string =>
  useMemo(
    () =>
      [baseClasses, buildClassNames(conditionalClasses)]
        .filter(Boolean)
        .join(" ")
        .trim(),
    [baseClasses, conditionalClasses]
  );
