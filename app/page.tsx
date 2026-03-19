import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"
import { getPostsPaginated } from "@/lib/wordpress"
import { getCategoryPath } from "@/lib/urls"
import type { Post } from "@/lib/wordpress.d"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { InkBorder } from "@/components/ui/ink-border"

const HOMEPAGE_CATEGORY_CARDS = [
  {
    slug: "germany",
    name: "Germany",
    imageSrc: "/dailydach-germany.webp",
    description: "Raw stories and skeptical takes from Germany.",
  },
  {
    slug: "austria",
    name: "Austria",
    imageSrc: "/dailydach-austria.webp",
    description: "Kuschelig, sharp, and very Austrian.",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    imageSrc: "/dailydach-switzerland.webp",
    description: "Quiet surfaces, hard edges, real stories.",
  },
] as const

export default async function Home() {
  const response = await getPostsPaginated(1, 8)
  const posts: Post[] = response.data
  const { totalPages } = response.headers

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <div className="p-6 sm:p-8 lg:p-10">
              <h1 className="maxi-hero-title">
                Raw Stories from the DACH Region
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                DailyDach covers Austria, Germany, and Switzerland with a raw, skeptical, kuschelig
                editorial voice.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="border-2 border-foreground bg-secondary px-3 py-3 shadow-[3px_3px_0_0_var(--foreground)]">
                  <p className="font-display text-3xl leading-none">24/7</p>
                  <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-muted-foreground">Story Radar</p>
                </div>
                <div className="border-2 border-foreground bg-accent/75 px-3 py-3 shadow-[3px_3px_0_0_var(--foreground)]">
                  <p className="font-display text-3xl leading-none">AT/DE/CH</p>
                  <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-muted-foreground">Austria Germany Switzerland</p>
                </div>
                <div className="border-2 border-foreground bg-primary px-3 py-3 text-primary-foreground shadow-[3px_3px_0_0_var(--foreground)]">
                  <p className="font-display text-3xl leading-none">RAW</p>
                  <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-primary-foreground/90">Skeptical Kuschelig</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="hidden lg:col-span-5 lg:block">
            <div className="flex h-full items-center justify-center">
              <Image
                src="/dailydach.webp"
                alt="DailyDach logo"
                width={750}
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
        />
      </ScrollReveal>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-8">
            <h2 className="headline-lg text-balance">Choose your drink. Prost!</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {HOMEPAGE_CATEGORY_CARDS.map((category, index) => (
            <ScrollReveal key={category.slug} delay={0.06 * (index + 1)}>
              <Link
                href={getCategoryPath(category.slug)}
                className="relative isolate block p-4 text-center outline-none transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 focus-visible:ring-[3px] focus-visible:ring-ring/40 sm:p-5"
              >
                <InkBorder rx={8} />
                <div className="flex flex-col items-center gap-4 p-2 sm:p-4">
                  <Image
                    src={category.imageSrc}
                    alt={`${category.name} illustration`}
                    width={750}
                    height={1000}
                    className="h-auto w-full max-w-xs object-contain sm:max-w-sm"
                  />
                  <h3 className="font-display text-4xl leading-[0.9] text-balance sm:text-5xl">
                    {category.name}
                  </h3>
                  <p className="max-w-xs text-sm text-muted-foreground sm:text-base">
                    {category.description}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
