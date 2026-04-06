import { useCallback, useRef, useState, RefObject, PointerEvent } from "react";

type useDraggableParams = {
  targetRef: RefObject<HTMLDivElement | null>;
  defaultPosition?: { x: number; y: number };
};

const useDraggable = ({ targetRef, defaultPosition }: useDraggableParams) => {
  const dragOffset = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    defaultPosition ?? null,
  );
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      if (!targetRef.current) {
        return;
      }

      const rect = targetRef.current.getBoundingClientRect();

      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      setPosition({ x: rect.left, y: rect.top });
      setIsDragging(true);

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [targetRef],
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
    setIsDragging(false);
  }, []);

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    isDragging,
    position,
  };
};

export default useDraggable;
