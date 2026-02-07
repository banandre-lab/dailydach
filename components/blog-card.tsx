import type { Post, Category, Tag } from "@/lib/wordpress.d"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
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
    <ScrollReveal delay={Math.min(index * 0.06, 0.5)} className="h-full">
      <Link href={`/${primaryCategory?.slug || "uncategorized"}/${post.slug}`} className="block h-full no-underline">
        <Card
          className={`group relative z-0 h-full gap-0 py-0 transition-all duration-200 hover:z-10 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0_0_var(--foreground)] ${
            featured ? "md:col-span-2" : ""
          }`}
        >
          <div className="relative h-52 overflow-hidden border-b-2 border-foreground/90">
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <span className="absolute left-3 top-3 border-2 border-foreground/90 bg-background px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-foreground shadow-[2px_2px_0_0_rgba(0,0,0,0.5)]">
              {primaryCategory?.name || "Uncategorized"}
            </span>
          </div>

          <CardContent className="flex grow flex-col p-5">
            <time className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">{date}</time>

            <h3 className={`text-balance font-display font-bold italic leading-tight text-foreground ${featured ? "text-xl sm:text-2xl" : "text-xl"}`}>
              {title}
            </h3>

            <p className="mt-3 line-clamp-3 grow text-sm leading-relaxed text-muted-foreground">{excerpt}</p>

            <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-primary">
              Read story
              <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </ScrollReveal>
  )
}
