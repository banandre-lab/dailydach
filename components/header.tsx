"use client"

import { useEffect, useState } from "react"
import { Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { SearchToolbar } from "@/components/search-toolbar"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "noise-layer sticky top-0 z-50 w-full border-b-2 border-foreground/30 bg-card transition-all duration-200",
        scrolled ? "backdrop-blur-md" : ""
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="relative inline-flex items-center gap-2" aria-label="DailyDach Home">
            <span className="brand-radius-lg relative inline-flex -rotate-1 border-2 border-foreground bg-secondary px-3.5 py-2 shadow-[4px_4px_0_0_var(--foreground)]">
              <span className="font-display text-2xl leading-none text-secondary-foreground sm:text-3xl">DailyDach</span>
            </span>
          </Link>

          <nav className="relative hidden items-center gap-1 md:flex">
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
              className="bg-card"
            >
              <Search className="size-5" />
            </Button>

            <ModeToggle />

            <Link href="/subscribe" className="hidden sm:block">
              <Button className="px-4 text-[0.67rem] uppercase tracking-[0.12em]">Join Drop</Button>
            </Link>

            <Button
              variant="outline"
              size="icon"
              className="bg-card md:hidden"
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
              className="overflow-hidden md:hidden"
            >
              <div className="brand-radius-lg mt-3 border-2 border-foreground bg-card p-3 shadow-[4px_4px_0_0_var(--foreground)]">
                <div className="mb-3 border-b-2 border-foreground/70 pb-2 text-[0.66rem] font-black uppercase tracking-[0.13em] text-muted-foreground">
                  Navigate DailyDach
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
                  <Button className="w-full">Join Newsletter</Button>
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
      className="brand-radius border-2 border-transparent px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.12em] text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground hover:bg-primary"
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
      className="brand-radius border-2 border-transparent px-3 py-2 text-sm font-semibold text-foreground transition-all hover:border-foreground hover:bg-muted"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
