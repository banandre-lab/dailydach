import type { Post, Category, Tag } from "@/lib/wordpress.d"
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { decode } from "html-entities"

interface BlogCardProps {
  post: Post
  featured?: boolean
  index?: number
}

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
  const primaryCategory = post._embedded?.["wp:term"]?.[0]?.find(
    (term: Category | Tag) => term.taxonomy === "category"
  )

  const title = decode(post.title.rendered)
  const excerpt = decode(post.excerpt.rendered.replace(/<[^>]*>/g, "").trim())
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <ScrollReveal delay={Math.min(index * 0.05, 0.45)} className="h-full">
      <Link href={`/${primaryCategory?.slug || "uncategorized"}/${post.slug}`} className="block h-full no-underline">
        <article
          className={`brand-radius-lg group relative flex h-full flex-col overflow-hidden border-2 border-foreground bg-card transition-all duration-250 hover:z-10 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_0_var(--foreground)] ${
            featured ? "shadow-[7px_7px_0_0_var(--foreground)]" : "shadow-[5px_5px_0_0_var(--foreground)]"
          }`}
        >
          <div className="absolute -right-12 -top-10 h-28 w-28 rotate-12 border-2 border-foreground bg-accent/35" />

          <div className="relative h-52 overflow-hidden border-b-2 border-foreground sm:h-56">
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

            <span className="brand-radius absolute left-3 top-3 inline-flex -rotate-2 border-2 border-foreground bg-secondary px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.12em] text-secondary-foreground shadow-[2px_2px_0_0_var(--foreground)]">
              {primaryCategory?.name || "Uncategorized"}
            </span>
          </div>

          <div className="relative flex grow flex-col p-5">
            <time className="mb-3 text-[0.64rem] font-black uppercase tracking-[0.12em] text-muted-foreground">{date}</time>

            <h3
              className={`text-balance font-display leading-[0.9] text-foreground ${
                featured ? "text-2xl sm:text-3xl" : "text-2xl"
              }`}
            >
              {title}
            </h3>

            <p className="mt-3 line-clamp-3 grow text-sm leading-relaxed text-muted-foreground">{excerpt}</p>

            <div className="mt-6 inline-flex items-center gap-2 text-[0.66rem] font-black uppercase tracking-[0.12em] text-primary">
              Read Story
              <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </div>
          </div>
        </article>
      </Link>
    </ScrollReveal>
  )
}
