"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight, Loader2, Filter, FileText } from "lucide-react";
import Image from "next/image";
import { searchPosts, getCategoriesClient } from "@/lib/wordpress";
import { cn } from "@/lib/utils";
import type { Post, Category } from "@/lib/wordpress.d";
import { decode } from "html-entities";

interface SearchToolbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchToolbar({ isOpen, onClose }: SearchToolbarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches and categories on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    getCategoriesClient().then(setCategories).catch(console.error);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        // If category is selected, we might need a different search function or filter client-side
        // Since searchPosts doesn't support category filter in the current implementation,
        // we'll search first then filter if needed, or update searchPosts to support it.
        // For now, let's just search.
        const posts = await searchPosts(query, 10);
        
        let filteredPosts = posts;
        if (selectedCategory) {
          filteredPosts = posts.filter(post => post.categories.includes(selectedCategory));
        }
        
        setResults(filteredPosts);
        
        // Save to recent searches if it's a valid search
        if (!recentSearches.includes(query) && query.length > 3) {
          const newRecent = [query, ...recentSearches].slice(0, 5);
          setRecentSearches(newRecent);
          localStorage.setItem("recentSearches", JSON.stringify(newRecent));
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, selectedCategory]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  const handleResultClick = (slug: string) => {
    handleClose();
    router.push(`/blog/${slug}`);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Toolbar */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl"
          >
            <div className="max-w-4xl mx-auto w-full">
              {/* Search Header */}
              <div className="flex items-center gap-4 p-4 h-20">
                <Search className="w-6 h-6 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for stories, places, or topics..."
                  className="flex-1 bg-transparent text-xl md:text-2xl font-medium placeholder:text-muted-foreground/50 focus:outline-none"
                />
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>

              {/* Categories Filter */}
              <div className="px-4 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                  )}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Results Area */}
              <div className="border-t border-border max-h-[70vh] overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : query ? (
                  <div className="p-4">
                    {results.length > 0 ? (
                      <div className="grid gap-4">
                        {results.map((post) => (
                          <button
                            key={post.id}
                            onClick={() => handleResultClick(post.slug)}
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left group"
                          >
                            <div className="relative w-24 h-16 md:w-32 md:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                                <Image
                                  src={post._embedded["wp:featuredmedia"][0].source_url}
                                  alt={decode(post.title.rendered)}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                  <FileText className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 
                                className="font-semibold text-foreground truncate group-hover:text-primary transition-colors"
                              >
                                {decode(post.title.rendered)}
                              </h3>
                              <div 
                                className="text-sm text-muted-foreground line-clamp-2 mt-1"
                              >
                                {decode(post.excerpt.rendered.replace(/<[^>]*>/g, ""))}
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        No results found for "{query}"
                      </div>
                    )}
                  </div>
                ) : (
                  // Recent Searches State
                  <div className="p-4">
                    {recentSearches.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3 px-2">
                          <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
                          <button 
                            onClick={clearRecent}
                            className="text-xs text-primary hover:underline"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="grid gap-2">
                          {recentSearches.map((term, i) => (
                            <button
                              key={i}
                              onClick={() => setQuery(term)}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left text-sm"
                            >
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-foreground">{term}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
