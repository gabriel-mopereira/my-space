"use client";

import { useEffect } from "react";

import useWindowsActions from "@/hooks/windows/use-windows-actions";

type StaggeredOpenerProps = {
  slugs: Array<string>;
  stepMs?: number;
  topSlug: string;
};

const StaggeredOpener = ({
  slugs,
  stepMs = 200,
  topSlug,
}: StaggeredOpenerProps) => {
  const { bringToFront, openWindow } = useWindowsActions();

  useEffect(() => {
    const timers = slugs.map((slug, i) =>
      setTimeout(() => {
        openWindow(slug);
        bringToFront(topSlug);
      }, i * stepMs),
    );

    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, [bringToFront, openWindow, slugs, stepMs, topSlug]);

  return null;
};

export default StaggeredOpener;
