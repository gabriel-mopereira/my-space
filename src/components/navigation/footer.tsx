import type { HTMLAttributes } from "react";

import { ButtonWrapper } from "@/components/primitives/button";
import { NAV_OPTIONS } from "@/components/navigation/options";
import NavLink from "@/components/navigation/nav-link";

import { cn } from "@/lib/utils";

const Footer = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex backdrop-blur-sm bg-primary/15", props.className)}
      {...props}
    >
      <ButtonWrapper className="p-1.5">
        <div className="flex border-white border pixel-corners">
          {NAV_OPTIONS.map(({ disabled, icon: Icon, slug }) => (
            <div className="not-first:border-l border-white" key={slug}>
              <NavLink
                className={cn(
                  "select-none shrink-0 items-center justify-center text-primary-foreground bg-transparent flex size-14",
                  disabled
                    ? "*:opacity-50 pointer-events-none"
                    : "inset-shadow-bevel-thick active:inset-shadow-bevel-thick-pressed active:text-neutral-700 hover:bg-neutral-900/10",
                )}
                disabled={disabled}
                paramKey={slug}
              >
                <Icon className="size-6" strokeWidth={0.1} />
              </NavLink>
            </div>
          ))}
        </div>
      </ButtonWrapper>
    </div>
  );
};

export default Footer;
