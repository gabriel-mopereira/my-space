"use client";

import { useCallback, useRef, useState, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./primitives/Button";
import useDraggable from "@/hooks/useDraggable";

const TitleBarLines = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-px flex-1", className)}>
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="h-px bg-white w-full" />
    ))}
  </div>
);

const CloseButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => (
  <Button
    aria-label="Close window"
    onClick={onClick}
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

type WindowHeaderProps = {
  title: string;
  icon: ReactNode;
  handleClose: () => void;
  handlePointerDown: (e: PointerEvent) => void;
  handlePointerMove: (e: PointerEvent) => void;
  handlePointerUp: (e: PointerEvent) => void;
};

const WindowHeader = ({
  title,
  icon,
  handleClose,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
}: WindowHeaderProps) => {
  return (
    <div
      className="flex items-center p-2 border-b border-white select-none inset-shadow-header cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <TitleBarLines className="max-w-7" />

      <TitleBarLines />

      <div className="flex items-center gap-2 px-3">
        <span className="mb-0.5">{icon}</span>
        <p className="text-2xl leading-4.5 font-chicago-kare whitespace-nowrap">
          {title}
        </p>
      </div>

      <TitleBarLines className="pr-3" />

      <CloseButton onClick={handleClose} />
    </div>
  );
};

type WindowProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  className?: string;
  defaultPosition?: { x: number; y: number };
};

const Window = ({
  title,
  children,
  defaultOpen = true,
  icon,
  className,
  defaultPosition,
}: WindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const {
    isDragging,
    position,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useDraggable({
    targetRef: windowRef,
    defaultPosition,
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={cn(
        "backdrop-blur-sm bg-indigo-400/20 border border-white pixel-corners",
        position != null && "z-50",
        isDragging ? "cursor-grabbing" : "cursor-default",
        className,
      )}
      style={
        position != null
          ? { left: position.x, top: position.y, position: "fixed" }
          : undefined
      }
    >
      <WindowHeader
        title={title}
        icon={icon}
        handleClose={handleClose}
        handlePointerDown={handlePointerDown}
        handlePointerMove={handlePointerMove}
        handlePointerUp={handlePointerUp}
      />

      {children}
    </div>
  );
};

export default Window;
