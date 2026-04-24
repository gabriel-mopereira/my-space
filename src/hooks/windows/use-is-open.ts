"use client";

import { useCallback, useSyncExternalStore } from "react";

import useWindowsStore from "@/hooks/windows/use-windows-store";

const useIsOpen = (slug: string) => {
  const store = useWindowsStore();

  const subscribe = useCallback(
    (listener: () => void) => store.subscribeIsOpen(slug, listener),
    [store, slug],
  );

  const getSnapshot = useCallback(() => store.getIsOpen(slug), [store, slug]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

export default useIsOpen;
