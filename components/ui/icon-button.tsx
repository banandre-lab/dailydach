import * as React from "react"
import { cn } from "@/lib/utils"
import { InkBorder } from "@/components/ui/ink-border"

interface IconButtonProps {
  label: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "hero"
}

const iconButtonClass = {
  default:
    "brand-radius relative isolate overflow-hidden inline-flex size-9 cursor-pointer items-center justify-center bg-card text-foreground transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-secondary/65",
  hero: "brand-radius relative isolate overflow-hidden inline-flex size-9 cursor-pointer items-center justify-center bg-white/10 text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white/20",
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
