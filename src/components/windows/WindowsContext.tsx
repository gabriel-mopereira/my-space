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
  registerWindow: (slug: string) => void;
  unregisterWindow: (slug: string) => void;
  bringToFront: (slug: string) => void;
  getZIndex: (slug: string) => number;
};

export const WindowsContext = createContext<WindowsContext | null>(null);

const WindowsProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const positions = useRef<Record<string, Postion>>({});

  const [windowsOrder, setWindowsOrder] = useState<string[]>(
    searchParams.keys().toArray(),
  );

  console.log(windowsOrder);

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

  const registerWindow = useCallback((slug: string) => {
    setWindowsOrder((prev) => [...prev.filter((s) => s !== slug), slug]);
  }, []);

  const unregisterWindow = useCallback((slug: string) => {
    setWindowsOrder((prev) => prev.filter((s) => s !== slug));
  }, []);

  const bringToFront = useCallback(
    (slug: string) => {
      if (windowsOrder[windowsOrder.length - 1] === slug) {
        return;
      }

      setWindowsOrder((prev) => {
        const updated = prev.filter((s) => s !== slug);
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

  return (
    <WindowsContext.Provider
      value={{
        registerPosition,
        unregisterPosition,
        getPositions,
        registerWindow,
        unregisterWindow,
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
