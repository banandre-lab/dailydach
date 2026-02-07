import Link from "next/link"
import { Header } from "@/components/header"
import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"
import { getPostsPaginated, getAllCategories } from "@/lib/wordpress"
import type { Post, Category } from "@/lib/wordpress.d"
import { FluidBackground } from "@/components/ui/fluid-background"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { CategoriesLiquidBridge } from "@/components/categories-liquid-bridge"
import { EuropeMap } from "@/components/europe-map"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const response = await getPostsPaginated(1, 9)
  const posts: Post[] = response.data
  const { totalPages } = response.headers

  const categories: Category[] = await getAllCategories()

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FluidBackground />
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <ScrollReveal>
          <div className="bento-card noise-layer p-6 sm:p-8">
            <span className="section-kicker mb-3">About Tribitat</span>
            <h1 className="headline-lg text-balance mb-5">Connecting cultures through storytelling.</h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Real stories in plain English, for people who want perspective without barriers. Personal journeys,
              cultural insights, and honest takes on today.
            </p>
            <p className="mt-4 inline-flex border-2 border-foreground/90 bg-background px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-foreground shadow-[2px_2px_0_0_var(--foreground)]">
              &quot;Language is not a barrier&quot;
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="px-6 text-xs uppercase tracking-[0.1em]">
                <Link href="/stories">Read Stories</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 text-xs uppercase tracking-[0.1em]">
                <Link href="/submit-story">Share Your Story</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <ScrollReveal delay={0.2}>
          <EuropeMap />
        </ScrollReveal>
      </section>

      <ScrollReveal delay={0.25}>
        <BlogGrid
          posts={posts}
          totalPages={totalPages}
          enableInfinite={false}
          title="Fresh from Tribitat"
          subtitle="Stories built for curious readers: direct, global, and human."
        />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <CategoriesLiquidBridge categories={categories} />
      </ScrollReveal>

      <Footer />
    </main>
  )
}
