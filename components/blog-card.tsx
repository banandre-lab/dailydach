import type { Post, Category, Tag } from "@/lib/wordpress.d";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
  index?: number;
}

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  // Get featured image URL from embedded data
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  // Get primary category from embedded data
  const primaryCategory = post._embedded?.["wp:term"]?.[0]?.find(
    (term: Category | Tag) => term.taxonomy === "category"
  );

  return (
    <ScrollReveal delay={index * 0.1}>
      <Link href={`/${primaryCategory?.slug || "uncategorized"}/${post.slug}`} className="no-underline block h-full">
        <Card
          className={`group glass-card rounded-2xl overflow-hidden border-white/20 dark:border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col h-full gap-0 py-0 shadow-none ${
            featured ? "md:col-span-2 md:row-span-1" : ""
          }`}
        >
          {/* Image Container */}
          <div
            className={`relative overflow-hidden bg-muted ${
              featured ? "h-56 md:h-64" : "h-48"
            }`}
          >
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={post.title.rendered}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="inline-block px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-foreground text-xs font-bold rounded-full shadow-sm">
                {primaryCategory?.name || "Uncategorized"}
              </span>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-5 flex flex-col grow relative">
            {/* Date */}
            <time className="text-xs text-muted-foreground font-medium mb-2 block">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            {/* Title */}
            <h3
              className={`font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-3 ${
                featured ? "text-xl md:text-2xl" : "text-lg"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </h3>

            {/* Excerpt */}
            <p
              className={`text-muted-foreground line-clamp-2 text-sm leading-relaxed grow ${
                featured ? "md:line-clamp-3" : ""
              }`}
            >
              {post.excerpt.rendered.replace(/<[^>]*>/g, "")}
            </p>
            
            {/* Read More Link */}
            <div className="mt-4 flex items-center text-primary text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Read Article <span className="ml-1">→</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </ScrollReveal>
  );
}

