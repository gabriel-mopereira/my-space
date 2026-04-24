"use client";

import { useCallback, useSyncExternalStore } from "react";

import useWindowsStore from "@/hooks/windows/use-windows-store";

const useZIndex = (slug: string) => {
  const store = useWindowsStore();

  const subscribe = useCallback(
    (listener: () => void) => store.subscribeZIndex(slug, listener),
    [store, slug],
  );

  const getSnapshot = useCallback(() => store.getZIndex(slug), [store, slug]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

export default useZIndex;
