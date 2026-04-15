"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeaderLinkProps = {
  paramKey: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

const HeaderLink = ({
  paramKey,
  children,
  className,
  disabled,
}: HeaderLinkProps) => {
  const searchParams = useSearchParams();

  const href = (() => {
    const newParams = new URLSearchParams(searchParams);

    if (searchParams.has(paramKey)) {
      newParams.delete(paramKey);
    } else {
      newParams.set(paramKey, "");
    }

    return `?${newParams.toString()}`;
  })();

  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "font-chicago-kare flex-1 not-first:border-l border-white flex justify-between items-center px-2 py-0.5 leading-5 text-xl select-none",
        disabled ? "*:opacity-50 pointer-events-none" : "inset-shadow-header",
        className,
      )}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
