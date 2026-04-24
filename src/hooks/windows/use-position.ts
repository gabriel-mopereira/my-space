import type { PointerEvent, RefObject } from "react";
import { useCallback, useMemo, useRef, useState } from "react";

import type { Position } from "@/types/windows";
import useCascadePlacement from "@/hooks/windows/use-cascade-placement";
import usePositionRegistry from "@/hooks/windows/use-position-registry";

type usePositionParams = {
  isOpen: boolean;
  slug: string;
  windowRef: RefObject<HTMLDivElement | null>;
};

type usePositionReturn = {
  handlers: {
    handlePointerDown: (e: PointerEvent) => void;
    handlePointerMove: (e: PointerEvent) => void;
    handlePointerUp: () => void;
  };
  isDragging: boolean;
  position: Position | null;
};

const usePosition = ({
  isOpen,
  slug,
  windowRef,
}: usePositionParams): usePositionReturn => {
  const registry = usePositionRegistry();

  const { position, setPosition } = useCascadePlacement({
    isOpen,
    registry,
    slug,
    windowRef,
  });

  const dragOffset = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      if (!windowRef.current) {
        return;
      }

      const rect = windowRef.current.getBoundingClientRect();

      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      setPosition({ x: rect.left, y: rect.top });
      setIsDragging(true);

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [setPosition, windowRef],
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging) {
        return;
      }

      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    },
    [isDragging, setPosition],
  );

  const handlePointerUp = useCallback(() => {
    if (position) {
      registry.registerPosition(slug, position);
    }

    setIsDragging(false);
  }, [registry, slug, position]);

  const handlers = useMemo(
    () => ({
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
    }),
    [handlePointerDown, handlePointerMove, handlePointerUp],
  );

  return {
    handlers,
    isDragging,
    position,
  };
};

export default usePosition;
