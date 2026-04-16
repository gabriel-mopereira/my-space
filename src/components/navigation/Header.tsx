import { HTMLAttributes } from "react";
import { NAV_OPTIONS } from "./options";
import NavLink from "./NavLink";

import { cn } from "@/lib/utils";

const Header = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      {NAV_OPTIONS.map(({ label, slug, icon: Icon, disabled }) => (
        <NavLink
          key={slug}
          paramKey={slug}
          className={cn(
            "font-chicago-kare flex-1 not-first:border-l border-white flex justify-between items-center px-2 py-0.5 leading-5 text-xl select-none",
            disabled
              ? "*:opacity-50 pointer-events-none"
              : "inset-shadow-header active:inset-shadow-header-active active:text-neutral-700 hover:bg-neutral-900/10",
          )}
          disabled={disabled}
        >
          <span>
            <span className="underline">{label[0]}</span>
            {label.slice(1)}
          </span>

          <Icon size={16} strokeWidth={0.3} />
        </NavLink>
      ))}
    </div>
  );
};

export default Header;
