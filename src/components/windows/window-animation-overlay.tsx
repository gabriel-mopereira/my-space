"use client";

import type { TransitionEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import type {
  Rect,
  WindowAnimation,
} from "@/components/windows/context/windows-store";
import { useAllWindowAnimations } from "@/hooks/windows/use-window-animation";
import useWindowsActions from "@/hooks/windows/use-windows-actions";

const TRANSITION_DURATION_MS = 285;
const SAFETY_TIMEOUT_MS = TRANSITION_DURATION_MS + 400;

type AnimationRectProps = {
  animation: WindowAnimation;
  slug: string;
};

const AnimationRect = ({ animation, slug }: AnimationRectProps) => {
  const completedRef = useRef(false);

  const { completeAnimation } = useWindowsActions();
  const [current, setCurrent] = useState<Rect>(animation.fromRect);

  const finish = useCallback(() => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;
    completeAnimation(slug);
  }, [completeAnimation, slug]);

  useEffect(() => {
    if (!animation.targetRect) {
      return;
    }

    const target = animation.targetRect;

    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setCurrent(target));
    });

    return () => {
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(innerRaf);
    };
  }, [animation.targetRect]);

  useEffect(() => {
    const timer = setTimeout(finish, SAFETY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [finish]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "width") {
      return;
    }

    finish();
  };

  return (
    <div
      className="pointer-events-none border border-white border-dashed"
      onTransitionEnd={handleTransitionEnd}
      style={{
        height: current.height,
        left: current.x,
        position: "fixed",
        top: current.y,
        transitionDuration: `${TRANSITION_DURATION_MS}ms`,
        transitionProperty: "left, top, width, height",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        width: current.width,
        zIndex: 9999,
      }}
    />
  );
};

const WindowAnimationOverlay = () => {
  const animations = useAllWindowAnimations();

  const isAnimating = animations.size > 0;
  const isOpening = [...animations.values()].some(
    (animation) => animation.direction === "opening",
  );

  useEffect(() => {
    if (!isOpening) {
      return;
    }

    document.documentElement.classList.add("windows-animating");

    return () => {
      document.documentElement.classList.remove("windows-animating");
    };
  }, [isOpening]);

  if (!isAnimating) {
    return null;
  }

  return (
    <>
      {[...animations.entries()].map(([slug, animation]) => (
        <AnimationRect
          animation={animation}
          key={`${slug}-${animation.direction}`}
          slug={slug}
        />
      ))}
    </>
  );
};

export default WindowAnimationOverlay;
