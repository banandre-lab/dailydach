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
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getPostsPaginated,
  getAllPostSlugs,
  getTagsByPost,
} from "@/lib/wordpress";
import type { Post } from "@/lib/wordpress.d";
import type { Metadata } from "next";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { decode } from "html-entities";

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
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  // Strip HTML tags for description
  const description = decode(post.excerpt.rendered.replace(/<[^>]*>/g, "").trim());

  // Get category info for URL
  const category = await getCategoryById(post.categories[0]);

  // Get featured image if it exists
  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;

  const imageUrl = featuredMedia?.source_url || 'https://www.tribitat.com/opengraph-image';

  return {
    title: decode(post.title.rendered),
    description: description,
    openGraph: {
      title: decode(post.title.rendered),
      description: description,
      url: `https://www.tribitat.com/${category.slug}/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: ['Tribitat'],
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
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related data individually (more reliable than embedded data)
  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = await getAuthorById(post.author);
  const category = await getCategoryById(post.categories[0]);
  const tags = post.tags.length > 0 ? await getTagsByPost(post.id) : [];

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Fetch related posts (same category, excluding current post)
  const relatedResponse = await getPostsPaginated(1, 4, {
    categories: post.categories[0],
  });
  const relatedPostsList = relatedResponse.data
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />

      {/* Hero Section */}
      <ScrollReveal direction="down">
        <div className="relative w-full group mb-12">
          {/* Hero Image */}
          <div className="relative h-[50vh] min-h-[400px] md:h-[600px] overflow-hidden rounded-b-[3rem] shadow-2xl">
            <img
              src={featuredMedia?.source_url || "/placeholder.svg"}
              alt={decode(post.title.rendered)}
              className="absolute inset-0 w-full h-full object-cover animate-zoom-in"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-lg font-bold border border-white/30">
                    {author.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      {author.name}
                    </span>
                    <span className="text-xs text-white/70">Author</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Breadcrumb & Meta */}
        <ScrollReveal delay={0.2}>
          <Breadcrumb className="mb-8 flex justify-center">
            <BreadcrumbList className="bg-white/50 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 dark:border-white/10 shadow-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${category.slug}`}>{category.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[200px] truncate">
                  {decode(post.title.rendered)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ScrollReveal>

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
                <Badge key={tag.id} variant="secondary" className="text-sm px-3 py-1 hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer">
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </ScrollReveal>
        )}
      </article>

      {/* Related Posts */}
      <div className="relative z-10 bg-muted/30 py-16 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
             <RelatedPosts posts={relatedPostsList} currentSlug={post.slug} />
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      <Footer />
    </main>
  );
}
