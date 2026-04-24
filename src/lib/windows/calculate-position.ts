import type { RefObject } from "react";

import type { Position } from "@/types/windows";

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

export default calculatePosition;
