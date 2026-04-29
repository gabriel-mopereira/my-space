import type { HTMLAttributes } from "react";

import { NAV_OPTIONS } from "@/components/navigation/options";
import NavLink from "@/components/navigation/nav-link";

import { cn } from "@/lib/utils";

const Header = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      {NAV_OPTIONS.map(({ disabled, icon: Icon, label, slug }) => (
        <div className="flex-1" key={slug}>
          <NavLink
            className={cn(
              "font-chicago-kare w-full flex justify-between items-center px-2 py-0.5 leading-5 text-xl select-none",
              disabled
                ? "*:opacity-50 pointer-events-none"
                : "inset-shadow-bevel active:inset-shadow-bevel-pressed active:text-neutral-700 hover:bg-neutral-900/10",
            )}
            disabled={disabled}
            paramKey={slug}
          >
            <span>
              <span className="underline">{label[0]}</span>
              {label.slice(1)}
            </span>

            <Icon size={16} strokeWidth={0.3} />
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Header;
