"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Post, Category, Tag } from "@/lib/wordpress.d";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { decode } from "html-entities";

interface TopPostsSliderProps {
  posts: Post[];
}

export function TopPostsSlider({ posts }: TopPostsSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Get top 5 posts for the slider
  const sliderPosts = posts.slice(0, 5);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (sliderPosts.length === 0) return null;

  return (
    <section className="bg-card border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Top Posts of the Week
          </h2>
          <div className="h-1 w-16 bg-accent rounded-full"></div>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          className="relative group"
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {sliderPosts.map((post, index) => {
              const featuredImage =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const primaryCategory = post._embedded?.["wp:term"]?.[0]?.find(
                (term: Category | Tag) => term.taxonomy === "category"
              );

              return (
                <CarouselItem key={post.id}>
                  <Link href={`/${primaryCategory?.slug || "uncategorized"}/${post.slug}`}>
                    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-muted cursor-pointer">
                      {/* Image */}
                      <img
                        src={featuredImage || "/placeholder.svg"}
                        alt={decode(post.title.rendered)}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                            {primaryCategory?.name || "Uncategorized"}
                          </span>
                          <span className="text-sm font-medium opacity-80">
                            Week's Pick
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold mb-2 line-clamp-2">
                          {decode(post.title.rendered)}
                        </h3>
                        <p className="text-sm md:text-base opacity-90 line-clamp-2">
                          {decode(post.excerpt.rendered.replace(/<[^>]*>/g, ""))}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-accent text-white hover:text-accent-foreground border-0" />
          <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-accent text-white hover:text-accent-foreground border-0" />
        </Carousel>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-6">
          {sliderPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === current - 1
                  ? "bg-accent w-8"
                  : "bg-muted hover:bg-muted-foreground w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
