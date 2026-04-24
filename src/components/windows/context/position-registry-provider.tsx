"use client";

import type { ReactNode } from "react";
import { useCallback, useMemo, useRef } from "react";

import type { Position } from "@/types/windows";

import PositionRegistryContext from "@/components/windows/context/position-registry-context";

type PositionRegistryProviderProps = {
  children: ReactNode;
};

const PositionRegistryProvider = ({
  children,
}: PositionRegistryProviderProps) => {
  const positions = useRef<Record<string, Position>>({});

  const registerPosition = useCallback((slug: string, position: Position) => {
    positions.current[slug] = position;
  }, []);

  const unregisterPosition = useCallback((slug: string) => {
    delete positions.current[slug];
  }, []);

  const getPositions = useCallback(() => positions.current, []);

  const value = useMemo(
    () => ({ getPositions, registerPosition, unregisterPosition }),
    [getPositions, registerPosition, unregisterPosition],
  );

  return (
    <PositionRegistryContext.Provider value={value}>
      {children}
    </PositionRegistryContext.Provider>
  );
};

export default PositionRegistryProvider;
