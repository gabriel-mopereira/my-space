"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

import type { Position } from "@/types/windows";
import calculatePosition from "@/lib/windows/calculate-position";

type PositionRegistry = {
  getPositions: () => Map<string, Position>;
  registerPosition: (slug: string, position: Position) => void;
  unregisterPosition: (slug: string) => void;
};

type CascadePlacementParams = {
  isOpen: boolean;
  registry: PositionRegistry;
  slug: string;
  windowRef: RefObject<HTMLDivElement | null>;
};

const useCascadePlacement = ({
  isOpen,
  registry,
  slug,
  windowRef,
}: CascadePlacementParams) => {
  const { getPositions, registerPosition, unregisterPosition } = registry;

  const initialized = useRef(false);
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (!isOpen || !windowRef.current) {
      return;
    }

    if (initialized.current) {
      return;
    }

    const positions = getPositions();

    const initialPosition = calculatePosition(
      [...positions.values()],
      windowRef as RefObject<HTMLDivElement>,
    );

    registerPosition(slug, initialPosition);
    setPosition(initialPosition);

    initialized.current = true;

    return () => {
      initialized.current = false;
      setPosition(null);
      unregisterPosition(slug);
    };
  }, [
    isOpen,
    slug,
    windowRef,
    getPositions,
    registerPosition,
    unregisterPosition,
  ]);

  return { position, setPosition };
};

export default useCascadePlacement;
