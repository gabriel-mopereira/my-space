"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

type HeaderLinkProps = {
  paramKey: string;
  children: ReactNode;
  className?: string;
};

const HeaderLink = ({ paramKey, children, className }: HeaderLinkProps) => {
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
    <Link href={href} scroll={false} className={className}>
      {children}
    </Link>
  );
};

export default HeaderLink;
