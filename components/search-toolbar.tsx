"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock, ArrowRight, Loader2, FileText } from "lucide-react"
import Image from "next/image"
import { searchPosts, getCategoriesClient } from "@/lib/wordpress"
import { cn } from "@/lib/utils"
import type { Post, Category, Tag } from "@/lib/wordpress.d"
import { decode } from "html-entities"

interface SearchToolbarProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchToolbar({ isOpen, onClose }: SearchToolbarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }

    getCategoriesClient().then(setCategories).catch(console.error)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true)

      try {
        const posts = await searchPosts(query, 10)

        const filteredPosts = selectedCategory
          ? posts.filter((post) => post.categories.includes(selectedCategory))
          : posts

        setResults(filteredPosts)

        if (!recentSearches.includes(query) && query.length > 3) {
          const newRecent = [query, ...recentSearches].slice(0, 5)
          setRecentSearches(newRecent)
          localStorage.setItem("recentSearches", JSON.stringify(newRecent))
        }
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 260)

    return () => clearTimeout(timeoutId)
  }, [query, selectedCategory, recentSearches])

  const handleClose = () => {
    setQuery("")
    setResults([])
    onClose()
  }

  const handleResultClick = (post: Post) => {
    const primaryCategory = post._embedded?.["wp:term"]?.[0]?.find(
      (term: Category | Tag) => term.taxonomy === "category"
    )

    const href = `/${primaryCategory?.slug || "uncategorized"}/${post.slug}`
    handleClose()
    router.push(href)
  }

  const clearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed left-0 right-0 top-0 z-50 border-b-2 border-foreground/90 bg-background"
          >
            <div className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6">
              <div className="brand-radius-lg border-2 border-foreground/90 bg-card shadow-[5px_5px_0_0_var(--foreground)]">
                <div className="flex items-center gap-3 border-b-2 border-foreground/90 px-4 py-4 sm:px-5">
                  <Search className="size-5 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search stories, places, or topics"
                    className="flex-1 bg-transparent text-base font-semibold text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:text-lg"
                  />
                  <button
                    onClick={handleClose}
                    className="brand-radius inline-flex size-9 items-center justify-center border-2 border-foreground/90 bg-background text-foreground transition-all hover:bg-muted"
                    aria-label="Close search"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 border-b-2 border-foreground/90 px-4 py-3 sm:px-5">
                  <FilterPill active={selectedCategory === null} onClick={() => setSelectedCategory(null)}>
                    All
                  </FilterPill>
                  {categories.map((category) => (
                    <FilterPill
                      key={category.id}
                      active={selectedCategory === category.id}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </FilterPill>
                  ))}
                </div>

                <div className="max-h-[62vh] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="size-7 animate-spin text-primary" />
                    </div>
                  ) : query ? (
                    <div className="p-4 sm:p-5">
                      {results.length > 0 ? (
                        <div className="grid gap-2">
                          {results.map((post) => {
                            const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                            const title = decode(post.title.rendered)
                            const excerpt = decode(post.excerpt.rendered.replace(/<[^>]*>/g, ""))

                            return (
                              <button
                                key={post.id}
                                onClick={() => handleResultClick(post)}
                                className="brand-radius group flex items-start gap-3 border-2 border-foreground/90 bg-background p-3 text-left transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--foreground)]"
                              >
                                <div className="brand-radius-sm relative h-16 w-24 shrink-0 overflow-hidden border-2 border-foreground/90 bg-muted sm:h-20 sm:w-32">
                                  {image ? (
                                    <Image
                                      src={image}
                                      alt={title}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                      <FileText className="size-5" />
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="line-clamp-2 font-display text-lg font-bold italic leading-tight text-foreground">
                                    {title}
                                  </h3>
                                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
                                </div>
                                <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                              </button>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="py-14 text-center text-sm font-medium text-muted-foreground">
                          No stories found for &quot;{query}&quot;.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 sm:p-5">
                      {recentSearches.length > 0 && (
                        <div>
                          <div className="mb-3 flex items-center justify-between px-1">
                            <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                              Recent Searches
                            </h3>
                            <button onClick={clearRecent} className="text-xs font-semibold text-primary hover:underline">
                              Clear
                            </button>
                          </div>
                          <div className="grid gap-1.5">
                            {recentSearches.map((term, i) => (
                              <button
                                key={i}
                                onClick={() => setQuery(term)}
                                className="brand-radius flex items-center gap-3 border-2 border-foreground/90 bg-background px-3 py-2 text-left text-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--foreground)]"
                              >
                                <Clock className="size-4 text-muted-foreground" />
                                <span className="font-medium text-foreground">{term}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "brand-radius border-2 px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.1em] whitespace-normal transition-all",
        active
          ? "border-foreground/90 bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--foreground)]"
          : "border-foreground/90 bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}
