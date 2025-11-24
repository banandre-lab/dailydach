import { Header } from "@/components/header";
import { TopPostsSlider } from "@/components/top-posts-slider";
import { BlogGrid } from "@/components/blog-grid";
import { Footer } from "@/components/footer";
import { CountrySelector } from "@/components/country-selector";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPostsPaginated, getAllCategories } from "@/lib/wordpress";
import type { Post, Category } from "@/lib/wordpress.d";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CategoriesLiquidBridge } from "@/components/categories-liquid-bridge";
import { EuropeMap } from "@/components/europe-map";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch real data from WordPress API with embedded data
  const response = await getPostsPaginated(1, 10);
  const posts: Post[] = response.data;
  const { totalPages } = response.headers;

  const categories: Category[] = await getAllCategories();

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />
      <ScrollReveal delay={0.2}>
        <section className="relative z-10 py-10">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Real Stories in Plain English
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Language is not a barrier. Your story is heard.
            </p>
          </div>
          <div className="w-full relative">
             {/* Background Glow */}
             <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
             <EuropeMap />
          </div>
        </section>
      </ScrollReveal>
      
      <ScrollReveal delay={0.6}>
        <div className="relative z-10">
          <BlogGrid posts={posts} totalPages={totalPages} enableInfinite={false} />
        </div>
      </ScrollReveal>
      

         <ScrollReveal direction="up" delay={0.2}>
          <CountrySelector />
         </ScrollReveal>
      
      <Footer />
    </main>
  );
}

