import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  paramKey: string;
  searchParams: Record<string, string | undefined>;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

const NavLink = ({
  paramKey,
  searchParams,
  children,
  className,
  disabled,
}: NavLinkProps) => {
  const newParams = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) newParams.set(key, value);
  }

  if (newParams.has(paramKey)) {
    newParams.delete(paramKey);
  } else {
    newParams.set(paramKey, "");
  }

  const href = `?${newParams.toString()}`;

  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        disabled ? "*:opacity-50 pointer-events-none" : undefined,
        className,
      )}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
};

export default NavLink;
