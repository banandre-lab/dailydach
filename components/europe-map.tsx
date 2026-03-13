"use client"

import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { europeMapData } from "./europe-map-data"
import { getCategoryPath } from "@/lib/urls"

const ENABLED_COUNTRIES = ["DE", "AT", "CH", "NL", "FR"]

export function EuropeMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const router = useRouter()

  const enabledCountryNames = useMemo(
    () =>
      europeMapData
        .filter((country) => ENABLED_COUNTRIES.includes(country.id))
        .map((country) => country.name),
    []
  )

  const handleCountryClick = (countryName: string) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-")
    router.push(getCategoryPath(slug))
  }

  return (
    <div className="bento-card relative overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-kicker mb-2">Interactive Map</p>
          <h3 className="font-display text-2xl font-bold italic sm:text-3xl">Pick a country. Start reading.</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {enabledCountryNames.map((name) => (
            <button
              key={name}
              onMouseEnter={() => setHoveredCountry(name)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick(name)}
              className="border-2 border-foreground/90 bg-background px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--foreground)]"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative"
      >
        <svg
          viewBox="0 250 1250 250"
          className="h-full w-full border-2 border-foreground/90 bg-muted/20 p-2"
        >
          <defs>
            <filter id="mapGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--map-gradient-start)" />
              <stop offset="100%" stopColor="var(--map-gradient-end)" />
            </linearGradient>
          </defs>

          {europeMapData.map((country, index) => {
            const isEnabled = ENABLED_COUNTRIES.includes(country.id)
            const isHovered = hoveredCountry === country.name

            return (
              <motion.g
                key={`${country.id}-${index}`}
                onHoverStart={() => isEnabled && setHoveredCountry(country.name)}
                onHoverEnd={() => isEnabled && setHoveredCountry(null)}
                onTap={() => isEnabled && handleCountryClick(country.name)}
                onClick={() => isEnabled && handleCountryClick(country.name)}
                whileHover={
                  isEnabled
                    ? {
                        scale: 1.02,
                      }
                    : {}
                }
                whileTap={isEnabled ? { scale: 0.98 } : {}}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                  cursor: isEnabled ? "pointer" : "default",
                  pointerEvents: isEnabled ? "auto" : "none",
                  opacity: isEnabled ? 1 : 0.28,
                }}
              >
                <motion.path
                  d={country.path}
                  fill="url(#mapGradient)"
                  strokeWidth={isHovered ? 1.8 : 1}
                  initial={false}
                  animate={{
                    fill: isHovered ? "var(--map-fill-hover)" : "var(--map-fill)",
                    stroke: isHovered ? "var(--foreground)" : "var(--map-stroke)",
                    filter: isHovered ? "url(#mapGlow)" : "none",
                  }}
                  transition={{ duration: 0.22 }}
                />
              </motion.g>
            )
          })}
        </svg>

        {hoveredCountry && (
          <div className="pointer-events-none absolute left-3 top-3 border-2 border-foreground/90 bg-background px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] shadow-[2px_2px_0_0_var(--foreground)]">
            {hoveredCountry}
          </div>
        )}
      </motion.div>
    </div>
  )
}
