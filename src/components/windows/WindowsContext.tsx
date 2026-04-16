"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
  useEffect,
} from "react";

type Position = {
  x: number;
  y: number;
};

type WindowsContext = {
  registerPosition: (slug: string, position: Position) => void;
  unregisterPosition: (slug: string) => void;
  getPositions: () => Record<string, Position>;
  registerWindow: (slug: string) => void;
  unregisterWindow: (slug: string) => void;
  bringToFront: (slug: string) => void;
  getZIndex: (slug: string) => number;
  isOpen: (slug: string) => boolean;
  toggleWindow: (slug: string) => void;
  closeWindow: (slug: string) => void;
};

export const WindowsContext = createContext<WindowsContext | null>(null);

type WindowsProviderProps = {
  initialOpen?: string[];
  children: ReactNode;
};

const WindowsProvider = ({
  initialOpen = [],
  children,
}: WindowsProviderProps) => {
  const positions = useRef<Record<string, Position>>({});

  const [openWindows, setOpenWindows] = useState<Set<string>>(
    () => new Set(initialOpen),
  );

  const [windowsOrder, setWindowsOrder] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();

    openWindows.forEach((slug) => params.set(slug, ""));

    const search = params.toString();

    window.history.replaceState(null, "", search ? `/?${search}` : "/");
  }, [openWindows]);

  const isOpen = useCallback(
    (slug: string) => openWindows.has(slug),
    [openWindows],
  );

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

  const closeWindow = useCallback((slug: string) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);

      next.delete(slug);

      return next;
    });
  }, []);

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
        isOpen,
        toggleWindow,
        closeWindow,
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
