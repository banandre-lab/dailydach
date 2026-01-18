import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getAllTags } from "@/lib/wordpress";
import type { Tag } from "@/lib/wordpress.d";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Tags | Tribitat",
  description: "Explore our content through a cloud of topics and ideas. Browse all tags to find stories about sustainable travel, cultural experiences, and European destinations.",
  alternates: {
    canonical: "https://www.tribitat.com/tags",
  },
  openGraph: {
    title: "Discover Tags | Tribitat",
    description: "Explore our content through a cloud of topics and ideas. Browse all tags to find stories about sustainable travel, cultural experiences, and European destinations.",
    url: "/tags",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Tags | Tribitat",
    description: "Explore our content through a cloud of topics and ideas. Browse all tags to find stories about sustainable travel, cultural experiences, and European destinations.",
  },
};

export default async function TagsPage() {
  const tags = await getAllTags();
  
  // Sort by count (descending) to help with layout
  const sortedTags = tags.sort((a, b) => b.count - a.count);

  // Function to determine bubble size based on count
  const getBubbleSize = (count: number) => {
    if (count > 10) return "p-8 text-2xl md:text-3xl";
    if (count > 5) return "p-6 text-xl md:text-2xl";
    return "p-4 text-base md:text-lg";
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[80vh] flex flex-col items-center justify-center">
        <ScrollReveal direction="down">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Discover Tags
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our content through a cloud of topics and ideas.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
          {sortedTags.map((tag, index) => (
            <ScrollReveal key={tag.id} delay={index * 0.05} direction="up">
              <Link href={`/tag/${tag.slug}`} className="group">
                <div className={`
                  relative rounded-full flex items-center justify-center text-center
                  glass-card border-white/20 dark:border-white/10
                  transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50
                  ${getBubbleSize(tag.count)}
                  ${index % 3 === 0 ? "bg-primary/10" : index % 3 === 1 ? "bg-accent/10" : "bg-white/5"}
                `}>
                  <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                    #{tag.name}
                  </span>
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100">
                    {tag.count}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
