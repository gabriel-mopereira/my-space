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

  const maxX = Math.max(0, window.innerWidth - windowRef.current.clientWidth);
  const maxY = Math.max(0, window.innerHeight - windowRef.current.clientHeight);

  let safety = positions.length + 1;
  while (safety-- > 0 && positions.some((pos) => isNear(position, pos))) {
    position.x += CASCADE_OFFSET;
    position.y += CASCADE_OFFSET;

    if (position.x > maxX) {
      position.x = position.x % Math.max(1, maxX) || CASCADE_OFFSET;
    }
    if (position.y > maxY) {
      position.y = position.y % Math.max(1, maxY) || CASCADE_OFFSET;
    }
  }

  return position;
};

export default calculatePosition;
