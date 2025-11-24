"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Post } from "@/lib/wordpress.d";
import { BlogCard } from "./blog-card";

interface BlogGridProps {
  posts: Post[];
  categoryId?: number;
  tagId?: number;
  totalPages?: number;
  enableInfinite?: boolean;
}

export function BlogGrid({
  posts: initialPosts,
  categoryId,
  tagId,
  totalPages,
  enableInfinite = true,
}: BlogGridProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Keep local state in sync when server-provided posts change (e.g., pagination navigation)
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const loadMorePosts = useCallback(async () => {
    console.log(
      "loadMorePosts called, current page:",
      page,
      "categoryId:",
      categoryId,
      "tagId:",
      tagId
    );
    setIsLoading(true);
    try {
      const newPage = page + 1;
      console.log("Fetching page:", newPage);
      // Import the WordPress fetch function dynamically to avoid SSR issues
      const { getPostsPaginated } = await import("@/lib/wordpress");
      const filterParams: Record<string, any> = {};
      if (categoryId) {
        filterParams.category = categoryId.toString();
      }
      if (tagId) {
        filterParams.tag = tagId.toString();
      }
      console.log("Filter params:", filterParams);
      const response = await getPostsPaginated(newPage, 9, filterParams); // Load 9 more posts
      console.log("Response received, posts count:", response.data.length);
      setPosts((prev) => {
        const newPosts = [...prev, ...response.data];
        console.log("Total posts after update:", newPosts.length);
        return newPosts;
      });
      setPage(newPage);
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, categoryId, tagId]);

  useEffect(() => {
    if (!enableInfinite) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        console.log(
          "Intersection observer triggered:",
          entry.isIntersecting,
          "isLoading:",
          isLoading,
          "current page:",
          page,
          "total pages:",
          totalPages
        );
        if (
          entry.isIntersecting &&
          !isLoading &&
          totalPages &&
          page < totalPages
        ) {
          console.log("Loading more posts...");
          loadMorePosts();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (observerTarget.current && totalPages && page < totalPages) {
      console.log("Observing target element");
      observer.observe(observerTarget.current);
    }

    return () => {
      console.log("Disconnecting observer");
      observer.disconnect();
    };
  }, [isLoading, loadMorePosts, page, totalPages, enableInfinite]);

  const getColSpan = (index: number) => {
    // Pattern cycles: 2x2 big (row 1), 4x1 small (row 2), 3 cols with last big (row 3), then 3 normal (repeating)
    const patterns = [
      [2, 2], // Row 1: Two big columns (full width)
      [1, 1, 1, 1], // Row 2: Four small columns
      [1, 1, 2], // Row 3: Three columns, last one big
      [1, 1, 1], // Row 4+: Three regular columns (repeating)
      [1, 1, 1],
      [1, 1, 1],
      [2, 1, 1], // Row 7: Big on left, two small on right
      [1, 1, 1], // Row 8+: Back to three regular
      [1, 1, 1],
      [1, 1, 1],
    ];

    let flatIndex = 0;
    for (let patternIdx = 0; patternIdx < patterns.length; patternIdx++) {
      if (index < flatIndex + patterns[patternIdx].length) {
        const posInPattern = index - flatIndex;
        const spanValue = patterns[patternIdx][posInPattern];
        return spanValue === 2 ? "md:col-span-2" : "md:col-span-1";
      }
      flatIndex += patterns[patternIdx].length;
    }

    // After all patterns, repeat the 3-column pattern
    const finalPattern = [1, 1, 1];
    const posInFinal = (index - flatIndex) % finalPattern.length;
    return finalPattern[posInFinal] === 2 ? "md:col-span-2" : "md:col-span-1";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Section Title */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
          Discover Stories
        </h2>
        <p className="mt-2 text-muted-foreground text-lg">
          Explore our latest articles and insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max">
        {posts.map((post, index) => (
          <div key={post.id} className={getColSpan(index)}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-200"></div>
        </div>
      )}

      {/* Intersection observer target - only show if there are more pages */}
      {enableInfinite && totalPages && page < totalPages && (
        <div
          ref={observerTarget}
          className="h-20 mt-12 bg-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
