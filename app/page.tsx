import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"
import { getPostsPaginated, getAllCategories } from "@/lib/wordpress"
import type { Post, Category } from "@/lib/wordpress.d"
import { FluidBackground } from "@/components/ui/fluid-background"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { CategoriesLiquidBridge } from "@/components/categories-liquid-bridge"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const response = await getPostsPaginated(1, 9)
  const posts: Post[] = response.data
  const { totalPages } = response.headers

  const categories: Category[] = await getAllCategories()
  const firstPost = posts[0]
  const firstImage = firstPost?._embedded?.["wp:featuredmedia"]?.[0]?.source_url

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FluidBackground />
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <div className="maxi-panel noise-layer p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="section-kicker">Rebrand Live</span>
                <span className="maxi-chip -rotate-2">Dach + Duck Energy</span>
              </div>

              <h1 className="maxi-hero-title">
                DailyDach
                <br />
                Stories That Hit
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Dach as in the German region. Daily duck as in playful chaos. We remix cultural storytelling
                into a vivid, high-energy reading experience for curious Gen Z minds.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="px-6 text-[0.67rem] uppercase tracking-[0.12em]">
                  <Link href="/stories">Read New Stories</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6 text-[0.67rem] uppercase tracking-[0.12em]">
                  <Link href="/submit-story">Submit Your Voice</Link>
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="border-2 border-foreground bg-secondary px-3 py-3 shadow-[3px_3px_0_0_var(--foreground)]">
                  <p className="font-display text-3xl leading-none">24/7</p>
                  <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-muted-foreground">Story Radar</p>
                </div>
                <div className="border-2 border-foreground bg-accent/75 px-3 py-3 shadow-[3px_3px_0_0_var(--foreground)]">
                  <p className="font-display text-3xl leading-none">DUCK</p>
                  <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-muted-foreground">Mascot Mode</p>
                </div>
                <div className="border-2 border-foreground bg-primary px-3 py-3 text-primary-foreground shadow-[3px_3px_0_0_var(--foreground)]">
                  <p className="font-display text-3xl leading-none">YEL</p>
                  <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-primary-foreground/90">Yellow Core</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="lg:col-span-5">
            <div className="space-y-4">
              <div className="maxi-panel relative overflow-hidden p-3">
                <div className="absolute right-2 top-2 -rotate-3 border-2 border-foreground bg-secondary px-2 py-1 text-[0.56rem] font-black uppercase tracking-[0.1em] shadow-[2px_2px_0_0_var(--foreground)]">
                  New Duck Drop
                </div>
                <div className="relative h-[340px] w-full overflow-hidden border-2 border-foreground">
                  <Image
                    src={firstImage || "/placeholder.svg"}
                    alt={firstPost?.title.rendered || "DailyDach story"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <p className="mt-3 text-[0.7rem] font-black uppercase tracking-[0.12em] text-muted-foreground">
                  {firstPost ? firstPost.title.rendered.replace(/<[^>]*>/g, "") : "Latest story loading"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="maxi-panel maxi-burst bg-secondary p-4">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.13em] text-muted-foreground">Mood</p>
                  <p className="mt-1 font-display text-2xl leading-[0.9]">LOUD</p>
                </div>
                <div className="maxi-panel bg-accent/60 p-4">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.13em] text-muted-foreground">Daily Mascot</p>
                  <p className="mt-1 font-display text-2xl leading-[0.9]">Duck Mode</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal delay={0.1}>
        <BlogGrid
          posts={posts}
          totalPages={totalPages}
          enableInfinite={false}
          title="Latest from DailyDach"
          subtitle="Bold stories, cultural fragments, and human perspectives in one maximalist feed."
        />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.16}>
        <CategoriesLiquidBridge categories={categories} />
      </ScrollReveal>

      <Footer />
    </main>
  )
}
