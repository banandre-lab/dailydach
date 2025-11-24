"use client";

import type { Post } from "@/lib/wordpress.d";
import { BlogCard } from "@/components/blog-card";

interface RelatedPostsProps {
  posts: Post[];
  currentSlug?: string;
}

export function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
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
            <BlogCard post={post} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
