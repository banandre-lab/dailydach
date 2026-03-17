import * as React from "react"
import { cn } from "@/lib/utils"

interface InkBorderProps {
  rx?: number
  className?: string
}

export function InkBorder({ rx = 5.5, className }: InkBorderProps) {
  const reactId = React.useId()
  const signature = React.useMemo(
    () => reactId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0),
    [reactId]
  )
  const filterId = `ink-b-${reactId.replaceAll(":", "")}`
  const noiseSeed = (signature % 97) + 3
  const baseX = (0.010 + (signature % 5) * 0.0015).toFixed(4)
  const baseY = (0.018 + (signature % 7) * 0.0016).toFixed(4)
  const scale = Number((1.6 + (signature % 4) * 0.22).toFixed(2))

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-10 h-full w-full text-foreground", className)}
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
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <rect
        fill="none"
        filter={`url(#${filterId})`}
        height="96.4"
        rx={rx}
        ry={rx}
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
    </svg>
  )
}
