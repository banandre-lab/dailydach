import { siteConfig } from "@/app/config"
import type { Category, Post } from "@/lib/wordpress.d"

export function getPostPath(slug: string): string {
  return `/${slug}`
}

export function getPostUrl(slug: string): string {
  return `${siteConfig.url}${getPostPath(slug)}`
}

export function getCategoryPath(slug: string): string {
  return `/stories/${slug}`
}

export function getCategoryUrl(slug: string): string {
  return `${siteConfig.url}${getCategoryPath(slug)}`
}

export function getTagPath(slug: string): string {
  return `/tag/${slug}`
}

export function getTagUrl(slug: string): string {
  return `${siteConfig.url}${getTagPath(slug)}`
}

export function getPostCategories(post: Pick<Post, "_embedded">): Category[] {
  const seen = new Set<number>()
  const terms = post._embedded?.["wp:term"]?.flat() ?? []

  return terms.reduce<Category[]>((categories, term) => {
    if (term.taxonomy !== "category" || seen.has(term.id)) {
      return categories
    }

    seen.add(term.id)
    categories.push(term as Category)
    return categories
  }, [])
}

export function getPrimaryCategory(post: Pick<Post, "slug" | "_embedded">): Category | undefined {
  return getPostCategories(post)[0]
}
