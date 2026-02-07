import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap border-2 border-foreground/90 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] transition-all [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--foreground)]",
        secondary: "bg-secondary text-secondary-foreground shadow-[2px_2px_0_0_var(--foreground)]",
        destructive: "bg-destructive text-primary-foreground shadow-[2px_2px_0_0_var(--foreground)]",
        outline: "bg-card text-foreground shadow-[2px_2px_0_0_var(--foreground)]",
        ghost: "border-transparent bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "h-auto rounded-none border-transparent p-0 text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
