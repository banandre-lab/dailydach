"use client";

import Link from "next/link";
import Image from "next/image";
import type { Post, Category, Tag } from "@/lib/wordpress.d";

interface RelatedPostsProps {
  posts: Post[];
  currentSlug?: string;
}

export function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-muted/30 border-t border-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Related Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            // Get data from embedded fields
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            const primaryCategory = post._embedded?.["wp:term"]?.[0]?.find(
              (term: Category | Tag) => term.taxonomy === "category"
            );

            return (
              <Link
                key={post.id}
                href={`/${primaryCategory?.slug || "uncategorized"}/${post.slug}`}
                className="group rounded-xl overflow-hidden bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={featuredImage || "/placeholder.svg"}
                    alt={post.title.rendered}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-2">
                    {primaryCategory?.name || "Uncategorized"}
                  </span>
                  <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title.rendered}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt.rendered.replace(/<[^>]*>/g, "")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
