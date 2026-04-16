"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  paramKey: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  disabledClassName?: string;
  disabled?: boolean;
};

const NavLink = ({
  paramKey,
  children,
  className,
  activeClassName,
  disabledClassName,
  disabled,
}: NavLinkProps) => {
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
        disabled
          ? (disabledClassName ?? "*:opacity-50 pointer-events-none")
          : activeClassName,
        className,
      )}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
};

export default NavLink;
