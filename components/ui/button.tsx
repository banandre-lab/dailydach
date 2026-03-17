import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { InkBorder } from "@/components/ui/ink-border"

const buttonVariants = cva(
  "brand-radius relative isolate inline-flex items-center justify-center overflow-hidden whitespace-nowrap font-semibold tracking-[0.02em] transition-all duration-150 outline-none select-none group/button cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
        outline:
          "bg-card text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground hover:-translate-x-0.5 hover:-translate-y-0.5",
        ghost:
          "text-foreground hover:bg-muted/60",
        destructive:
          "bg-destructive text-primary-foreground hover:-translate-x-0.5 hover:-translate-y-0.5",
        link: "p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-4 text-sm",
        xs: "h-7 gap-1 px-2 text-xs",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-11 gap-2.5 px-5 text-sm",
        icon: "size-10",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  render,
  children,
  ...props
}: (ButtonPrimitive.Props | React.ComponentProps<"button">) &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    render?: ButtonPrimitive.Props["render"]
  }) {
  const hasInkBorder = variant !== "ghost" && variant !== "link"

  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as React.ComponentProps<typeof Slot>)}
      >
        {children as React.ReactElement}
      </Slot>
    )
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      render={render}
      {...(props as ButtonPrimitive.Props)}
    >
      {hasInkBorder && <InkBorder rx={5} />}
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
