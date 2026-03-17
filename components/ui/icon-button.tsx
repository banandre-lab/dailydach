import * as React from "react"
import { cn } from "@/lib/utils"
import { InkBorder } from "@/components/ui/ink-border"
import { interactiveSurfaceClass } from "@/components/ui/interactive-surface"

interface IconButtonProps {
  label: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "hero"
}

const iconButtonClass = {
  default:
    `${interactiveSurfaceClass} size-9 bg-card text-foreground hover:bg-secondary/65`,
  hero: `${interactiveSurfaceClass} size-9 bg-white/10 text-white hover:bg-white/20`,
}

export function IconButton({
  label,
  children,
  className,
  variant = "default",
  ...props
}: IconButtonProps & React.ComponentProps<"button">) {
  return (
    <button
      className={cn(iconButtonClass[variant], className)}
      aria-label={label}
      title={label}
      {...props}
    >
      <InkBorder rx={12} className={variant === "hero" ? "text-white" : undefined} />
      {children}
    </button>
  )
}

export function IconLink({
  label,
  children,
  className,
  variant = "default",
  ...props
}: IconButtonProps & React.ComponentProps<"a">) {
  return (
    <a
      className={cn(iconButtonClass[variant], className)}
      aria-label={label}
      title={label}
      {...props}
    >
      <InkBorder rx={12} className={variant === "hero" ? "text-white" : undefined} />
      {children}
    </a>
  )
}
