import type { PointerEvent } from "react";

type Position = {
  x: number;
  y: number;
};

type WindowHandlers = {
  handlePointerDown: (e: PointerEvent) => void;
  handlePointerMove: (e: PointerEvent) => void;
  handlePointerUp: () => void;
};

export type { Position, WindowHandlers };
