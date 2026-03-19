"use client"

import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import type { Post } from "@/lib/wordpress.d"
import { BlogCard } from "./blog-card"
import { Badge, badgeVariants } from "./ui/badge"
import { cn } from "@/lib/utils"

type TickerItem = string | {
  label: string
  href?: string
}

interface BlogGridProps {
  posts: Post[]
  categoryId?: number
  tagId?: number
  totalPages?: number
  enableInfinite?: boolean
  showHeader?: boolean
  eyebrow?: string
  title?: string
  subtitle?: string
  tickerItems?: TickerItem[]
}

const GRID_PATTERN = [
  "md:col-span-6 lg:col-span-6",
  "md:col-span-6 lg:col-span-6",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-5",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-6",
]

export function BlogGrid({
  posts: initialPosts,
  categoryId,
  tagId,
  totalPages,
  enableInfinite = true,
  showHeader = true,
  eyebrow = "Latest Stories",
  title = "Latest Stories",
  subtitle = "Stories from people, places, and perspectives across Europe",
  tickerItems = ["Latest Stories", "Across the Region", "Fresh Perspectives"],
}: BlogGridProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPosts(initialPosts)
    setPage(1)
  }, [initialPosts])

  const loadMorePosts = useCallback(async () => {
    setIsLoading(true)

    try {
      const newPage = page + 1
      const { getPostsPaginated } = await import("@/lib/wordpress")

      const filterParams: Record<string, string> = {}
      if (categoryId) filterParams.category = categoryId.toString()
      if (tagId) filterParams.tag = tagId.toString()

      const response = await getPostsPaginated(newPage, 9, filterParams)

      setPosts((prev) => {
        const existingIds = new Set(prev.map((item) => item.id))
        const incoming = response.data.filter((item) => !existingIds.has(item.id))
        return [...prev, ...incoming]
      })

      setPage(newPage)
    } catch (error) {
      console.error("Failed to load more posts:", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, categoryId, tagId])

  useEffect(() => {
    if (!enableInfinite) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !isLoading && totalPages && page < totalPages) {
          loadMorePosts()
        }
      },
      { threshold: 0.1, rootMargin: "120px" }
    )

    if (observerTarget.current && totalPages && page < totalPages) {
      observer.observe(observerTarget.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [isLoading, loadMorePosts, page, totalPages, enableInfinite])

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {showHeader && (
        <header className="mb-10">
          <div className="maxi-panel p-6 sm:p-8">
            <span className="section-kicker mb-3">{eyebrow}</span>
            <h2 className="headline-lg text-balance">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
            <div className="editorial-rule mt-5" />
            <div className="mt-4 border-y-2 border-foreground bg-secondary px-3 py-3 sm:px-4">
              <div className="flex flex-wrap items-center gap-2">
                {tickerItems.map((item, index) => {
                  const badgeLabel = typeof item === "string" ? item : item.label
                  const badgeHref = typeof item === "string" ? undefined : item.href

                  if (badgeHref) {
                    return (
                      <Link
                        key={`${badgeLabel}-${index}`}
                        href={badgeHref}
                        className={cn(
                          badgeVariants({ variant: "outline" }),
                          "bg-card text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-card/90"
                        )}
                      >
                        {badgeLabel}
                      </Link>
                    )
                  }

                  return (
                    <Badge key={`${badgeLabel}-${index}`} variant="outline" className="bg-card text-foreground">
                      {badgeLabel}
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="grid grid-cols-1 gap-6 md:auto-rows-fr md:grid-cols-12">
        {posts.map((post, index) => {
          const spanClass = GRID_PATTERN[index % GRID_PATTERN.length]
          const featured = spanClass.includes("lg:col-span-6") || spanClass.includes("lg:col-span-5")

          return (
            <div key={post.id} className={`${spanClass} h-full`}>
              <BlogCard post={post} index={index} featured={featured} />
            </div>
          )
        })}
      </div>

      {isLoading && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="h-3 w-3 animate-pulse bg-primary" />
          <span className="h-3 w-3 animate-pulse bg-foreground [animation-delay:120ms]" />
          <span className="h-3 w-3 animate-pulse bg-accent [animation-delay:240ms]" />
        </div>
      )}

      {enableInfinite && totalPages && page < totalPages && (
        <div ref={observerTarget} className="h-16" aria-hidden="true" />
      )}
    </section>
  )
}
