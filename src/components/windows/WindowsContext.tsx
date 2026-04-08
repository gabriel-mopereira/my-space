"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { useSearchParams } from "next/navigation";

type WindowsContext = {
  windowsOrder: string[];
  bringToFront: (windowSlug: string) => void;
  getZIndex: (windowSlug: string) => number;
};

export const WindowsContext = createContext<WindowsContext | null>(null);

const WindowsProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const [windowsOrder, setWindowsOrder] = useState<string[]>(() =>
    Array.from(searchParams.keys()),
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

  const getZIndex = useCallback(
    (windowSlug: string) => {
      return windowsOrder.indexOf(windowSlug) + 1;
    },
    [windowsOrder],
  );

  return (
    <WindowsContext.Provider value={{ windowsOrder, bringToFront, getZIndex }}>
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
