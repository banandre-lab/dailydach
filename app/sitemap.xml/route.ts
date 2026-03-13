import { NextResponse } from "next/server";

import { getNewestPostDateAtOffset, getPostCount } from "@/lib/wordpress";

import { siteConfig, sitemapConfig } from "../config";

interface SitemapEntry {
  url: string;
  lastmod: string;
}

export async function GET(): Promise<NextResponse> {
  const sitemaps: SitemapEntry[] = [];

  try {
    const totalPosts = await getPostCount();
    const numPostSitemaps = Math.ceil(totalPosts / sitemapConfig.postsPerSitemap);
    const batchDatePromises = Array.from({ length: numPostSitemaps }, (_, index) =>
      getNewestPostDateAtOffset(index * sitemapConfig.postsPerSitemap)
    );
    const batchDates = await Promise.all(batchDatePromises);
    const latestPostDate = batchDates[0] || new Date().toISOString();

    sitemaps.push({
      url: `${siteConfig.url}/sitemap/static.xml`,
      lastmod: latestPostDate,
    });

    for (let index = 0; index < numPostSitemaps; index++) {
      sitemaps.push({
        url: `${siteConfig.url}/sitemap/posts-${index}.xml`,
        lastmod: batchDates[index] || latestPostDate,
      });
    }

    sitemaps.push({
      url: `${siteConfig.url}/sitemap/categories.xml`,
      lastmod: latestPostDate,
    });

    sitemaps.push({
      url: `${siteConfig.url}/sitemap/tags.xml`,
      lastmod: latestPostDate,
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);

    const fallbackDate = new Date().toISOString();
    sitemaps.push({
      url: `${siteConfig.url}/sitemap/static.xml`,
      lastmod: fallbackDate,
    });
    sitemaps.push({
      url: `${siteConfig.url}/sitemap/categories.xml`,
      lastmod: fallbackDate,
    });
    sitemaps.push({
      url: `${siteConfig.url}/sitemap/tags.xml`,
      lastmod: fallbackDate,
    });
  }

  return new NextResponse(generateSitemapIndexXml(sitemaps), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": `public, max-age=${sitemapConfig.revalidate}, s-maxage=${sitemapConfig.revalidate}, stale-while-revalidate`,
    },
  });
}

function generateSitemapIndexXml(sitemaps: SitemapEntry[]): string {
  const entries = sitemaps
    .map(
      ({ url, lastmod }) => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
  </sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}
