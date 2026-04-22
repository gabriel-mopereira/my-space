"use client";

import type { ReactNode, PointerEvent } from "react";
import { useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/button";
import useWindows from "@/hooks/use-windows";
import usePosition from "@/hooks/use-position";

const TitleBarLines = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-px flex-1", className)}>
    {Array.from({ length: 7 }).map((_, i) => (
      <div className="h-px bg-white w-full" key={i} />
    ))}
  </div>
);

const CloseButton = ({
  className,
  slug,
}: {
  className?: string;
  slug: string;
}) => {
  const { closeWindow } = useWindows();

  const handleClose = useCallback(() => {
    closeWindow(slug);
  }, [closeWindow, slug]);

  return (
    <Button
      aria-label="Close window"
      className={cn(
        "leading-0 text-[10px] aspect-square font-chicago-kare",
        className,
      )}
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
  handlers: {
    handlePointerDown: (e: PointerEvent) => void;
    handlePointerMove: (e: PointerEvent) => void;
    handlePointerUp: () => void;
  };
  icon: ReactNode;
  slug: string;
  title: string;
};

const WindowHeader = ({ handlers, icon, slug, title }: WindowHeaderProps) => {
  return (
    <div
      className="flex items-center p-2 border-b border-white select-none inset-shadow-header cursor-grab active:cursor-grabbing bg-primary/15 touch-none"
      onPointerDown={handlers.handlePointerDown}
      onPointerMove={handlers.handlePointerMove}
      onPointerUp={handlers.handlePointerUp}
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
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  slug: string;
  title: string;
};

const Window = ({ children, className, icon, slug, title }: WindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const { bringToFront, getZIndex, isOpen, registerWindow, unregisterWindow } =
    useWindows();

  const open = isOpen(slug);

  const { handlers, isDragging, position } = usePosition({
    isOpen: open,
    slug,
    windowRef,
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
      className={cn(
        "w-max backdrop-blur-sm border border-white pixel-corners",
        isDragging ? "cursor-grabbing" : "cursor-default",
        className,
      )}
      onPointerDown={() => bringToFront(slug)}
      ref={windowRef}
      style={{
        display: open ? undefined : "none",
        ...(position !== null
          ? { left: position.x, position: "fixed", top: position.y }
          : { visibility: "hidden" }),
        zIndex,
      }}
    >
      <WindowHeader handlers={handlers} icon={icon} slug={slug} title={title} />

      {children}

      <div className="h-5 inset-shadow-header border-t border-border bg-primary/15" />
    </div>
  );
};

export default Window;
