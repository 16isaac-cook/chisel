import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer py-1 px-2",
  {
    variants: {
      variant: {
        default:
          "bg-ui text-text-high hover:bg-ui-hover active:bg-ui-active focus:ring-border-ui",
        primary:
          "bg-primary text-primary-text hover:bg-primary-hover active:bg-primary-active focus:ring-primary-focus",
        destructive:
          "bg-destructive text-destructive-text hover:bg-destructive-hover focus:ring-destructive-focus",
        outline: "border border-border hover:bg-ui-hover focus:ring-border-ui",
        subtle: "text-text-low hover:bg-ui-hover focus:ring-border-ui",
        ghost: "hover:bg-ui-hover focus:ring-border-ui",
        link: "underline text-primary hover:text-primary-hover focus:ring-primary-focus",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
