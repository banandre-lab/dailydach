import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogGrid } from "@/components/blog-grid"
import { PaginationControls } from "@/components/pagination-controls"
import { getPostsPaginated } from "@/lib/wordpress"
import type { Post } from "@/lib/wordpress.d"
import { FluidBackground } from "@/components/ui/fluid-background"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Stories - DailyDach",
  description: "Browse DailyDach stories, cultural signals, and bold voices in one feed.",
  alternates: {
    canonical: "https://www.dailydach.com/stories",
  },
  openGraph: {
    title: "Stories - DailyDach",
    description: "Browse DailyDach stories, cultural signals, and bold voices in one feed.",
    url: "https://www.dailydach.com/stories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stories - DailyDach",
    description: "Browse DailyDach stories, cultural signals, and bold voices in one feed.",
  },
}

export default async function AllPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = params?.page ? parseInt(params.page, 10) || 1 : 1
  const perPage = 12

  const response = await getPostsPaginated(page, perPage)
  const posts: Post[] = response.data
  const { totalPages } = response.headers

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FluidBackground />
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <ScrollReveal>
          <div className="maxi-panel mb-8 p-7 sm:p-9">
            <span className="section-kicker mb-3">Story Feed</span>
            <h1 className="headline-lg text-balance mb-4">All DailyDach Stories</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Fast-moving culture stories and personal perspectives from across Europe and beyond.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <BlogGrid
        posts={posts}
        totalPages={totalPages}
        enableInfinite={false}
        title={page > 1 ? `Page ${page} Story Drops` : "Latest Story Drops"}
        subtitle="Scroll less. Feel more."
      />

      <ScrollReveal direction="up" delay={0.12}>
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          buildHref={(p) => {
            const sp = new URLSearchParams()
            if (p > 1) sp.set("page", String(p))
            return `/stories${sp.toString() ? `?${sp.toString()}` : ""}`
          }}
        />
      </ScrollReveal>

      <Footer />
    </main>
  )
}
