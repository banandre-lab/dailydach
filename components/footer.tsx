import Link from "next/link"
import { FooterNewsletter } from "@/components/footer-newsletter"
import { XLogoIcon } from "@/components/ui/x-logo"
import { Logo } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import { InkBorder } from "@/components/ui/ink-border"
import { cn } from "@/lib/utils"
import { interactiveSurfaceClass } from "@/components/ui/interactive-surface"

export function Footer() {
  return (
    <footer className="noise-layer relative mt-24 border-t-2 border-foreground/70 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="py-2 lg:col-span-5">
            <Logo size="lg" className="mb-4" />
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              DailyDach publishes high-energy cultural stories with a playful daily-duck spirit. Read fast,
              think deeper, and drop your own voice.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://x.com/dailydach_com"
                aria-label="X"
                title="X"
                className="inline-flex size-9 items-center justify-center rounded-[4px] border-2 border-foreground/90 bg-card text-foreground transition-all duration-150 outline-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-secondary/65 focus-visible:ring-[3px] focus-visible:ring-ring/40"
              >
                <XLogoIcon className="h-3.5 w-3.5 shrink-0" />
              </Link>
            </div>
          </section>

          <section className="py-2 lg:col-span-3">
              <Badge className="mb-4">Explore</Badge>
            <nav className="space-y-1">
              <FooterLink href="/stories">Stories</FooterLink>
              <FooterLink href="/impressum">About DailyDach</FooterLink>
              <FooterLink href="/submit-story">Submit Story</FooterLink>
            </nav>
          </section>

          <section className="py-2 lg:col-span-4">
            <Badge className="mb-4">Newsletter</Badge>
            <h3 className="font-display text-3xl leading-[0.9]">Weekly Story Drop</h3>
            <p className="mb-5 mt-2 text-sm text-muted-foreground">Sharp voices. Visual culture. Zero filler.</p>
            <FooterNewsletter />
          </section>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t-2 border-foreground/70 pt-6 text-xs font-black uppercase tracking-[0.11em] text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} DailyDach</p>
          <div className="flex items-center gap-4">
            <FooterMetaLink href="/privacy">Privacy</FooterMetaLink>
            <FooterMetaLink href="/terms">Terms</FooterMetaLink>
            <FooterMetaLink href="/cookies">Cookies</FooterMetaLink>
          </div>
        </div>
      </div>
    </footer>
  )
}


function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        interactiveSurfaceClass,
        "w-full justify-start bg-card px-2 py-1.5 text-sm font-semibold text-foreground hover:bg-secondary/65"
      )}
    >
      <InkBorder rx={8} />
      {children}
    </Link>
  )
}

function FooterMetaLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        interactiveSurfaceClass,
        "bg-transparent px-2 py-1 text-xs font-black uppercase tracking-[0.11em] text-muted-foreground hover:bg-muted/65 hover:text-foreground"
      )}
    >
      <InkBorder rx={8} />
      {children}
    </Link>
  )
}
