import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PaginationControls } from "@/components/pagination-controls";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoryBySlug, getPostsPaginated } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import type { Post } from "@/lib/wordpress.d";
import { TopPostsSlider } from "@/components/top-posts-slider";
import { getCountryTheme } from "@/lib/country-themes";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BlogCard } from "@/components/blog-card";

import { CountryBackgroundShape } from "@/components/country-background-shape";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category: slug } = await params;
  const sp = await searchParams;
  const page = sp?.page ? parseInt(sp.page, 10) || 1 : 1;
  const perPage = 13; // Fetch 13 posts: 5 for slider (if page 1) + 8 for grid

  // Fetch the category by slug
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Get country theme
  const theme = getCountryTheme(slug);

  // Fetch posts
  const response = await getPostsPaginated(page, perPage, {
    category: category.id.toString(),
  });
  
  const allPosts: Post[] = response.data;
  const { totalPages } = response.headers;

  // Split posts for slider and grid
  // Only show slider on first page
  const showSlider = page === 1;
  const sliderPosts = showSlider ? allPosts.slice(0, 5) : [];
  const gridPosts = showSlider ? allPosts.slice(5) : allPosts;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section with Theme Vibe - Applied only here */}
      <div className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        {/* Background Elements */}
        <CountryBackgroundShape slug={slug} color={theme.primary} />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 font-medium backdrop-blur-sm px-3 py-1 rounded-full bg-white/10 border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <ScrollReveal direction="down">
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                {category.name}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl font-light leading-relaxed">
                {category.description || `Explore stories and insights from ${category.name}.`}
              </p>
            </div>
          </ScrollReveal>

          {/* Top Posts Slider (Only on Page 1) */}
          {showSlider && sliderPosts.length > 0 && (
            <ScrollReveal delay={0.2}>
              <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <TopPostsSlider posts={sliderPosts} />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {gridPosts.map((post, index) => {
             // Make every 4th item span 2 columns for visual interest (masonry-ish)
             const isLarge = (index % 7 === 0 || index % 7 === 4) && index !== gridPosts.length - 1;
             
             return (
               <BlogCard 
                 key={post.id} 
                 post={post} 
                 index={index} 
                 featured={isLarge} 
               />
             );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-16">
          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            buildHref={(p) => {
              const sp = new URLSearchParams();
              if (p > 1) sp.set("page", String(p));
              return `/${slug}${sp.toString() ? `?${sp.toString()}` : ""}`;
            }}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
