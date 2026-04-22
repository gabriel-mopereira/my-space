import useWindows from "@/hooks/use-windows";
import type { RefObject, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Position = { x: number; y: number };

const CASCADE_OFFSET = 30;

const isNear = (a: Position, b: Position) =>
  Math.abs(a.x - b.x) < CASCADE_OFFSET && Math.abs(a.y - b.y) < CASCADE_OFFSET;

const calculatePosition = (
  positions: Array<Position>,
  windowRef: RefObject<HTMLDivElement>,
) => {
  const position = {
    x: (window.innerWidth - windowRef.current.offsetWidth) / 2,
    y: (window.innerHeight - windowRef.current.offsetHeight) / 2,
  };

  const isEmpty = positions.length === 0;

  if (isEmpty) {
    return position;
  }

  while (positions.some((pos) => isNear(position, pos))) {
    position.x += CASCADE_OFFSET;
    position.y += CASCADE_OFFSET;
  }

  position.x = Math.max(
    0,
    Math.min(position.x, window.innerWidth - windowRef.current.clientWidth),
  );
  position.y = Math.max(
    0,
    Math.min(position.y, window.innerHeight - windowRef.current.clientHeight),
  );

  return position;
};

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
  const { getPositions, registerPosition, unregisterPosition } = useWindows();

  const dragOffset = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isOpen || !windowRef.current) {
      return;
    }

    if (initialized.current) {
      return;
    }

    const positions = getPositions();

    const initialPosition = calculatePosition(
      Object.values(positions),
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
    [windowRef],
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
    [isDragging],
  );

  const handlePointerUp = useCallback(() => {
    if (position) {
      registerPosition(slug, position);
    }

    setIsDragging(false);
  }, [registerPosition, slug, position]);

  return {
    handlers: {
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
    },
    isDragging,
    position,
  };
};

export default usePosition;
