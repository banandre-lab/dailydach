import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogGrid } from "@/components/blog-grid";
import { PaginationControls } from "@/components/pagination-controls";
import { getPostsPaginated } from "@/lib/wordpress";
import type { Post } from "@/lib/wordpress.d";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { EuropeMap } from "@/components/europe-map";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories - Tribitat",
  description: "Browse real stories from around the world, shared in plain English.",
  openGraph: {
    title: "Stories - Tribitat",
    description: "Browse real stories from around the world, shared in plain English.",
    url: "https://www.tribitat.com/stories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stories - Tribitat",
    description: "Browse real stories from around the world, shared in plain English.",
  },
};

export default async function AllPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page, 10) || 1 : 1;
  const perPage = 12;

  const response = await getPostsPaginated(page, perPage);
  const posts: Post[] = response.data;
  const { totalPages } = response.headers;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />

      <ScrollReveal delay={0.2}>
        <section className="relative z-10 py-10">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              All Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore stories from across Europe
            </p>
          </div>
          <div className="w-full relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <EuropeMap />
          </div>
        </section>
      </ScrollReveal>

      <div className="relative z-10">
        <BlogGrid
          posts={posts}
          totalPages={totalPages}
          enableInfinite={false}
        />
      </div>

      <ScrollReveal direction="up" delay={0.2}>
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          buildHref={(p) => {
            const sp = new URLSearchParams();
            if (p > 1) sp.set("page", String(p));
            return `/stories${sp.toString() ? `?${sp.toString()}` : ""}`;
          }}
        />
      </ScrollReveal>

      <Footer />
    </main>
  );
}
