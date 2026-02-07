"use client"

import { motion } from "framer-motion"

export function FluidBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background/85" />

      {/* Large editorial cross in top-left */}
      <motion.div
        className="absolute -left-16 top-8 h-48 w-48 border-2 border-primary/10"
        animate={{ rotate: [0, 3, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Geometric square in bottom-right */}
      <motion.div
        className="absolute -right-10 bottom-12 h-64 w-64 border-2 border-accent/10"
        animate={{ rotate: [0, -2, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle editorial rules */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
    </div>
  )
}
