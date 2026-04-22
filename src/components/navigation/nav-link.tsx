"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/primitives/button";
import useWindows from "@/hooks/use-windows";

type NavLinkProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  paramKey: string;
};

const NavLink = ({ children, className, disabled, paramKey }: NavLinkProps) => {
  const { toggleWindow } = useWindows();

  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={() => toggleWindow(paramKey)}
      size="none"
      variant="ghost"
    >
      {children}
    </Button>
  );
};

export default NavLink;
