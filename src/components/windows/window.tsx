"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useRef } from "react";

import type { WindowHandlers } from "@/types/windows";

import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/button";
import { TitleBarLines } from "@/components/windows/chrome";

import useIsOpen from "@/hooks/windows/use-is-open";
import usePosition from "@/hooks/windows/use-position";
import useWindowsActions from "@/hooks/windows/use-windows-actions";
import useZIndex from "@/hooks/windows/use-z-index";

type WindowInstanceContext = {
  handlers: WindowHandlers;
  slug: string;
};

const WindowInstanceContext = createContext<WindowInstanceContext | null>(null);

const useWindowInstance = () => {
  const ctx = useContext(WindowInstanceContext);

  if (!ctx) {
    throw new Error("useWindowInstance must be used within a <Window>");
  }

  return ctx;
};

type WindowProps = {
  children: ReactNode;
  className?: string;
  slug: string;
};

const Window = ({ children, className, slug }: WindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const { bringToFront } = useWindowsActions();

  const open = useIsOpen(slug);
  const zIndex = useZIndex(slug);

  const { handlers, isDragging, position } = usePosition({
    isOpen: open,
    slug,
    windowRef,
  });

  const handleBringToFront = useCallback(() => {
    bringToFront(slug);
  }, [bringToFront, slug]);

  const value = useMemo(() => ({ handlers, slug }), [handlers, slug]);

  return (
    <div
      className={cn(
        "w-max backdrop-blur-sm border border-white pixel-corners",
        isDragging ? "cursor-grabbing" : "cursor-default",
        className,
      )}
      onPointerDown={handleBringToFront}
      ref={windowRef}
      style={{
        display: open ? undefined : "none",
        ...(position !== null
          ? { left: position.x, position: "fixed", top: position.y }
          : { visibility: "hidden" }),
        zIndex,
      }}
    >
      <WindowInstanceContext.Provider value={value}>
        {children}
      </WindowInstanceContext.Provider>
    </div>
  );
};

const CloseButton = () => {
  const { slug } = useWindowInstance();
  const { closeWindow } = useWindowsActions();

  const handleClose = useCallback(() => {
    closeWindow(slug);
  }, [closeWindow, slug]);

  return (
    <Button
      aria-label="Close window"
      className="leading-0 text-[10px] aspect-square font-chicago-kare ml-3"
      onClick={handleClose}
      onPointerDown={(e) => e.stopPropagation()}
      size="windowControl"
      variant="secondary"
    >
      <span className="ml-px">x</span>
    </Button>
  );
};

type WindowHeaderProps = {
  className?: string;
  closeable?: boolean;
  icon?: ReactNode;
  title?: string;
};

const WindowHeader = ({
  className,
  closeable = true,
  icon,
  title,
}: WindowHeaderProps) => {
  const { handlers } = useWindowInstance();

  return (
    <div
      className={cn(
        "flex items-center p-2 border-b border-white select-none inset-shadow-header cursor-grab active:cursor-grabbing bg-primary/15 touch-none font-chicago-kare",
        className,
      )}
      onPointerDown={handlers.handlePointerDown}
      onPointerMove={handlers.handlePointerMove}
      onPointerUp={handlers.handlePointerUp}
    >
      {closeable && <TitleBarLines className="max-w-7" />}

      <TitleBarLines />

      {(title || icon) && (
        <>
          <div className="flex items-center gap-2 px-3">
            {icon && <span className="mb-0.5">{icon}</span>}
            {title && (
              <p className="text-xl md:text-2xl leading-4.5 whitespace-nowrap">
                {title}
              </p>
            )}
          </div>

          <TitleBarLines />
        </>
      )}

      {closeable && <CloseButton />}
    </div>
  );
};

type WindowContentProps = {
  children: ReactNode;
  className?: string;
};

const WindowContent = ({ children, className }: WindowContentProps) => (
  <div className={className}>{children}</div>
);

const WindowFooter = () => (
  <div className="h-5 inset-shadow-header border-t border-border bg-primary/15" />
);

export { TitleBarLines, Window, WindowContent, WindowFooter, WindowHeader };
