"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MoveLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4">
      <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <motion.h1
            className="font-display text-9xl font-bold italic text-primary"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.1,
            }}
          >
            404
          </motion.h1>
          <motion.h2
            className="font-display text-3xl font-bold italic tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Page not found
          </motion.h2>
          <motion.p
            className="mx-auto max-w-md text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button asChild size="lg" className="group">
            <Link href="/">
              <MoveLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
