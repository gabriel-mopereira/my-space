import { ButtonWrapper } from "@/components/primitives/Button";
import { NAV_OPTIONS } from "./options";
import NavLink from "./NavLink";
import { cn } from "@/lib/utils";

type FooterProps = {
  searchParams: Record<string, string | undefined>;
};

const Footer = ({ searchParams }: FooterProps) => {
  return (
    <div className="flex backdrop-blur-sm bg-primary/15">
      <ButtonWrapper className="p-1.5">
        <div className="flex border-white border pixel-corners">
          {NAV_OPTIONS.map(({ slug, icon: Icon, disabled }) => (
            <div key={slug} className="not-first:border-l border-white">
              <NavLink
                paramKey={slug}
                searchParams={searchParams}
                className={cn(
                  "select-none shrink-0 items-center justify-center text-primary-foreground bg-transparent flex size-14",
                  disabled
                    ? "*:opacity-50 pointer-events-none"
                    : "inset-shadow-footer active:inset-shadow-footer-active active:text-neutral-700 hover:bg-neutral-900/10",
                )}
                disabled={disabled}
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
