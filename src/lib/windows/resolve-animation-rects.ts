import type { Rect } from "@/components/windows/context/windows-store";

const toRect = (element: Element): Rect => {
  const bounds = element.getBoundingClientRect();

  return {
    height: bounds.height,
    width: bounds.width,
    x: bounds.left,
    y: bounds.top,
  };
};

const isVisible = (element: Element) => {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  const rect = element.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
};

const buildShortcutRect = (host: Element): Rect => toRect(host);

const findVisibleShortcutRect = (slug: string): Rect | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const matches = document.querySelectorAll(
    `[data-shortcut-slug="${CSS.escape(slug)}"]`,
  );

  for (const element of matches) {
    if (isVisible(element)) {
      return buildShortcutRect(element);
    }
  }

  return null;
};

const findWindowRect = (slug: string): Rect | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const matches = document.querySelectorAll(
    `[data-window-slug="${CSS.escape(slug)}"]`,
  );

  for (const element of matches) {
    if (isVisible(element)) {
      return toRect(element);
    }
  }

  return null;
};

const prefersReducedMotion = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export {
  buildShortcutRect,
  findVisibleShortcutRect,
  findWindowRect,
  prefersReducedMotion,
};
