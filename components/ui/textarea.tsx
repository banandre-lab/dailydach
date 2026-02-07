import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full field-sizing-content border-2 border-foreground/90 bg-background px-3 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[4px_4px_0_0_var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-[4px_4px_0_0_var(--destructive)]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
