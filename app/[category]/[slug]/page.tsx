import Link from "next/link"
import Image from "next/image"
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
  sanitizeInlineBackgrounds,
} from "@/lib/wordpress"
import type { Post, RelatedPost } from "@/lib/wordpress.d"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FluidBackground } from "@/components/ui/fluid-background"

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

  const imageUrl = featuredMedia?.source_url || "https://www.dailydach.com/opengraph-image"
  const canonicalUrl = `https://www.dailydach.com/${category.slug}/${post.slug}`

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
      authors: ["DailyDach"],
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
    image: featuredMedia?.source_url || "https://www.dailydach.com/opengraph-image",
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Organization",
      name: "DailyDach",
    },
    publisher: {
      "@type": "Organization",
      name: "DailyDach",
      logo: {
        "@type": "ImageObject",
        url: "https://www.dailydach.com/opengraph-image",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.dailydach.com/${category.slug}/${post.slug}`,
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
        item: "https://www.dailydach.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `https://www.dailydach.com/${category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://www.dailydach.com/${category.slug}/${post.slug}`,
      },
    ],
  }

  return (
    <main className="relative min-h-screen bg-background">
      <FluidBackground />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <section className="relative w-full min-h-[430px] overflow-hidden border-b-2 border-foreground/70 md:min-h-[560px]">
        <div className="absolute inset-0">
          {featuredMedia?.source_url ? (
            <Image
              src={featuredMedia.source_url}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,color-mix(in_oklab,var(--secondary)_85%,transparent),color-mix(in_oklab,var(--accent)_55%,transparent),color-mix(in_oklab,var(--primary)_75%,transparent))]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-black/18 backdrop-blur-md [mask-image:linear-gradient(to_top,black,transparent)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[430px] w-full max-w-7xl items-end px-4 pb-8 pt-24 sm:px-6 md:min-h-[560px] md:pb-12 md:pt-32 lg:px-8">
          <div className="w-full max-w-4xl">
            <div className="mb-4">
              <span className="section-kicker border-white/20 bg-primary text-primary-foreground shadow-[2px_2px_0_0_rgba(0,0,0,0.35)]">
                {category.name}
              </span>
            </div>

            <h1 className="max-w-4xl font-display text-4xl leading-[0.9] text-white sm:text-5xl lg:text-7xl">
              {title}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/88 sm:text-base md:text-lg">
              {description}
            </p>

            <div className="mt-4 flex items-center gap-4 text-sm font-medium text-white/78">
              <time dateTime={post.date}>{date}</time>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-8">
            <article>
              <div className="maxi-panel p-6 sm:p-10">
                <div className="blog-post-content drop-cap">
                  {post.content.rendered && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitizeInlineBackgrounds(post.content.rendered),
                      }}
                    />
                  )}
                </div>
              </div>

              {tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2 border-t-2 border-foreground/80 pt-6">
                  {tags.map((tag) => (
                    <Link key={tag.id} href={`/tag/${tag.slug}`}>
                      <Badge variant="outline" className="cursor-pointer border-2 border-foreground bg-card px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.1em]">
                        #{tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="lg:col-span-4">
            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="maxi-panel p-5">
                <p className="section-kicker mb-4">Spread It</p>
                <ShareButtons title={title} url={`/${category.slug}/${post.slug}`} />
              </div>

              <Link
                href={`/${category.slug}`}
                className="brand-radius-lg group flex items-center gap-3 border-2 border-foreground bg-card p-4 shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--foreground)]"
              >
                <span className="brand-radius inline-flex size-8 items-center justify-center border-2 border-foreground bg-primary text-xs font-black text-primary-foreground">
                  &larr;
                </span>
                <div>
                  <span className="text-[0.62rem] font-black uppercase tracking-[0.11em] text-muted-foreground">
                    More from
                  </span>
                  <p className="font-display text-xl leading-none">{category.name}</p>
                </div>
              </Link>

              {latestCategoryPosts.length > 0 && (
                <div className="maxi-panel p-5">
                  <p className="section-kicker mb-4">Latest in {category.name}</p>
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
                          className="brand-radius block border-2 border-foreground bg-background px-3 py-3 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--foreground)]"
                        >
                          <p className="line-clamp-2 font-display text-lg leading-[0.92]">{categoryPostTitle}</p>
                          <p className="mt-2 text-[0.62rem] font-black uppercase tracking-[0.11em] text-muted-foreground">
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

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <RelatedPosts posts={relatedPostsList} />
      </section>

      <ScrollToTop />
      <Footer />
    </main>
  )
}
