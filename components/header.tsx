"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 md:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-auto">
              {!mounted ? (
                // Render a placeholder during SSR to prevent layout shift
                <div className="h-8 w-[120px]" />
              ) : resolvedTheme === "dark" ? (
                <Image
                  src="/logo-dark.svg"
                  alt="TRIBITAT"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/logo-light.svg"
                  alt="TRIBITAT"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                  priority
                />
              )}
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#featured"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    Featured
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/category"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    Categories
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3 border-t border-border pt-4">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#featured"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Featured
            </Link>
            <Link
              href="/category"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
