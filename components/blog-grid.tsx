"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { Post } from "@/lib/wordpress.d"
import { BlogCard } from "./blog-card"

interface BlogGridProps {
  posts: Post[]
  categoryId?: number
  tagId?: number
  totalPages?: number
  enableInfinite?: boolean
  title?: string
  subtitle?: string
}

const GRID_PATTERN = [
  "md:col-span-6 lg:col-span-6",
  "md:col-span-6 lg:col-span-6",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-5",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-3",
]

export function BlogGrid({
  posts: initialPosts,
  categoryId,
  tagId,
  totalPages,
  enableInfinite = true,
  title = "Latest Stories",
  subtitle = "Stories from people, places, and perspectives across Europe",
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
      <header className="mb-10 flex flex-col gap-3">
        <span className="section-kicker w-fit">Discover</span>
        <h2 className="headline-lg text-balance">{title}</h2>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
        <div className="editorial-rule mt-2" />
      </header>

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
          <span className="h-3 w-3 animate-pulse bg-primary [animation-delay:240ms]" />
        </div>
      )}

      {enableInfinite && totalPages && page < totalPages && (
        <div ref={observerTarget} className="h-16" aria-hidden="true" />
      )}
    </section>
  )
}
