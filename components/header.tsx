"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "glass border-white/10 py-2" : "bg-transparent py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 overflow-hidden">
               {mounted && (
                  resolvedTheme === "dark" ? (
                    <Image
                      src="/logo-dark.svg"
                      alt="T"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  ) : (
                    <Image
                      src="/logo-light.svg"
                      alt="T"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  )
               )}
               {/* Fallback if no image or while loading */}
               <span className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">TRIBITAT</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/category">Stories</NavLink>
            <NavLink href="/categories">Topics</NavLink>
            <NavLink href="/tags">Tags</NavLink>
            <NavLink href="/map">Map</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </Button>
            
            <ModeToggle />
            
            <Button className="hidden sm:flex rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6">
              Subscribe
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 py-4 px-2 bg-card/50 backdrop-blur-xl rounded-2xl mt-2 border border-white/10">
                <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                <MobileNavLink href="/category" onClick={() => setIsMenuOpen(false)}>Stories</MobileNavLink>
                <MobileNavLink href="/categories" onClick={() => setIsMenuOpen(false)}>Topics</MobileNavLink>
                <MobileNavLink href="/tags" onClick={() => setIsMenuOpen(false)}>Tags</MobileNavLink>
                <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
                <div className="pt-2 mt-2 border-t border-white/10">
                  <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    Subscribe
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-full transition-all duration-200"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}


