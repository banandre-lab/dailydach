import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { decode } from "html-entities"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedPosts } from "@/components/related-posts"
import { Badge } from "@/components/ui/badge"
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPostsByTags,
  getPostsPaginated,
} from "@/lib/wordpress"
import type { Post, RelatedPost } from "@/lib/wordpress.d"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const dynamicParams = true

async function getPostData(slug: string) {
  return getPostBySlug(slug)
}

interface BlogPostPageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return await getAllPostSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    return {}
  }

  const description = decode(post.excerpt.rendered.replace(/<[^>]*>/g, "").trim())
  const category = post._embedded?.["wp:term"]?.[0]?.[0]
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0] || null

  if (!category) {
    return {}
  }

  const imageUrl = featuredMedia?.source_url || "https://www.tribitat.com/opengraph-image"
  const canonicalUrl = `https://www.tribitat.com/${category.slug}/${post.slug}`

  return {
    title: decode(post.title.rendered),
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: decode(post.title.rendered),
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: ["Tribitat"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: decode(post.title.rendered),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: decode(post.title.rendered),
      description,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    notFound()
  }

  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0] || null
  const category = post._embedded?.["wp:term"]?.[0]?.[0]
  const tags = post._embedded?.["wp:term"]?.[1] || []

  if (!category) {
    notFound()
  }

  const title = decode(post.title.rendered)
  const description = decode(post.excerpt.rendered.replace(/<[^>]*>/g, "").trim())

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  let relatedPostsList: RelatedPost[] = []
  if (tags.length > 0) {
    const tagSlugs = tags.map((tag) => tag.slug)
    const relatedResponse = await getRelatedPostsByTags(tagSlugs, 3, [post.id])
    relatedPostsList = relatedResponse.posts
  }

  const latestCategoryResponse = await getPostsPaginated(1, 8, {
    category: category.id.toString(),
  })
  const latestCategoryPosts: Post[] = latestCategoryResponse.data
    .filter((categoryPost) => categoryPost.id !== post.id)
    .slice(0, 4)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: featuredMedia?.source_url || "https://www.tribitat.com/opengraph-image",
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Organization",
      name: "Tribitat",
    },
    publisher: {
      "@type": "Organization",
      name: "Tribitat",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tribitat.com/opengraph-image",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.tribitat.com/${category.slug}/${post.slug}`,
    },
    keywords: tags.map((tag) => tag.name).join(", "),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.tribitat.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `https://www.tribitat.com/${category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://www.tribitat.com/${category.slug}/${post.slug}`,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      {/* ── Full-width cinematic hero ── */}
      <section className="relative w-full overflow-hidden border-b-2 border-foreground/90">
        {/* Hero image — edge to edge */}
        <div className="relative h-[55vh] min-h-[400px] sm:h-[60vh] md:h-[70vh]">
          <img
            src={featuredMedia?.source_url || "/placeholder.svg"}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Ink-wash gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Content overlay — pinned to bottom */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              {/* Breadcrumb row */}
              <nav className="mb-5 flex items-center gap-2 text-[0.64rem] font-black uppercase tracking-[0.12em] text-white/70">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <span className="text-white/40">/</span>
                <Link href={`/${category.slug}`} className="transition-colors hover:text-white">
                  {category.name}
                </Link>
                <span className="text-white/40">/</span>
                <span className="truncate text-white/90">Story</span>
              </nav>

              {/* Category + date row */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex border-2 border-white/30 bg-white/10 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-white shadow-[2px_2px_0_0_rgba(255,255,255,0.15)]">
                  {category.name}
                </span>
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/60">
                  {date}
                </span>
              </div>

              {/* Title */}
              <h1 className="max-w-4xl text-balance font-display text-4xl font-bold italic leading-[0.94] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h1>

              {/* Excerpt teaser */}
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                {description}
              </p>

              {/* Share row — inline on hero */}
              <div className="mt-6">
                <ShareButtons title={title} url={`/${category.slug}/${post.slug}`} variant="hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article body + sidebar ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main content column */}
          <ScrollReveal className="lg:col-span-8">
            <article>
              <div className="blog-post-content border-2 border-foreground/90 bg-card p-6 shadow-[5px_5px_0_0_var(--foreground)] sm:p-10">
                {post.content.rendered && <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />}
              </div>

              {tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2 border-t-2 border-foreground/90 pt-6">
                  {tags.map((tag) => (
                    <Link key={tag.id} href={`/tag/${tag.slug}`}>
                      <Badge variant="outline" className="cursor-pointer">
                        #{tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </ScrollReveal>

          {/* Sidebar — sticky on desktop */}
          <ScrollReveal delay={0.08} className="lg:col-span-4">
            <aside className="space-y-5 lg:sticky lg:top-24">
              {/* Share card */}
              <div className="bento-card">
                <p className="section-kicker mb-4">Spread the Word</p>
                <ShareButtons title={title} url={`/${category.slug}/${post.slug}`} />
              </div>

              {/* Back to channel */}
              <Link
                href={`/${category.slug}`}
                className="group flex items-center gap-3 border-2 border-foreground/90 bg-card p-4 shadow-[3px_3px_0_0_var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--foreground)]"
              >
                <span className="inline-flex size-8 items-center justify-center border-2 border-foreground/90 bg-primary text-primary-foreground text-xs font-black">
                  &larr;
                </span>
                <div>
                  <span className="text-[0.62rem] font-black uppercase tracking-[0.1em] text-muted-foreground">
                    More from
                  </span>
                  <p className="font-display text-lg font-bold italic leading-tight">{category.name}</p>
                </div>
              </Link>

              {latestCategoryPosts.length > 0 && (
                <div className="bento-card">
                  <p className="section-kicker mb-4">Latest from {category.name}</p>
                  <div className="space-y-3">
                    {latestCategoryPosts.map((categoryPost) => {
                      const categoryPostTitle = decode(categoryPost.title.rendered)
                      const categoryPostDate = new Date(categoryPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })

                      return (
                        <Link
                          key={categoryPost.id}
                          href={`/${category.slug}/${categoryPost.slug}`}
                          className="block border-2 border-foreground/90 bg-background px-3 py-3 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--foreground)]"
                        >
                          <p className="line-clamp-2 font-display text-base font-bold leading-tight">{categoryPostTitle}</p>
                          <p className="mt-2 text-[0.64rem] font-black uppercase tracking-[0.1em] text-muted-foreground">
                            {categoryPostDate}
                          </p>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </aside>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Related posts ── */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <RelatedPosts posts={relatedPostsList} />
      </section>

      <ScrollToTop />
      <Footer />
    </main>
  )
}
