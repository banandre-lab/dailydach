import Link from "next/link"
import Image from "next/image"
import { notFound, permanentRedirect } from "next/navigation"
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
  getCategoryBySlug,
  normalizeArticleHeadingHierarchy,
  sanitizeInlineBackgrounds,
  stripDuplicatedArticleChrome,
} from "@/lib/wordpress"
import {
  getCategoryPath,
  getCategoryUrl,
  getPostCategories,
  getPostPath,
  getPostUrl,
  getPrimaryCategory,
  getTagPath,
} from "@/lib/urls"
import type { Post, RelatedPost } from "@/lib/wordpress.d"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FluidBackground } from "@/components/ui/fluid-background"

export const dynamicParams = true

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export async function generateStaticParams() {
  return await getAllPostSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  const description = decode(post.excerpt.rendered.replace(/<[^>]*>/g, "").trim())
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0] || null
  const imageUrl = featuredMedia?.source_url || `${getPostUrl("opengraph-image")}`
  const canonicalUrl = getPostUrl(post.slug)

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

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    const category = await getCategoryBySlug(slug)

    if (category) {
      const sp = searchParams ? await searchParams : undefined
      const nextSearchParams = new URLSearchParams()

      if (sp) {
        for (const [key, value] of Object.entries(sp)) {
          if (Array.isArray(value)) {
            value.forEach((item) => nextSearchParams.append(key, item))
          } else if (value) {
            nextSearchParams.set(key, value)
          }
        }
      }

      const destination = `${getCategoryPath(category.slug)}${
        nextSearchParams.toString() ? `?${nextSearchParams.toString()}` : ""
      }`

      permanentRedirect(destination)
    }

    notFound()
  }

  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0] || null
  const categories = getPostCategories(post)
  const category = getPrimaryCategory(post)
  const tags = post._embedded?.["wp:term"]?.[1] || []

  if (!category) {
    notFound()
  }

  const title = decode(post.title.rendered)
  const description = decode(post.excerpt.rendered.replace(/<[^>]*>/g, "").trim())
  const articleContent = sanitizeInlineBackgrounds(
    normalizeArticleHeadingHierarchy(stripDuplicatedArticleChrome(post.content.rendered || ""))
  )

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

  const categoryRail = (
    await Promise.all(
      categories.slice(0, 3).map(async (categoryItem) => {
        const response = await getPostsPaginated(1, 6, {
          category: categoryItem.id.toString(),
        })

        return {
          category: categoryItem,
          posts: response.data.filter((categoryPost) => categoryPost.id !== post.id).slice(0, 2),
        }
      })
    )
  ).filter((entry) => entry.posts.length > 0)
  const categoryRailItems = categoryRail
    .flatMap(({ category: categoryItem, posts }) =>
      posts.map((categoryPost) => ({
        category: categoryItem,
        post: categoryPost,
      }))
    )
    .slice(0, 4)

  const articleUrl = getPostUrl(post.slug)
  const categoryUrl = getCategoryUrl(category.slug)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: featuredMedia?.source_url || `${getPostUrl("opengraph-image")}`,
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
        url: `${getPostUrl("opengraph-image")}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: categories.map((categoryItem) => categoryItem.name),
    keywords: [...categories.map((categoryItem) => categoryItem.name), ...tags.map((tag) => tag.name)].join(", "),
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
        name: "Stories",
        item: "https://www.dailydach.com/stories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: title,
        item: articleUrl,
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
              <div className="flex flex-wrap gap-2">
                {categories.map((categoryItem, index) => (
                  <Link key={categoryItem.id} href={getCategoryPath(categoryItem.slug)}>
                    <Badge
                      variant={index === 0 ? "default" : "outline"}
                      className={`h-auto px-4 py-2 font-display text-[0.72rem] font-black uppercase tracking-[0.18em] ${
                        index === 0
                          ? "border-black/20 shadow-[3px_3px_0_0_rgba(0,0,0,0.35)]"
                          : "border-white/55 bg-white/12 text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.24)] backdrop-blur-sm"
                      }`}
                    >
                      {categoryItem.name}
                    </Badge>
                  </Link>
                ))}
              </div>
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
              <div className="maxi-panel-clean p-6 sm:p-10">
                <div className="blog-post-content drop-cap">
                  {articleContent && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: articleContent,
                      }}
                    />
                  )}
                </div>
              </div>

              {tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2 border-t-2 border-foreground/80 pt-6">
                  {tags.map((tag) => (
                    <Link key={tag.id} href={getTagPath(tag.slug)}>
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
                <ShareButtons title={title} url={getPostPath(post.slug)} />
              </div>

              <div className="maxi-panel overflow-hidden p-0">
                <div className="border-b-2 border-foreground bg-secondary px-5 py-4 text-secondary-foreground">
                  <h2 className="font-display text-2xl leading-[0.92]">Follow the angles</h2>
                </div>
                <div className="space-y-3 p-4">
                  {categories.map((categoryItem, index) => (
                    <Link
                      key={categoryItem.id}
                      href={getCategoryPath(categoryItem.slug)}
                      className={`brand-radius-lg flex items-center justify-between gap-3 border-2 border-foreground px-4 py-3 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--foreground)] ${
                        index === 0 ? "bg-primary text-primary-foreground" : "bg-card"
                      }`}
                    >
                      <div>
                        <span
                          className={`text-[0.58rem] font-black uppercase tracking-[0.12em] ${
                            index === 0 ? "text-primary-foreground/75" : "text-muted-foreground"
                          }`}
                        >
                          Category
                        </span>
                        <p className="font-display text-xl leading-none">{categoryItem.name}</p>
                      </div>
                      <span className="text-[0.64rem] font-black uppercase tracking-[0.12em]">
                        Open &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {categoryRailItems.length > 0 && (
                <div className="maxi-panel overflow-hidden p-0">
                  <div className="border-b-2 border-foreground bg-secondary px-5 py-4 text-secondary-foreground">
                    <h2 className="font-display text-2xl leading-[0.92]">Fresh picks</h2>
                  </div>
                  <div className="space-y-2.5 p-5">
                    {categoryRailItems.map(({ category: categoryItem, post: categoryPost }) => {
                      const categoryPostTitle = decode(categoryPost.title.rendered)
                      const categoryPostDate = new Date(categoryPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                      const categoryPostImage =
                        categoryPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url

                      return (
                        <Link
                          key={`${categoryItem.id}-${categoryPost.id}`}
                          href={getPostPath(categoryPost.slug)}
                          className="brand-radius block border-2 border-foreground bg-background p-2.5 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--foreground)]"
                        >
                          <div className="flex gap-3">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden border-2 border-foreground bg-muted">
                              {categoryPostImage ? (
                                <Image
                                  src={categoryPostImage}
                                  alt={categoryPostTitle}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-[linear-gradient(135deg,var(--secondary),var(--accent))]" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[0.56rem] font-black uppercase tracking-[0.12em] text-primary">
                                  {categoryItem.name}
                                </span>
                                <span className="text-[0.56rem] font-black uppercase tracking-[0.11em] text-muted-foreground">
                                  {categoryPostDate}
                                </span>
                              </div>
                              <p className="mt-1.5 line-clamp-2 font-display text-base leading-[0.95]">
                                {categoryPostTitle}
                              </p>
                            </div>
                          </div>
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
