"use client"

import { motion } from "framer-motion"

export function FluidBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background/92" />

      <motion.div
        className="absolute -left-28 top-12 h-64 w-64 rounded-[2rem] border-4 border-primary/35 bg-secondary/30"
        animate={{ rotate: [0, 3, -2, 0], y: [0, -8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[8%] top-[18%] h-28 w-[42vw] max-w-xl rounded-full border-2 border-foreground/30 bg-primary/24"
        animate={{ x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-14 bottom-[10%] h-72 w-72 rotate-12 rounded-[2.5rem] border-4 border-secondary/55 bg-primary/24"
        animate={{ rotate: [12, 8, 12], y: [0, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-y-0 left-[8%] w-px bg-foreground/20" />
      <div className="absolute inset-x-0 bottom-[22%] h-px bg-foreground/16" />
      <div className="absolute inset-x-0 top-[16%] h-px bg-primary/20" />
    </div>
  )
}
