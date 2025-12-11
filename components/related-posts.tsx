"use client";

import type { Post, RelatedPost } from "@/lib/wordpress.d";
import { BlogCard } from "@/components/blog-card";

interface RelatedPostsProps {
  posts: RelatedPost[];
}

/**
 * Transforms a RelatedPost (from custom API) to Post structure (for BlogCard compatibility)
 */
function transformRelatedPostToPost(relatedPost: RelatedPost): Post {
  // Extract category slug from the link
  const urlParts = relatedPost.link.split("/").filter(Boolean);
  const categorySlug = urlParts[urlParts.length - 2] || "uncategorized";

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
    categories: [],
    tags: relatedPost.tags.map((tag) => tag.id),
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
            id: 0,
            count: 0,
            description: "",
            link: `/${categorySlug}`,
            name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
            slug: categorySlug,
            taxonomy: "category" as const,
            parent: 0,
            meta: {},
          },
        ],
      ],
    },
  } as Post;
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border/50 pt-16 mt-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Related Articles
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          More stories you might find interesting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={post.id} className="h-full">
            <BlogCard post={transformRelatedPostToPost(post)} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
