import type { Post } from "@/lib/wordpress.d"
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { decode } from "html-entities"
import { getPostCategories, getPostPath } from "@/lib/urls"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface BlogCardProps {
  post: Post
  featured?: boolean
  index?: number
}

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
  const categories = getPostCategories(post)
  const visibleCategories = categories.slice(0, featured ? 3 : 2)
  const remainingCategories = categories.length - visibleCategories.length

  const title = decode(post.title.rendered)
  const excerpt = decode(post.excerpt.rendered.replace(/<[^>]*>/g, "").trim())
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <ScrollReveal delay={Math.min(index * 0.05, 0.45)} className="h-full">
      <Link href={getPostPath(post.slug)} className="block h-full no-underline">
        <article
          className={`group relative flex h-full flex-col bg-[linear-gradient(180deg,hsl(var(--card))_0%,hsl(var(--card)/0.94)_100%)] transition-all duration-250 hover:z-10 hover:-translate-x-1 ${
            featured ? "hover:-translate-y-0.5" : ""
          }`}
        >
          <div className="relative h-52 overflow-hidden rounded-t-[18px] bg-[linear-gradient(180deg,hsl(var(--card))_0%,hsl(var(--card)/0.94)_100%)] sm:h-56">
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

            <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2">
              {visibleCategories.length > 0 ? (
                <>
                  {visibleCategories.map((category, categoryIndex) => (
                    <Badge
                      key={category.id}
                      variant={categoryIndex === 0 ? "secondary" : "outline"}
                      className="h-auto max-w-full -rotate-2 px-3 py-1 text-[0.58rem] font-black tracking-[0.12em]"
                    >
                      {category.name}
                    </Badge>
                  ))}
                  {remainingCategories > 0 && (
                    <Badge
                      variant="outline"
                      className="h-auto bg-card/90 px-3 py-1 text-[0.58rem] font-black tracking-[0.12em] backdrop-blur-sm"
                    >
                      +{remainingCategories}
                    </Badge>
                  )}
                </>
              ) : (
                <Badge variant="secondary" className="h-auto -rotate-2 px-3 py-1 text-[0.58rem] font-black tracking-[0.12em]">
                  Uncategorized
                </Badge>
              )}
            </div>
          </div>

          <Card
            frame="sides-bottom"
            className={`grow py-0 hover:translate-y-0 ${
              featured ? "shadow-[4px_7px_0_0_hsl(var(--foreground)/0.86)]" : "shadow-[3px_5px_0_0_hsl(var(--foreground)/0.82)]"
            }`}
          >
            <div className="relative flex grow flex-col p-5">
              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <time className="text-[0.64rem] font-black uppercase tracking-[0.12em] text-muted-foreground">{date}</time>
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {categories.slice(0, 3).map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center text-[0.58rem] font-black uppercase tracking-[0.1em] text-primary"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

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
          </Card>
        </article>
      </Link>
    </ScrollReveal>
  )
}
