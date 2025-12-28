import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ShareButtons } from "@/components/share-buttons";
import { RelatedPosts } from "@/components/related-posts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPostsByTags,
} from "@/lib/wordpress";
import type { Post, RelatedPost } from "@/lib/wordpress.d";
import type { Metadata } from "next";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { decode } from "html-entities";
import { cache } from "react";

// Cache post fetching to avoid duplicate requests between generateMetadata and page component
const getCachedPost = cache(async (slug: string) => {
  return getPostBySlug(slug);
});

export const revalidate = 3600; // Revalidate every hour

interface BlogPostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedPost(slug);

  if (!post) {
    return {};
  }

  // Strip HTML tags for description
  const description = decode(
    post.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
  );

  // Extract embedded data (already included in post response)
  const category = post._embedded?.["wp:term"]?.[0]?.[0];
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0] || null;

  if (!category) {
    return {};
  }

  const imageUrl =
    featuredMedia?.source_url || "https://www.tribitat.com/opengraph-image";

  const canonicalUrl = `https://www.tribitat.com/${category.slug}/${post.slug}`;

  return {
    title: decode(post.title.rendered),
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: decode(post.title.rendered),
      description: description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: ["Tribitat"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: decode(post.title.rendered),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: decode(post.title.rendered),
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category: categorySlug, slug } = await params;

  // Fetch the post by slug
  const post = await getCachedPost(slug);

  if (!post) {
    notFound();
  }

  // Extract embedded data from post (already included in _embed response)
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0] || null;
  const category = post._embedded?.["wp:term"]?.[0]?.[0]; // First array is categories
  const tags = post._embedded?.["wp:term"]?.[1] || []; // Second array is tags

  if (!category) {
    notFound();
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Fetch related posts using tags
  let relatedPostsList: RelatedPost[] = [];
  if (tags.length > 0) {
    const tagSlugs = tags.map((tag) => tag.slug);
    const relatedResponse = await getRelatedPostsByTags(tagSlugs, 3, [post.id]);
    relatedPostsList = relatedResponse.posts;
  }

  // Prepare JSON-LD structured data for SEO
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: decode(post.title.rendered),
    description: decode(post.excerpt.rendered.replace(/<[^>]*>/g, "").trim()),
    image:
      featuredMedia?.source_url || "https://www.tribitat.com/opengraph-image",
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Organization",
      name: "Tribitat",
    },
    publisher: {
      "@type": "Organization",
      name: "Tribitat",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tribitat.com/opengraph-image",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.tribitat.com/${category.slug}/${post.slug}`,
    },
    keywords: tags.map((tag) => tag.name).join(", "),
  };

  // BreadcrumbList JSON-LD for better search result display
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.tribitat.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `https://www.tribitat.com/${category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: decode(post.title.rendered),
        item: `https://www.tribitat.com/${category.slug}/${post.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* JSON-LD structured data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* JSON-LD structured data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <FluidBackground />
      <Header />

      {/* Hero Section */}
      <ScrollReveal direction="down">
        <div className="relative w-full group mb-0">
          {/* Hero Image */}
          <div className="relative h-[50vh] min-h-[400px] md:h-[600px] overflow-hidden">
            <img
              src={featuredMedia?.source_url || "/placeholder.svg"}
              alt={decode(post.title.rendered)}
              className="absolute inset-0 w-full h-full object-cover animate-zoom-in"
            />

            {/* Overlay Gradient - Enhanced fade to content */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-background"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 text-white max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold rounded-full shadow-lg">
                  {category.name}
                </span>
                <span className="text-white/80 text-sm font-medium backdrop-blur-sm px-2 py-1 rounded-md">
                  {date}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance drop-shadow-lg">
                {decode(post.title.rendered)}
              </h1>

              {/* Breadcrumbs moved here to avoid overlap and always stay under title */}
              <ScrollReveal delay={0.2}>
                <Breadcrumb className="flex justify-start">
                  <BreadcrumbList className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white/90 shadow-lg">
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        asChild
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <Link href="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-white/40" />
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        asChild
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <Link href={`/${category.slug}`}>{category.name}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-white/40" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="max-w-[200px] truncate text-white font-medium">
                        {decode(post.title.rendered)}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-12 pb-12 relative z-10">
        <ScrollReveal delay={0.3}>
          <div className="flex justify-end mb-8">
            <ShareButtons
              title={decode(post.title.rendered)}
              url={`/${category.slug}/${post.slug}`}
            />
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <ScrollReveal delay={0.4}>
          <div className="blog-post-content prose prose-lg prose-stone dark:prose-invert max-w-none text-foreground leading-relaxed mb-16 prose-headings:font-bold prose-headings:tracking-tight prose-p:text-lg prose-p:leading-8 prose-img:rounded-2xl prose-img:shadow-xl">
            {/* Render WordPress content directly */}
            {post.content.rendered && (
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content.rendered,
                }}
              />
            )}
          </div>
        </ScrollReveal>

        {/* Tags */}
        {tags.length > 0 && (
          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
              {tags.map((tag) => (
                <Link key={tag.id} href={`/tag/${tag.slug}`}>
                  <Badge
                    variant="secondary"
                    className="text-sm px-3 py-1 hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
                  >
                    #{tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        )}
      </article>

      {/* Related Posts */}
      <div className="relative z-10 bg-muted/30 py-16 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <RelatedPosts posts={relatedPostsList} />
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      <Footer />
    </main>
  );
}
