"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Post, Category, Tag } from "@/lib/wordpress.d"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { decode } from "html-entities"

interface TopPostsSliderProps {
  posts: Post[]
}

export function TopPostsSlider({ posts }: TopPostsSliderProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const sliderPosts = posts.slice(0, 5)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  if (sliderPosts.length === 0) return null

  return (
    <section className="bento-card overflow-hidden p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="section-kicker mb-2">Editor Picks</p>
          <h2 className="font-display text-2xl font-bold italic">Top stories this week</h2>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        className="group relative"
        plugins={[Autoplay({ delay: 5000 })]}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent>
          {sliderPosts.map((post) => {
            const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
            const primaryCategory = post._embedded?.["wp:term"]?.[0]?.find(
              (term: Category | Tag) => term.taxonomy === "category"
            )

            return (
              <CarouselItem key={post.id}>
                <Link href={`/${primaryCategory?.slug || "uncategorized"}/${post.slug}`}>
                  <div className="relative h-80 cursor-pointer overflow-hidden border-2 border-foreground/90 bg-muted shadow-[4px_4px_0_0_var(--foreground)] sm:h-[420px]">
                    <img
                      src={featuredImage || "/placeholder.svg"}
                      alt={decode(post.title.rendered)}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-400 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="mb-3 inline-flex border-2 border-white/30 bg-white/15 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em]">
                        {primaryCategory?.name || "Uncategorized"}
                      </span>
                      <h3 className="text-balance font-display text-2xl font-bold italic leading-tight sm:text-4xl">
                        {decode(post.title.rendered)}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-white/80 sm:text-base">
                        {decode(post.excerpt.rendered.replace(/<[^>]*>/g, ""))}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <CarouselPrevious className="left-3 opacity-0 transition-opacity group-hover:opacity-100" />
        <CarouselNext className="right-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </Carousel>

      <div className="mt-5 flex justify-center gap-2">
        {sliderPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2.5 transition-all ${
              index === current ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
