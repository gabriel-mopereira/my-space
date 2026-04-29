import type { ReactNode } from "react";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button select-none inline-flex shrink-0 items-center justify-center bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-lg": "size-9",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        lg: "h-12 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        none: undefined,
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        windowControl: "size-4",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        default:
          "text-primary-foreground not-disabled:inset-shadow-bevel-key bg-transparent pixel-corners active:inset-shadow-bevel-key-pressed active:text-neutral-700 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-600/10",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        ghost:
          "text-primary-foreground bg-transparent active:text-neutral-700 hover:bg-neutral-600/10",
        link: "text-primary underline-offset-4 hover:underline",

        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "border border-border text-primary-foreground not-disabled:inset-shadow-bevel-key bg-transparent active:inset-shadow-bevel-key-pressed active:text-neutral-700 hover:bg-neutral-600/10",
      },
    },
  },
);

const ButtonWrapper = ({
  children,
  className,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) => (
  <div
    className={cn(
      "p-0.5 h-fit pixel-corners flex items-center justify-center",
      disabled
        ? "opacity-50 cursor-not-allowed"
        : "inset-shadow-bevel-thick",
      className,
    )}
  >
    {children}
  </div>
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

const Button = ({
  className,
  size = "default",
  variant = "default",
  ...props
}: ButtonProps) => (
  <ButtonPrimitive
    className={cn(buttonVariants({ className, size, variant }))}
    data-slot="button"
    {...props}
  />
);

export { Button, ButtonWrapper, buttonVariants };
