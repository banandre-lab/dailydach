import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogGrid } from "@/components/blog-grid";
import { PaginationControls } from "@/components/pagination-controls";
import { getPostsPaginated } from "@/lib/wordpress";
import type { Post } from "@/lib/wordpress.d";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <ScrollReveal direction="down">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance mb-6 tracking-tight">
              All Stories
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Explore our collection of articles, thoughts, and ideas.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <div className="relative z-10">
        <BlogGrid posts={posts} totalPages={totalPages} enableInfinite={false} />
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
