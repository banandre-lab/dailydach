import Image from "next/image"
import Link from "next/link"
import { InkBorder } from "@/components/ui/ink-border"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "lg"
  className?: string
}

export function Logo({ size = "sm", className }: LogoProps) {
  return (
    <Link href="/" className={cn("relative inline-flex items-center gap-2", className)} aria-label="DailyDach Home">
      <span
        className={cn(
          "brand-radius-lg relative isolate inline-flex -rotate-1 items-center gap-2 overflow-hidden bg-secondary",
          size === "sm" ? "px-3 py-1.5" : "px-4 py-2"
        )}
      >
        <InkBorder rx={10} />
        <Image
          src="/icon.png"
          alt=""
          width={size === "sm" ? 24 : 30}
          height={size === "sm" ? 24 : 30}
          className="shrink-0"
          priority
        />
        <span
          className={cn(
            "font-display leading-none text-secondary-foreground",
            size === "sm" ? "text-2xl sm:text-3xl" : "text-3xl"
          )}
        >
          DailyDach
        </span>
      </span>
    </Link>
  )
}
