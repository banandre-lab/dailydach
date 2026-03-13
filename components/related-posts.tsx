"use client"

import type { Post, RelatedPost } from "@/lib/wordpress.d"
import { BlogCard } from "@/components/blog-card"
import { getCategoryPath } from "@/lib/urls"

interface RelatedPostsProps {
  posts: RelatedPost[]
}

function transformRelatedPostToPost(relatedPost: RelatedPost): Post {
  const firstCategory = relatedPost.categories?.[0]
  const categorySlug = firstCategory?.slug || "uncategorized"
  const categoryName = firstCategory?.name || "Uncategorized"
  const categoryId = firstCategory?.id || 0

  return {
    id: relatedPost.id,
    slug: relatedPost.slug,
    date: relatedPost.date,
    date_gmt: relatedPost.date,
    modified: relatedPost.modified,
    modified_gmt: relatedPost.modified,
    status: "publish",
    link: relatedPost.link,
    guid: { rendered: relatedPost.link },
    title: { rendered: relatedPost.title },
    excerpt: { rendered: relatedPost.excerpt, protected: false },
    content: { rendered: "", protected: false },
    author: relatedPost.author.id,
    featured_media: 0,
    comment_status: "closed",
    ping_status: "closed",
    sticky: false,
    template: "",
    format: "standard",
    categories: relatedPost.categories?.map((cat) => cat.id) || [],
    tags: relatedPost.tags?.map((tag) => tag.id) || [],
    meta: {},
    _embedded: {
      "wp:featuredmedia": [
        {
          id: 0,
          date: relatedPost.date,
          date_gmt: relatedPost.date,
          modified: relatedPost.modified,
          modified_gmt: relatedPost.modified,
          slug: "",
          status: "publish",
          link: relatedPost.featured_image,
          guid: { rendered: relatedPost.featured_image },
          title: { rendered: relatedPost.title },
          author: relatedPost.author.id,
          caption: { rendered: "" },
          alt_text: relatedPost.title,
          media_type: "image",
          mime_type: "image/jpeg",
          media_details: {
            width: 1200,
            height: 630,
            file: "",
            sizes: {},
          },
          source_url: relatedPost.featured_image,
        },
      ],
      "wp:term": [
        [
          {
            id: categoryId,
            count: 0,
            description: "",
            link: getCategoryPath(categorySlug),
            name: categoryName,
            slug: categorySlug,
            taxonomy: "category" as const,
            parent: 0,
            meta: {},
          },
        ],
      ],
    },
  } as Post
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-4 border-t-2 border-foreground/90 pt-12">
      <h2 className="mb-8 font-display text-3xl font-black leading-[0.9] sm:text-4xl">
        Related Stories
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div key={post.id} className="h-full">
            <BlogCard post={transformRelatedPostToPost(post)} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}
