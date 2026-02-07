import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogGrid } from "@/components/blog-grid"
import { PaginationControls } from "@/components/pagination-controls"
import { getPostsPaginated } from "@/lib/wordpress"
import type { Post } from "@/lib/wordpress.d"
import { FluidBackground } from "@/components/ui/fluid-background"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { EuropeMap } from "@/components/europe-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Stories - Tribitat",
  description: "Browse real stories from around the world, shared in plain English.",
  openGraph: {
    title: "Stories - Tribitat",
    description: "Browse real stories from around the world, shared in plain English.",
    url: "https://www.tribitat.com/stories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stories - Tribitat",
    description: "Browse real stories from around the world, shared in plain English.",
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

      <section className="mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <ScrollReveal>
          <div className="bento-card mb-8 p-7 sm:p-9">
            <span className="section-kicker mb-3">Story Feed</span>
            <h1 className="headline-lg text-balance mb-4">All stories, one place.</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Discover personal journeys and cultural snapshots from across Europe in plain English.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <EuropeMap />
        </ScrollReveal>
      </section>

      <BlogGrid
        posts={posts}
        totalPages={totalPages}
        enableInfinite={false}
        title={page > 1 ? `Page ${page} Stories` : "Latest Stories"}
        subtitle="Scroll less, discover faster."
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
