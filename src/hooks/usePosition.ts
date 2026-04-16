import { useWindows } from "@/components/windows/WindowsContext";
import {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
  PointerEvent,
} from "react";

type Position = { x: number; y: number };

const CASCADE_OFFSET = 30;

const isNear = (a: Position, b: Position) => {
  return (
    Math.abs(a.x - b.x) < CASCADE_OFFSET && Math.abs(a.y - b.y) < CASCADE_OFFSET
  );
};

const calculatePosition = (
  positions: Position[],
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
  slug: string;
  windowRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
};

type usePositionReturn = {
  position: Position | null;
  isDragging: boolean;
  handlers: {
    onPointerDown: (e: PointerEvent) => void;
    onPointerMove: (e: PointerEvent) => void;
    onPointerUp: () => void;
  };
};

const usePosition = ({
  slug,
  windowRef,
  isOpen,
}: usePositionParams): usePositionReturn => {
  const { registerPosition, unregisterPosition, getPositions } = useWindows();

  const dragOffset = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isOpen || initialized.current || !windowRef.current) {
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
  }, [isOpen, slug, windowRef, getPositions, registerPosition]);

  useEffect(() => {
    return () => {
      unregisterPosition(slug);
    };
  }, [slug, unregisterPosition]);

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
    position,
    isDragging,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
  };
};

export default usePosition;
