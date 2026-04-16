"use client";

import { ReactNode } from "react";
import { Button } from "@/components/primitives/Button";
import { useWindows } from "@/components/windows/WindowsContext";

type NavLinkProps = {
  paramKey: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

const NavLink = ({ paramKey, children, className, disabled }: NavLinkProps) => {
  const { toggleWindow } = useWindows();

  return (
    <Button
      variant="ghost"
      size="none"
      onClick={() => toggleWindow(paramKey)}
      className={className}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default NavLink;
