import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  frame = "full",
  children,
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm"; frame?: "full" | "sides-bottom" }) {
  const reactId = React.useId()
  const signature = React.useMemo(
    () =>
      reactId
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0),
    [reactId]
  )
  const filterId = React.useMemo(() => `card-sketch-${reactId.replaceAll(":", "")}`, [reactId])
  const noiseSeed = (signature % 97) + 3
  const baseX = (0.010 + (signature % 5) * 0.0015).toFixed(4)
  const baseY = (0.018 + (signature % 7) * 0.0016).toFixed(4)
  const displacementScale = Number((2.1 + (signature % 5) * 0.25).toFixed(2))

  return (
    <div
      data-slot="card"
      data-size={size}
      data-frame={frame}
      className={cn(
        "group/card relative isolate flex flex-col gap-4 overflow-hidden border border-transparent bg-[linear-gradient(180deg,hsl(var(--card))_0%,hsl(var(--card)/0.94)_100%)] py-4 text-sm text-card-foreground transition-transform duration-300 hover:-translate-y-0.5 has-data-[slot=card-footer]:pb-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_8%,hsl(var(--foreground)/0.05)_0,transparent_56%),radial-gradient(circle_at_84%_88%,hsl(var(--foreground)/0.03)_0,transparent_48%)] before:opacity-70",
        frame === "full" ? "rounded-[18px]" : "rounded-b-[18px] rounded-t-none",
        className
      )}
      {...props}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full text-foreground"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="132"
            width="132"
            x="-16"
            y="-16"
          >
            <feTurbulence
              baseFrequency={`${baseX} ${baseY}`}
              numOctaves="2"
              result="noise"
              seed={noiseSeed}
              type="fractalNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        {frame === "full" ? (
          <>
            <rect
              fill="none"
              filter={`url(#${filterId})`}
              height="96.4"
              rx="7.2"
              ry="7.2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.92"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              width="96.4"
              x="1.8"
              y="1.8"
            />
            <rect
              fill="none"
              filter={`url(#${filterId})`}
              height="93"
              rx="6.5"
              ry="6.5"
              stroke="currentColor"
              strokeDasharray="8 11"
              strokeOpacity="0.35"
              strokeWidth="0.75"
              vectorEffect="non-scaling-stroke"
              width="92.8"
              x="3.8"
              y="4.1"
            />
          </>
        ) : (
          <>
            <path
              d="M 0.8 2.1 L 0.8 98.7 L 99.2 98.7 L 99.2 2.1"
              fill="none"
              filter={`url(#${filterId})`}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.92"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 2.2 4.4 L 2.2 96.6 L 97.8 96.6 L 97.8 4.4"
              fill="none"
              filter={`url(#${filterId})`}
              stroke="currentColor"
              strokeDasharray="8 11"
              strokeOpacity="0.35"
              strokeWidth="0.75"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
      </svg>
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-1 px-4 group-data-[size=sm]/card:px-3 @container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-display text-[1.12rem] leading-snug font-bold tracking-[0.01em] italic group-data-[size=sm]/card:text-base", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[0.92rem] leading-relaxed text-muted-foreground/90", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "relative flex items-center bg-muted/30 p-4 before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-[repeating-linear-gradient(90deg,hsl(var(--foreground)/0.82)_0_12px,transparent_12px_17px)] group-data-[size=sm]/card:p-3 group-data-[size=sm]/card:before:inset-x-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
