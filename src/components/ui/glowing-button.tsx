import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

export interface GlowingButtonProps extends ButtonProps {
  glowVariant?: "primary" | "secondary" | "destructive";
}

export const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, glowVariant = "primary", variant = "default", ...props }, ref) => {
    
    const glowStyles = {
      primary: "shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_30px_0px_hsl(var(--primary)/0.7)]",
      secondary: "shadow-[0_0_20px_-5px_hsl(var(--secondary)/0.5)] hover:shadow-[0_0_30px_0px_hsl(var(--secondary)/0.7)]",
      destructive: "shadow-[0_0_20px_-5px_hsl(var(--destructive)/0.5)] hover:shadow-[0_0_30px_0px_hsl(var(--destructive)/0.7)]",
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(
          "transition-all duration-300 rounded-xl relative overflow-hidden font-semibold group",
          variant === "default" && glowStyles[glowVariant],
          className
        )}
        {...props}
      >
        {/* Shine effect passing through */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />
        <span className="relative z-10">{props.children}</span>
      </Button>
    )
  }
)
GlowingButton.displayName = "GlowingButton"
