import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { getTagBySlug, getPostsByTagPaginated } from "@/lib/wordpress"
import { BlogGrid } from "@/components/blog-grid"

export const dynamicParams = true

async function getTagData(slug: string) {
  return getTagBySlug(slug)
}

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTagData(slug)

  if (!tag) {
    return {}
  }

  const canonicalUrl = `https://www.tribitat.com/tag/${tag.slug}`

  return {
    title: `#${tag.name} - Tribitat`,
    description: `Browse stories tagged with #${tag.name} in plain English.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `#${tag.name} - Tribitat`,
      description: `Browse stories tagged with #${tag.name} in plain English.`,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tag.name} - Tribitat`,
      description: `Browse stories tagged with #${tag.name} in plain English.`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTagData(slug)

  if (!tag) {
    notFound()
  }

  const response = await getPostsByTagPaginated(tag.id)
  const posts = response.data
  const { totalPages } = response.headers

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <Link
          href="/tags"
          className="mb-5 inline-flex items-center gap-2 border-2 border-foreground/90 bg-card px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.1em] text-muted-foreground shadow-[2px_2px_0_0_var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-foreground hover:shadow-[3px_3px_0_0_var(--foreground)]"
        >
          <ArrowLeft className="size-4" />
          Back to tags
        </Link>

        <ScrollReveal>
          <div className="bento-card p-7 sm:p-9">
            <span className="section-kicker mb-3">Tag Feed</span>
            <h1 className="headline-lg mb-3 text-balance">#{tag.name}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              {tag.description || `Explore stories and insights about ${tag.name}.`}
            </p>
          </div>
        </ScrollReveal>
      </section>

      <BlogGrid posts={posts} tagId={tag.id} totalPages={totalPages} title={`Stories tagged #${tag.name}`} />

      <Footer />
    </main>
  )
}
