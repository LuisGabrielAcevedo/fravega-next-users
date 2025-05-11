import { useCallback, useRef } from "react";

export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestArgs = useRef<T | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      latestArgs.current = args;
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (latestArgs.current) {
          callback(...latestArgs.current);
        }
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};
