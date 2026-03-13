import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Globe, Languages, PenSquare } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About - DailyDach",
  description: "Learn more about DailyDach and our mission to share real stories in plain English.",
  openGraph: {
    title: "About - DailyDach",
    description: "Learn more about DailyDach and our mission to share real stories in plain English.",
    url: "https://www.dailydach.com/impressum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - DailyDach",
    description: "Learn more about DailyDach and our mission to share real stories in plain English.",
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <ScrollReveal>
          <div className="bento-card p-7 sm:p-10">
            <span className="section-kicker mb-4">About DailyDach</span>
            <h1 className="headline-xl mb-6 text-balance">Connecting cultures through the power of storytelling.</h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              At DailyDach, we believe that everyone has a story worth telling. Our platform is designed to break
              down language barriers and bring authentic voices to the forefront.
            </p>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Whether you are sharing a personal journey, a cultural insight, or a unique perspective on current
              events, DailyDach gives your voice a clear and beautiful place to be heard.
            </p>
            <p className="mt-5 inline-flex border-2 border-foreground/90 bg-background px-4 py-2 text-xs font-black uppercase tracking-[0.1em] shadow-[2px_2px_0_0_var(--foreground)]">
              &quot;Language is not a barrier&quot;
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ValueCard icon={<Languages className="size-6" />} title="Plain English" description="Stories that stay authentic and easy to follow." delay={0.05} />
          <ValueCard icon={<Globe className="size-6" />} title="Cultural Range" description="Multiple countries, lived experiences, one readable format." delay={0.12} />
          <ValueCard icon={<PenSquare className="size-6" />} title="Open Voices" description="Writers and readers who care about context and honesty." delay={0.2} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <ScrollReveal delay={0.25}>
          <div className="bento-card p-8 text-center sm:p-10">
            <h2 className="font-display text-3xl font-bold italic sm:text-4xl">Ready to share your story?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Join the DailyDach community and publish your perspective for a global audience.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="px-6 text-xs uppercase tracking-[0.1em]">
                <Link href="/submit-story">
                  Submit Story <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 text-xs uppercase tracking-[0.1em]">
                <Link href="/stories">Explore Stories</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}

function ValueCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <ScrollReveal delay={delay}>
      <div className="bento-card h-full">
        <div className="mb-4 inline-flex border-2 border-foreground/90 bg-secondary/25 p-2.5">{icon}</div>
        <h3 className="font-display text-2xl font-bold italic">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </ScrollReveal>
  )
}
