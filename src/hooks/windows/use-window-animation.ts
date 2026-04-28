"use client";

import { useCallback, useSyncExternalStore } from "react";

import useWindowsStore from "@/hooks/windows/use-windows-store";

const useWindowAnimation = (slug: string) => {
  const store = useWindowsStore();

  const subscribe = useCallback(
    (listener: () => void) => store.subscribeAnimation(slug, listener),
    [store, slug],
  );

  const getSnapshot = useCallback(
    () => store.getAnimation(slug),
    [store, slug],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

const useAllWindowAnimations = () => {
  const store = useWindowsStore();

  const subscribe = useCallback(
    (listener: () => void) => store.subscribeAllAnimations(listener),
    [store],
  );

  const getSnapshot = useCallback(() => store.getAllAnimations(), [store]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

export { useAllWindowAnimations, useWindowAnimation };
