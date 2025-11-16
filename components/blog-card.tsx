import type { Post, Category, Tag } from "@/lib/wordpress.d";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  // Get featured image URL from embedded data
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  // Get primary category from embedded data
  const primaryCategory = post._embedded?.["wp:term"]?.[0]?.find(
    (term: Category | Tag) => term.taxonomy === "category"
  );

  return (
    <Link href={`/blog/${post.slug}`} className="no-underline">
      <Card
        className={`group rounded-2xl overflow-hidden border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col h-full gap-0 py-0 shadow-none ${
          featured ? "md:col-span-2 md:row-span-1" : ""
        }`}
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden bg-muted ${
            featured ? "h-48" : "h-48"
          }`}
        >
          <Image
            src={featuredImage || "/placeholder.svg"}
            alt={post.title.rendered}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
              {primaryCategory?.name || "Uncategorized"}
            </span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 md:p-6 flex flex-col grow">
          {/* Date */}
          <time className="text-xs text-muted-foreground font-medium">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>

          {/* Title */}
          <h3
            className={`mt-2 font-bold text-foreground line-clamp-2 group-hover:text-accent-foreground transition-colors ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {post.title.rendered}
          </h3>

          {/* Excerpt */}
          <p
            className={`mt-2 text-muted-foreground line-clamp-2 text-sm leading-relaxed grow ${
              featured ? "md:line-clamp-3" : ""
            }`}
          >
            {post.excerpt.rendered.replace(/<[^>]*>/g, "")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
