"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Position } from "@/types/position";

import WindowsContext from "@/components/windows/context/windows-context";

const useOpenWindows = (initialOpen: Array<string> = []) => {
  const [openWindows, setOpenWindows] = useState<Set<string>>(
    () => new Set(initialOpen),
  );

  useEffect(() => {
    const params = new URLSearchParams();

    openWindows.forEach((slug) => params.set(slug, ""));

    const search = params.toString();

    if (!search) {
      return globalThis.history.replaceState(null, "", "/");
    }

    globalThis.history.replaceState(null, "", `/?${search}`);
  }, [openWindows]);

  const isOpen = useCallback(
    (slug: string) => openWindows.has(slug),
    [openWindows],
  );

  const closeWindow = useCallback((slug: string) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);

      next.delete(slug);

      return next;
    });
  }, []);

  const toggleWindow = useCallback((slug: string) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);

      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }

      return next;
    });
  }, []);

  return { closeWindow, isOpen, openWindows, toggleWindow };
};

const usePositions = () => {
  const positions = useRef<Record<string, Position>>({});

  const registerPosition = useCallback(
    (slug: string, position: Position) => {
      positions.current[slug] = position;
    },
    [positions],
  );

  const unregisterPosition = useCallback(
    (slug: string) => {
      delete positions.current[slug];
    },
    [positions],
  );

  const getPositions = useCallback(() => positions.current, [positions]);

  return { getPositions, registerPosition, unregisterPosition };
};

const useWindowsOrder = () => {
  const [windowsOrder, setWindowsOrder] = useState<Array<string>>([]);

  const registerWindow = useCallback((slug: string) => {
    setWindowsOrder((prev) => [
      ...prev.filter((value) => value !== slug),
      slug,
    ]);
  }, []);

  const unregisterWindow = useCallback((slug: string) => {
    setWindowsOrder((prev) => prev.filter((value) => value !== slug));
  }, []);

  const bringToFront = useCallback(
    (slug: string) => {
      if (windowsOrder.at(-1) === slug) {
        return;
      }

      setWindowsOrder((prev) => {
        const updated = prev.filter((value) => value !== slug);

        return [...updated, slug];
      });
    },
    [windowsOrder],
  );

  const getZIndex = useCallback(
    (slug: string) => {
      const index = windowsOrder.indexOf(slug);

      if (index === -1) {
        return windowsOrder.length + 1;
      }

      return index + 1;
    },
    [windowsOrder],
  );

  return { bringToFront, getZIndex, registerWindow, unregisterWindow };
};

type WindowsProviderProps = {
  children: ReactNode;
  initialOpen?: Array<string>;
};

const WindowsProvider = ({
  children,
  initialOpen = [],
}: WindowsProviderProps) => {
  const openState = useOpenWindows(initialOpen);
  const positions = usePositions();
  const order = useWindowsOrder();

  const value = useMemo(
    () => ({
      ...openState,
      ...positions,
      ...order,
    }),
    [openState, positions, order],
  );

  return (
    <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>
  );
};

export default WindowsProvider;
