"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { useSearchParams } from "next/navigation";

type Postion = {
  x: number;
  y: number;
};

type WindowsContext = {
  registerPosition: (slug: string, position: Postion) => void;
  unregisterPosition: (slug: string) => void;
  getPositions: () => Record<string, Postion>;
  bringToFront: (windowSlug: string) => void;
  getZIndex: (windowSlug: string) => number;
};

export const WindowsContext = createContext<WindowsContext | null>(null);

const WindowsProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const positions = useRef<Record<string, Postion>>({});

  const [windowsOrder, setWindowsOrder] = useState<string[]>(
    searchParams.keys().toArray(),
  );

  const registerPosition = useCallback(
    (slug: string, position: Postion) => {
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

  const getPositions = useCallback(() => {
    return positions.current;
  }, [positions]);

  const getZIndex = useCallback(
    (windowSlug: string) => {
      return windowsOrder.indexOf(windowSlug) + 1;
    },
    [windowsOrder],
  );

  const bringToFront = useCallback(
    (windowSlug: string) => {
      if (windowsOrder[windowsOrder.length - 1] === windowSlug) {
        return;
      }

      setWindowsOrder((prev) => {
        const updated = prev.filter((slug) => slug !== windowSlug);
        return [...updated, windowSlug];
      });
    },
    [windowsOrder],
  );

  return (
    <WindowsContext.Provider
      value={{
        registerPosition,
        unregisterPosition,
        getPositions,
        bringToFront,
        getZIndex,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
};

const useWindows = () => {
  const context = useContext(WindowsContext);

  if (!context) {
    throw new Error("useWindows must be used within a WindowsProvider");
  }

  return context;
};

export { WindowsProvider, useWindows };
