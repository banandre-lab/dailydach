import Link from "next/link"
import Image from "next/image"
import { FooterNewsletter } from "@/components/footer-newsletter"
import { XLogoIcon } from "@/components/ui/x-logo"

export function Footer() {
  return (
    <footer className="relative mt-24 border-t-2 border-foreground/90 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="bento-card noise-layer lg:col-span-5">
            <Link href="/" className="mb-5 inline-flex items-center" aria-label="Tribitat home">
              <>
                <Image
                  src="/logo-light.svg"
                  alt="Tribitat"
                  width={156}
                  height={52}
                  className="h-12 w-auto dark:hidden"
                />
                <Image
                  src="/logo-dark.svg"
                  alt="Tribitat"
                  width={156}
                  height={52}
                  className="hidden h-12 w-auto dark:block"
                />
              </>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Tribitat is where everyday people share cultural stories in plain English. Read, connect,
              and contribute your voice.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="https://x.com/tribitat_com" label="X" icon={<XLogoIcon className="size-4" />} />
            </div>
          </section>

          <section className="bento-card lg:col-span-3">
            <p className="section-kicker mb-4">Explore</p>
            <nav className="space-y-1">
              <FooterLink href="/stories">Stories</FooterLink>
              <FooterLink href="/impressum">About Tribitat</FooterLink>
              <FooterLink href="/submit-story">Submit Story</FooterLink>
            </nav>
          </section>

          <section className="bento-card lg:col-span-4">
            <p className="section-kicker mb-4">Newsletter</p>
            <h3 className="font-display text-2xl italic">Weekly story drop</h3>
            <p className="mt-2 mb-5 text-sm text-muted-foreground">
              New voices, fresh context, no noise.
            </p>
            <FooterNewsletter />
          </section>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t-2 border-foreground/90 pt-6 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Tribitat</p>
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

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex size-9 items-center justify-center border-2 border-foreground/90 bg-background text-foreground shadow-[2px_2px_0_0_var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--foreground)]"
    >
      {icon}
    </a>
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
      className="block border-2 border-transparent px-2 py-1.5 text-sm font-semibold text-foreground transition-all hover:border-foreground/90 hover:bg-muted"
    >
      {children}
    </Link>
  )
}
