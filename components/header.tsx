"use client"

import { useEffect, useState } from "react"
import { Menu, Search, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { SearchToolbar } from "@/components/search-toolbar"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)

    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full border-b-2 transition-all duration-200",
        scrolled
          ? "border-foreground/90 bg-background/95 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Tribitat Home">
            <span className="sr-only">Tribitat</span>
            {mounted && (
              <Image
                src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Tribitat"
                width={128}
                height={42}
                className="h-9 w-auto object-contain"
                priority
              />
            )}
          </Link>

          <nav className="hidden items-center gap-0.5 border-2 border-foreground/90 bg-card p-1 shadow-[3px_3px_0_0_var(--foreground)] md:flex">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/stories">Stories</NavLink>
            <NavLink href="/impressum">About</NavLink>
            <NavLink href="/submit-story">Submit</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search stories"
            >
              <Search className="size-5" />
            </Button>

            <ModeToggle />

            <Link href="/subscribe" className="hidden sm:block">
              <Button className="px-4 text-xs uppercase tracking-[0.1em]">
                Subscribe
              </Button>
            </Link>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden pb-4 md:hidden"
            >
              <div className="border-2 border-foreground/90 bg-card p-3 shadow-[4px_4px_0_0_var(--foreground)]">
                <div className="mb-3 border-b-2 border-foreground/90 pb-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Explore Tribitat
                </div>
                <div className="flex flex-col gap-1">
                  <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </MobileNavLink>
                  <MobileNavLink href="/stories" onClick={() => setIsMenuOpen(false)}>
                    Stories
                  </MobileNavLink>
                  <MobileNavLink href="/impressum" onClick={() => setIsMenuOpen(false)}>
                    About
                  </MobileNavLink>
                  <MobileNavLink href="/submit-story" onClick={() => setIsMenuOpen(false)}>
                    Submit Story
                  </MobileNavLink>
                </div>
                <Link href="/subscribe" onClick={() => setIsMenuOpen(false)} className="mt-3 block">
                  <Button className="w-full">Subscribe</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SearchToolbar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.header>
  )
}

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="border-2 border-transparent px-3 py-2 text-sm font-semibold text-foreground transition-all hover:border-foreground/90 hover:bg-muted"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
