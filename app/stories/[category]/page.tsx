import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PaginationControls } from "@/components/pagination-controls"
import { getCategoryBySlug, getPostsPaginated } from "@/lib/wordpress"
import { getCategoryPath, getCategoryUrl } from "@/lib/urls"
import type { Post } from "@/lib/wordpress.d"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { BlogCard } from "@/components/blog-card"

const COUNTRY_MASCOTS: Record<string, string> = {
  austria: "/dailydach-austria.webp",
  germany: "/dailydach-germany.webp",
  switzerland: "/dailydach-switzerland.webp",
}


function getMascotSrc(slug: string): string {
  return COUNTRY_MASCOTS[slug.toLowerCase()] ?? "/dailydach.webp"
}

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

  const canonicalUrl = getCategoryUrl(category.slug)

  return {
    title: `${category.name} Stories - DailyDach`,
    description: `Browse stories from ${category.name} in plain English.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${category.name} Stories - DailyDach`,
      description: `Browse stories from ${category.name} in plain English.`,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Stories - DailyDach`,
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

  const heroPost = page === 1 ? allPosts[0] : null
  const gridPosts = page === 1 ? allPosts.slice(1) : allPosts

  const mascotSrc = getMascotSrc(slug)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <Link
          href="/stories"
          className="mb-8 inline-flex items-center gap-2 border-2 border-foreground/90 bg-card px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.1em] text-muted-foreground shadow-[2px_2px_0_0_var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-foreground hover:shadow-[3px_3px_0_0_var(--foreground)]"
        >
          <ArrowLeft className="size-4" />
          Back to stories
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          {/* Left: mascot + category name */}
          <ScrollReveal className="lg:col-span-5">
            <div className="flex flex-col items-center gap-4 p-2 text-center sm:p-4">
              <Image
                src={mascotSrc}
                alt={`${category.name} mascot`}
                width={750}
                height={1000}
                priority
                className="h-auto w-full max-w-xs object-contain sm:max-w-sm"
              />
              <h1 className="headline-lg text-balance leading-none">{category.name}</h1>
            </div>
          </ScrollReveal>

          {/* Right: single post, centered */}
          {heroPost && (
            <ScrollReveal delay={0.08} className="flex items-center justify-center lg:col-span-7">
              <div className="w-full max-w-md">
                <BlogCard post={heroPost} featured index={0} />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6 mt-2">
          <h2 className="font-display text-3xl font-bold italic">More stories</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + 1} />
          ))}
        </div>

        <div className="mt-12">
          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            buildHref={(p) => {
              const nextParams = new URLSearchParams()
              if (p > 1) nextParams.set("page", String(p))
              return `${getCategoryPath(slug)}${nextParams.toString() ? `?${nextParams.toString()}` : ""}`
            }}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
