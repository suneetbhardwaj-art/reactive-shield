import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: "primary" | "secondary" | "destructive" | "none";
  hoverEffect?: boolean;
}

export function GlassCard({ 
  className, 
  children, 
  glowColor = "none",
  hoverEffect = true,
  ...props 
}: GlassCardProps) {
  
  const glowClasses = {
    primary: "hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] hover:border-primary/40",
    secondary: "hover:shadow-[0_0_30px_-5px_hsl(var(--secondary)/0.3)] hover:border-secondary/40",
    destructive: "hover:shadow-[0_0_30px_-5px_hsl(var(--destructive)/0.3)] hover:border-destructive/40",
    none: ""
  };

  return (
    <div 
      className={cn(
        "bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden relative",
        hoverEffect && "transition-all duration-500 hover:-translate-y-1",
        hoverEffect && glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {/* Subtle top reflection */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  )
}
