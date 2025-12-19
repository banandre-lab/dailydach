import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getTagBySlug, getPostsByTagPaginated } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import { BlogGrid } from "@/components/blog-grid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { cache } from "react";

export const revalidate = 3600; // Revalidate every hour

// Cache tag lookup to avoid duplicate requests between generateMetadata and page component
const getCachedTag = cache(async (slug: string) => {
  return getTagBySlug(slug);
});

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getCachedTag(slug);

  if (!tag) {
    return {};
  }

  const canonicalUrl = `https://www.tribitat.com/tag/${tag.slug}`;

  return {
    title: `#${tag.name} - Tribitat`,
    description: `Browse stories tagged with #${tag.name} in plain English.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `#${tag.name} - Tribitat`,
      description: `Browse stories tagged with #${tag.name} in plain English.`,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tag.name} - Tribitat`,
      description: `Browse stories tagged with #${tag.name} in plain English.`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = await getCachedTag(slug);

  if (!tag) {
    notFound();
  }

  const response = await getPostsByTagPaginated(tag.id);
  const posts = response.data;
  const { totalPages } = response.headers;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/tags"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tags
        </Link>

        <ScrollReveal direction="down">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              #{tag.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {tag.description || `Explore stories and insights about ${tag.name}.`}
            </p>
          </div>
        </ScrollReveal>

        <BlogGrid 
          posts={posts} 
          tagId={tag.id}
          totalPages={totalPages}
        />
      </section>

      <Footer />
    </main>
  );
}
