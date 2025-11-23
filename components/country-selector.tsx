import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllCategories } from "@/lib/wordpress";
import type { Category } from "@/lib/wordpress.d";

// Color palette for categories using theme colors
const colorPalette = [
  "from-chart-1 to-chart-1/80",
  "from-chart-2 to-chart-2/80",
  "from-chart-3 to-chart-3/80",
  "from-chart-4 to-chart-4/80",
  "from-chart-5 to-chart-5/80",
  "from-primary to-primary/80",
  "from-accent to-accent/80",
  "from-secondary to-secondary/80",
];

export async function CountrySelector() {
  const categories = await getAllCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Section Title */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
          Explore by Category
        </h2>
        <p className="mt-2 text-muted-foreground text-lg">
          Discover stories from different topics
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.slice(0, 8).map((category, index) => {
          const color = colorPalette[index % colorPalette.length];

          return (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl h-48 md:h-56 cursor-pointer"
            >
              {/* Background image with gradient overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-primary-foreground">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-balance group-hover:translate-x-1 transition-transform duration-300">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm opacity-80 mt-2 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Arrow icon */}
                <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm font-semibold">Explore</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-primary-foreground opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
