import Link from "next/link"
import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { getAllTags } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Discover Tags | Tribitat",
  description:
    "Explore our content through a cloud of topics and ideas. Browse all tags to find stories about culture and perspectives.",
  alternates: {
    canonical: "https://www.tribitat.com/tags",
  },
  openGraph: {
    title: "Discover Tags | Tribitat",
    description:
      "Explore our content through a cloud of topics and ideas. Browse all tags to find stories about culture and perspectives.",
    url: "/tags",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Tags | Tribitat",
    description:
      "Explore our content through a cloud of topics and ideas. Browse all tags to find stories about culture and perspectives.",
  },
}

export default async function TagsPage() {
  const tags = await getAllTags()
  const sortedTags = tags.sort((a, b) => b.count - a.count)

  const getBubbleSize = (count: number) => {
    if (count > 10) return "px-6 py-4 text-xl sm:text-2xl"
    if (count > 5) return "px-5 py-3 text-lg sm:text-xl"
    return "px-4 py-2 text-base"
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <ScrollReveal>
          <div className="bento-card mb-8 p-7 sm:p-9">
            <span className="section-kicker mb-3">Topics</span>
            <h1 className="headline-lg mb-4 text-balance">Discover tags</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Jump straight into the themes you care about.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {sortedTags.map((tag, index) => (
            <ScrollReveal key={tag.id} delay={Math.min(index * 0.03, 0.45)} direction="up">
              <Link
                href={`/tag/${tag.slug}`}
                className={`inline-flex items-center gap-2 border-2 border-foreground/90 bg-card font-display font-bold shadow-[3px_3px_0_0_var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--foreground)] ${getBubbleSize(
                  tag.count
                )}`}
              >
                <span>#{tag.name}</span>
                <span className="border-2 border-foreground/90 bg-secondary/35 px-2 py-0.5 text-xs font-black">{tag.count}</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
