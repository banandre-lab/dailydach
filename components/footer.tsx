import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XLogoIcon } from "@/components/ui/x-logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-zinc-900 text-zinc-200 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-8 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo-dark.svg"
                alt="Tribitat"
                width={160}
                height={53}
                className="object-contain h-14 w-auto"
              />
            </Link>
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              Discover curated stories, insightful articles, and fresh
              perspectives on technology, design, and culture.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <SocialLink
                href="https://x.com/tribitat_com"
                icon={<XLogoIcon className="w-5 h-5" />}
                label="X"
              />
              {/* <SocialLink
                href="#"
                icon={<Instagram className="w-5 h-5" />}
                label="Instagram"
              />
              <SocialLink
                href="#"
                icon={<Linkedin className="w-5 h-5" />}
                label="LinkedIn"
              />
              <SocialLink
                href="#"
                icon={<Github className="w-5 h-5" />}
                label="GitHub"
              /> */}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <h4 className="font-bold text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              <FooterLink href="/stories">All Stories</FooterLink>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/submit-story">Submit Story</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-12 md:col-span-8 lg:col-span-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="font-bold text-white mb-2">
                Subscribe to our newsletter
              </h4>
              <p className="text-sm text-zinc-400 mb-4">
                Get the latest posts delivered right to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-primary focus-visible:border-primary"
                />
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} TRIBITAT. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-zinc-400 hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
      >
        {children}
      </Link>
    </li>
  );
}
