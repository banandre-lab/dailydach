import { NextResponse } from "next/server";

import {
  getAllCategories,
  getAllTags,
  getPostsBatchForSitemap,
} from "@/lib/wordpress";
import { getCategoryPath, getPostPath } from "@/lib/urls";

import { siteConfig, sitemapConfig } from "../../config";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  image?: string;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const sitemapId = id.replace(/\.xml$/, "");

  try {
    let urls: SitemapUrl[] = [];

    if (sitemapId === "static") {
      urls = generateStaticUrls();
    } else if (sitemapId.startsWith("posts-")) {
      const batchIndex = Number.parseInt(sitemapId.replace("posts-", ""), 10);

      if (Number.isNaN(batchIndex) || batchIndex < 0) {
        return new NextResponse("Sitemap not found", { status: 404 });
      }

      urls = await generatePostUrls(batchIndex);
    } else if (sitemapId === "categories") {
      urls = await generateCategoryUrls();
    } else if (sitemapId === "tags") {
      urls = await generateTagUrls();
    } else {
      return new NextResponse("Sitemap not found", { status: 404 });
    }

    return new NextResponse(generateSitemapXml(urls), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `public, max-age=${sitemapConfig.revalidate}, s-maxage=${sitemapConfig.revalidate}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error(`Error generating sitemap ${sitemapId}:`, error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}

function generateStaticUrls(): SitemapUrl[] {
  const now = new Date().toISOString();

  return [
    {
      loc: siteConfig.url,
      lastmod: now,
      changefreq: "daily",
      priority: 1,
    },
    {
      loc: `${siteConfig.url}/stories`,
      lastmod: now,
      changefreq: "daily",
      priority: 0.9,
    },
    {
      loc: `${siteConfig.url}/tags`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      loc: `${siteConfig.url}/submit-story`,
      lastmod: now,
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      loc: `${siteConfig.url}/impressum`,
      lastmod: now,
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: `${siteConfig.url}/privacy`,
      lastmod: now,
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: `${siteConfig.url}/cookies`,
      lastmod: now,
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: `${siteConfig.url}/terms`,
      lastmod: now,
      changefreq: "yearly",
      priority: 0.3,
    },
  ];
}

async function generatePostUrls(batchIndex: number): Promise<SitemapUrl[]> {
  const offset = batchIndex * sitemapConfig.postsPerSitemap;
  const posts = await getPostsBatchForSitemap(offset, sitemapConfig.postsPerSitemap);

  return posts.map((post) => ({
    loc: `${siteConfig.url}${getPostPath(post.slug)}`,
    lastmod: new Date(post.modified || post.date).toISOString(),
    changefreq: "weekly",
    priority: 0.9,
    image: post.image,
  }));
}

async function generateCategoryUrls(): Promise<SitemapUrl[]> {
  const categories = await getAllCategories();
  const now = new Date().toISOString();

  return categories.map((category) => ({
    loc: `${siteConfig.url}${getCategoryPath(category.slug)}`,
    lastmod: now,
    changefreq: "daily",
    priority: 0.8,
  }));
}

async function generateTagUrls(): Promise<SitemapUrl[]> {
  const tags = await getAllTags();
  const now = new Date().toISOString();

  return [
    {
      loc: `${siteConfig.url}/tags`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.7,
    },
    ...tags.map((tag) => ({
      loc: `${siteConfig.url}/tag/${tag.slug}`,
      lastmod: now,
      changefreq: "weekly" as const,
      priority: 0.6,
    })),
  ];
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map((url) => {
      let entry = `  <url>
    <loc>${escapeXml(url.loc)}</loc>`;

      if (url.lastmod) {
        entry += `
    <lastmod>${url.lastmod}</lastmod>`;
      }

      if (url.changefreq) {
        entry += `
    <changefreq>${url.changefreq}</changefreq>`;
      }

      if (url.priority !== undefined) {
        entry += `
    <priority>${url.priority}</priority>`;
      }

      if (url.image) {
        entry += `
    <image:image>
      <image:loc>${escapeXml(url.image)}</image:loc>
    </image:image>`;
      }

      entry += `
  </url>`;
      return entry;
    })
    .join("\n");

  const namespaces = urls.some((url) => url.image)
    ? 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
    : 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${namespaces}>
${urlEntries}
</urlset>`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
