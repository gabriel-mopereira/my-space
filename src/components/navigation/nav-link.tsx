"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/primitives/button";
import useWindowsActions from "@/hooks/windows/use-windows-actions";

type NavLinkProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  paramKey: string;
};

const NavLink = ({ children, className, disabled, paramKey }: NavLinkProps) => {
  const { toggleWindow } = useWindowsActions();

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
