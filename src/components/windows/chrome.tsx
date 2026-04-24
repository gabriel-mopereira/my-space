"use client";

import { cn } from "@/lib/utils";

const TitleBarLines = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-px flex-1", className)}>
    {Array.from({ length: 7 }).map((_, i) => (
      <div className="h-px bg-white w-full" key={i} />
    ))}
  </div>
);

export { TitleBarLines };
