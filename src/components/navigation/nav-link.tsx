"use client";

import type { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/primitives/button";
import useIsOpen from "@/hooks/windows/use-is-open";
import useWindowsActions from "@/hooks/windows/use-windows-actions";
import {
  buildShortcutRect,
  findWindowRect,
  prefersReducedMotion,
} from "@/lib/windows/resolve-animation-rects";

type NavLinkProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  paramKey: string;
};

const NavLink = ({ children, className, disabled, paramKey }: NavLinkProps) => {
  const { closeWindow, openWindow } = useWindowsActions();
  const isOpen = useIsOpen(paramKey);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) {
      if (isOpen) {
        closeWindow(paramKey);
      } else {
        openWindow(paramKey);
      }

      return;
    }

    const shortcutRect = buildShortcutRect(event.currentTarget);

    if (isOpen) {
      const windowRect = findWindowRect(paramKey);

      if (windowRect) {
        closeWindow(paramKey, shortcutRect, windowRect);
      } else {
        closeWindow(paramKey);
      }

      return;
    }

    openWindow(paramKey, shortcutRect);
  };

  return (
    <Button
      className={className}
      data-shortcut-slug={paramKey}
      disabled={disabled}
      onClick={handleClick}
      size="none"
      variant="ghost"
    >
      {children}
    </Button>
  );
};

export default NavLink;
