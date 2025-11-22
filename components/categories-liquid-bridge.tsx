import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { Category } from "@/lib/wordpress.d";

interface CategoriesLiquidBridgeProps {
  categories: Category[];
}

export function CategoriesLiquidBridge({ categories }: CategoriesLiquidBridgeProps) {
  // Sort by count (descending) and take top 7
  const topCategories = categories
    .sort((a, b) => b.count - a.count)
    .slice(0, 7);

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <ScrollReveal direction="down">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Explore Topics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive into our most popular categories and discover stories that matter to you.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {/* Connecting Lines (Visual "Bridge" Effect) */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M200,150 C400,150 400,400 600,400" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
            <path d="M600,400 C800,400 800,150 1000,150" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
          </svg>
        </div>

        {topCategories.map((category, index) => (
          <ScrollReveal key={category.id} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
            <Link href={`/category/${category.slug}`} className="block group h-full">
              <div className={`
                relative overflow-hidden rounded-3xl p-8 h-full min-h-[240px] flex flex-col justify-between
                glass-card border-white/20 dark:border-white/10
                transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20
                ${index === 0 ? "lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-primary/20 to-accent/20" : "bg-white/5"}
              `}>
                {/* Decorative Blob */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-foreground/80 mb-4 border border-white/10">
                    {category.count} Articles
                  </span>
                  <h3 className={`${index === 0 ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"} font-bold text-foreground mb-2 group-hover:text-primary transition-colors`}>
                    {category.name}
                  </h3>
                </div>

                <div className="relative z-10 mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    Explore Category <span className="text-xl">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
