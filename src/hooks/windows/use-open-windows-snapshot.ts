"use client";

import { useCallback, useSyncExternalStore } from "react";

import useWindowsStore from "@/hooks/windows/use-windows-store";

const useOpenWindowsSnapshot = () => {
  const store = useWindowsStore();

  const subscribe = useCallback(
    (listener: () => void) => store.subscribeOpenWindows(listener),
    [store],
  );

  const getSnapshot = useCallback(
    () => store.getOpenWindowsSnapshot(),
    [store],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

export default useOpenWindowsSnapshot;
