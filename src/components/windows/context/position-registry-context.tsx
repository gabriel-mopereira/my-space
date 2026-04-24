"use client";

import { createContext } from "react";

import type { Position } from "@/types/windows";

type PositionRegistryContext = {
  getPositions: () => Record<string, Position>;
  registerPosition: (slug: string, position: Position) => void;
  unregisterPosition: (slug: string) => void;
};

const PositionRegistryContext = createContext<PositionRegistryContext | null>(
  null,
);

export default PositionRegistryContext;
