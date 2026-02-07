import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import type { Category } from "@/lib/wordpress.d"
import { europeMapData } from "@/components/europe-map-data"

interface CategoriesLiquidBridgeProps {
  categories: Category[]
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const COUNTRY_SLUGS = new Set(europeMapData.map((country) => slugify(country.name)))

function getCoveredCountryCategories(categories: Category[]) {
  const matched = categories
    .filter((category) => {
      const slugMatch = COUNTRY_SLUGS.has(slugify(category.slug))
      const nameMatch = COUNTRY_SLUGS.has(slugify(category.name))
      return category.count > 0 && (slugMatch || nameMatch)
    })
    .sort((a, b) => b.count - a.count)

  if (matched.length > 0) {
    return matched
  }

  return categories
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
}

export function CategoriesLiquidBridge({ categories }: CategoriesLiquidBridgeProps) {
  const coveredCountries = getCoveredCountryCategories(categories)

  if (coveredCountries.length === 0) {
    return null
  }

  const totalStories = coveredCountries.reduce((sum, category) => sum + category.count, 0)

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-6 flex flex-col gap-2">
          <span className="section-kicker w-fit">Country Channels</span>
          <h2 className="headline-lg text-balance">Countries we cover now</h2>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Tap into local perspectives and follow stories by place.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="overflow-hidden border-2 border-foreground/90 bg-foreground/90 shadow-[6px_6px_0_0_var(--foreground)]">
          <div className="grid grid-cols-1 gap-px bg-foreground/90 sm:grid-cols-2 lg:grid-cols-3">
            {coveredCountries.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="group flex min-h-[150px] flex-col justify-between bg-card px-5 py-4 transition-colors hover:bg-primary dark:hover:bg-accent"
              >
                <div>
                  <p className="font-display text-2xl font-bold italic leading-tight text-foreground transition-colors group-hover:text-white dark:group-hover:text-white">
                    {category.name}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[0.64rem] font-black uppercase tracking-[0.1em]">
                  <span className="text-muted-foreground transition-colors group-hover:text-white/80 dark:group-hover:text-white/80">
                    {category.count} stories
                  </span>
                  <span className="text-primary transition-all group-hover:translate-x-1 group-hover:text-white dark:group-hover:text-white">
                    open &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t-2 border-foreground/90 bg-card px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[0.64rem] font-black uppercase tracking-[0.1em]">
              <span className="text-muted-foreground">Coverage snapshot</span>
              <span className="text-foreground">{coveredCountries.length} countries · {totalStories} stories</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
