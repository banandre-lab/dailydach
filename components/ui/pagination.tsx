import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1 border-2 border-foreground/90 bg-card p-1.5 shadow-[4px_4px_0_0_var(--foreground)]", className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className={cn("list-none", className)} {...props} />
}

type PaginationLinkProps = React.ComponentProps<typeof Link> & {
  isActive?: boolean
}

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center border-2 border-transparent px-3 text-xs font-bold uppercase tracking-[0.08em] outline-none transition-all hover:-translate-y-0.5 hover:bg-muted/60 focus-visible:ring-[3px] focus-visible:ring-ring/40 data-[active=true]:border-foreground/90 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-[2px_2px_0_0_var(--foreground)]",
        className
      )}
      data-active={isActive ? "true" : "false"}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <PaginationLink aria-label="Go to previous page" className={cn("gap-1.5 pl-2.5", className)} {...props}>
      <span className="text-base leading-none">&lsaquo;</span>
      <span className="sr-only md:not-sr-only md:whitespace-nowrap">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <PaginationLink aria-label="Go to next page" className={cn("gap-1.5 pr-2.5", className)} {...props}>
      <span className="sr-only md:not-sr-only md:whitespace-nowrap">Next</span>
      <span className="text-base leading-none">&rsaquo;</span>
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex h-9 min-w-9 items-center justify-center text-sm text-muted-foreground", className)}
      {...props}
    >
      &hellip;<span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
