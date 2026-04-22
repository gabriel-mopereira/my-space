"use client";

import { createContext } from "react";

import type { Position } from "@/types/position";

type WindowsContext = {
  bringToFront: (slug: string) => void;
  closeWindow: (slug: string) => void;
  getPositions: () => Record<string, Position>;
  getZIndex: (slug: string) => number;
  isOpen: (slug: string) => boolean;
  registerPosition: (slug: string, position: Position) => void;
  registerWindow: (slug: string) => void;
  toggleWindow: (slug: string) => void;
  unregisterPosition: (slug: string) => void;
  unregisterWindow: (slug: string) => void;
};

const WindowsContext = createContext<WindowsContext | null>(null);

export default WindowsContext;
