"use client";

import { useCallback, useRef, PointerEvent, ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../primitives/Button";
import usePosition from "@/hooks/usePosition";
import { useWindows } from "./WindowsContext";

const TitleBarLines = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-px flex-1", className)}>
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="h-px bg-white w-full" />
    ))}
  </div>
);

const CloseButton = ({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) => {
  const { closeWindow } = useWindows();

  const handleClose = useCallback(() => {
    closeWindow(slug);
  }, [closeWindow, slug]);

  return (
    <Button
      aria-label="Close window"
      onClick={handleClose}
      size="windowControl"
      variant="secondary"
      className={cn(
        "leading-0 text-[10px] aspect-square font-chicago-kare",
        className,
      )}
    >
      <span className="ml-px">x</span>
    </Button>
  );
};

type WindowHeaderProps = {
  title: string;
  icon: ReactNode;
  slug: string;
  handlers: {
    onPointerDown: (e: PointerEvent) => void;
    onPointerMove: (e: PointerEvent) => void;
    onPointerUp: () => void;
  };
};

const WindowHeader = ({ title, icon, slug, handlers }: WindowHeaderProps) => {
  return (
    <div
      className="flex items-center p-2 border-b border-white select-none inset-shadow-header cursor-grab active:cursor-grabbing bg-primary/15"
      onPointerDown={handlers.onPointerDown}
      onPointerMove={handlers.onPointerMove}
      onPointerUp={handlers.onPointerUp}
    >
      <TitleBarLines className="max-w-7" />

      <TitleBarLines />

      <div className="flex items-center gap-2 px-3">
        <span className="mb-0.5">{icon}</span>
        <p className="text-xl md:text-2xl leading-4.5 font-chicago-kare whitespace-nowrap">
          {title}
        </p>
      </div>

      <TitleBarLines className="pr-3" />

      <CloseButton slug={slug} />
    </div>
  );
};

type WindowProps = {
  title: string;
  slug: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

const Window = ({ title, slug, children, icon, className }: WindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const { registerWindow, unregisterWindow, bringToFront, getZIndex, isOpen } =
    useWindows();

  const open = isOpen(slug);

  const { position, isDragging, handlers } = usePosition({
    slug,
    windowRef,
    isOpen: open,
  });

  const zIndex = getZIndex(slug);

  useEffect(() => {
    if (open) {
      registerWindow(slug);
    } else {
      unregisterWindow(slug);
    }
  }, [open, slug, registerWindow, unregisterWindow]);

  return (
    <div
      ref={windowRef}
      className={cn(
        "w-max backdrop-blur-sm border border-white pixel-corners",
        isDragging ? "cursor-grabbing" : "cursor-default",
        className,
      )}
      style={{
        zIndex,
        display: open ? undefined : "none",
        ...(position != null
          ? { left: position.x, top: position.y, position: "fixed" }
          : { visibility: "hidden" }),
      }}
      onPointerDown={() => bringToFront(slug)}
    >
      <WindowHeader title={title} icon={icon} slug={slug} handlers={handlers} />

      {children}

      <div className="h-5 inset-shadow-header border-t border-border bg-primary/15" />
    </div>
  );
};

export default Window;
