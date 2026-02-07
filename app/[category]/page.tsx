import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PaginationControls } from "@/components/pagination-controls"
import { getCategoryBySlug, getPostsPaginated } from "@/lib/wordpress"
import type { Post } from "@/lib/wordpress.d"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { BlogCard } from "@/components/blog-card"

interface CategoryPageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category: slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return {}
  }

  const canonicalUrl = `https://www.tribitat.com/${category.slug}`

  return {
    title: `${category.name} Stories - Tribitat`,
    description: `Browse stories from ${category.name} in plain English.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${category.name} Stories - Tribitat`,
      description: `Browse stories from ${category.name} in plain English.`,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Stories - Tribitat`,
      description: `Browse stories from ${category.name} in plain English.`,
    },
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: slug } = await params
  const sp = await searchParams
  const page = sp?.page ? parseInt(sp.page, 10) || 1 : 1
  const perPage = 12

  const category = await getCategoryBySlug(slug)
  if (!category) {
    notFound()
  }

  const response = await getPostsPaginated(page, perPage, {
    category: category.id.toString(),
  })

  const allPosts: Post[] = response.data
  const { totalPages } = response.headers

  const featuredPosts = page === 1 ? allPosts.slice(0, 3) : []
  const gridPosts = page === 1 ? allPosts.slice(3) : allPosts

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <Link
          href="/stories"
          className="mb-5 inline-flex items-center gap-2 border-2 border-foreground/90 bg-card px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.1em] text-muted-foreground shadow-[2px_2px_0_0_var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-foreground hover:shadow-[3px_3px_0_0_var(--foreground)]"
        >
          <ArrowLeft className="size-4" />
          Back to stories
        </Link>

        <ScrollReveal>
          <div className="bento-card p-7 sm:p-9">
            <span className="section-kicker mb-3">Country Channel</span>
            <h1 className="headline-lg mb-3 text-balance">{category.name}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              {category.description || `Explore stories, context, and local voices from ${category.name}.`}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold italic">Featured in {category.name}</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {featuredPosts.map((post, index) => (
              <div key={post.id} className={index === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                <BlogCard post={post} featured={index === 0} index={index} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6 mt-6">
          <h2 className="font-display text-3xl font-bold italic">More stories</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + featuredPosts.length} />
          ))}
        </div>

        <div className="mt-12">
          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            buildHref={(p) => {
              const params = new URLSearchParams()
              if (p > 1) params.set("page", String(p))
              return `/${slug}${params.toString() ? `?${params.toString()}` : ""}`
            }}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
