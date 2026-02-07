import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 border-2 border-foreground/90 bg-background px-3 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[4px_4px_0_0_var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-[4px_4px_0_0_var(--destructive)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
