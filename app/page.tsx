import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"
import { getPostsPaginated } from "@/lib/wordpress"
import type { Post } from "@/lib/wordpress.d"
import { FluidBackground } from "@/components/ui/fluid-background"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const response = await getPostsPaginated(1, 9)
  const posts: Post[] = response.data
  const { totalPages } = response.headers

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FluidBackground />
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <div className="p-6 sm:p-8 lg:p-10">
              <h1 className="maxi-hero-title">
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

          <ScrollReveal delay={0.08} className="hidden lg:col-span-5 lg:block">
            <div className="flex h-full items-center justify-center">
              <Image
                src="/dailydach_logo.png"
                alt="DailyDach logo"
                width={1200}
                height={1200}
                priority
                className="h-auto w-full max-w-md object-contain"
              />
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

      <Footer />
    </main>
  )
}
