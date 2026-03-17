import Link from "next/link"
import { FooterNewsletter } from "@/components/footer-newsletter"
import { XLogoIcon } from "@/components/ui/x-logo"
import { Logo } from "@/components/logo"
import { IconLink } from "@/components/ui/icon-button"
import { Badge } from "@/components/ui/badge"

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
              <IconLink href="https://x.com/dailydach" label="X">
                <XLogoIcon className="size-4" />
              </IconLink>
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
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-foreground">
              Cookies
            </Link>
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
      className="brand-radius block border-2 border-transparent px-2 py-1.5 text-sm font-semibold text-foreground transition-all hover:border-foreground hover:bg-muted"
    >
      {children}
    </Link>
  )
}
