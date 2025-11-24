"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { europeMapData } from "./europe-map-data";

export function EuropeMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Configuration for enabled countries
  const enabledCountries = ["DE", "AT"];

  const handleMouseMove = (e: React.MouseEvent) => {
    // Get relative coordinates for the tooltip
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCountryClick = (countryName: string) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${slug}`);
  };

  return (
    <div 
      className="w-full h-full relative flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full aspect-[1000/684] relative"
      >
        <svg
          viewBox="450 250 350 250" // Zoomed in on Central Europe (Germany/Austria)
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 0 30px rgba(114, 228, 173, 0.15))" }}
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--map-gradient-start)" />
              <stop offset="100%" stopColor="var(--map-gradient-end)" />
            </linearGradient>
          </defs>

          {europeMapData.map((country) => {
            const isEnabled = enabledCountries.includes(country.id);
            const isHovered = hoveredCountry === country.name;

            return (
              <motion.g
                key={country.id}
                onHoverStart={() => isEnabled && setHoveredCountry(country.name)}
                onHoverEnd={() => isEnabled && setHoveredCountry(null)}
                onTap={() => isEnabled && handleCountryClick(country.name)}
                onClick={() => isEnabled && handleCountryClick(country.name)}
                whileHover={isEnabled ? {
                  scale: 1.02,
                  zIndex: 50,
                } : {}}
                whileTap={isEnabled ? { scale: 0.98 } : {}}
                style={{ 
                  originX: "50%", 
                  originY: "50%",
                  transformBox: "fill-box",
                  opacity: isEnabled ? 1 : 0.3, // Fade out inactive countries
                  cursor: isEnabled ? "pointer" : "default",
                  pointerEvents: isEnabled ? "auto" : "none",
                }}
              >
                <motion.path
                  d={country.path}
                  fill="url(#mapGradient)"
                  stroke="currentColor"
                  strokeWidth={isEnabled ? "1" : "0.5"}
                  initial={false}
                  animate={{
                    fill: isHovered ? "var(--primary)" : "var(--map-fill)",
                    stroke: isHovered ? "var(--foreground)" : (isEnabled ? "var(--primary)" : "var(--map-stroke-inactive)"),
                    strokeWidth: isHovered ? 1.5 : (isEnabled ? 1 : 0.5),
                    filter: isHovered ? "url(#glow)" : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`transition-colors duration-300 text-foreground/20`}
                />
              </motion.g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredCountry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              left: mousePosition.x,
              top: mousePosition.y - 40,
              pointerEvents: "none",
              zIndex: 100,
            }}
            className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground font-bold shadow-xl whitespace-nowrap -translate-x-1/2"
          >
            {hoveredCountry}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
