import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-leaf text-primary-foreground shadow-sm hover:bg-leaf-soft",
        forest: "bg-forest text-primary-foreground hover:bg-forest-deep",
        ulos: "bg-ulos text-accent-foreground hover:bg-ulos-soft",
        outline: "bg-bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        ghost: "text-fg hover:bg-bg-sunken",
        muted: "bg-bg-sunken text-fg hover:bg-border",
      },
      size: {
        default: "h-11 rounded-lg px-4 text-sm",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-12 rounded-xl px-5 text-base",
        icon: "size-11 rounded-lg",
        pill: "h-9 rounded-full px-3.5 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
