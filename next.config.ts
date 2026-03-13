import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const wordpressPort = process.env.WORDPRESS_PORT;

const wordpressRemotePattern = {
  protocol: (process.env.WORDPRESS_PROTOCOL || "https") as "http" | "https",
  hostname: process.env.WORDPRESS_HOSTNAME || "www.dailydach.com",
  ...(wordpressPort && { port: wordpressPort }),
  pathname: process.env.WORDPRESS_PATHNAME || "/wp-content/uploads/**",
};

const nextConfig: NextConfig = {
  // Disable X-Powered-By header for security
  poweredByHeader: false,
  // Configure pageExtensions to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Allow more time for slow external data sources during SSG
  staticPageGenerationTimeout: 180,
  // Reduce pressure on external APIs during prerender and retry failed pages.
  experimental: {
    staticGenerationRetryCount: 3,
    staticGenerationMaxConcurrency: 4,
  },
  // Empty turbopack config to silence warning
  turbopack: {},
  images: {
    remotePatterns: [
      wordpressRemotePattern,
      {
        protocol: "http",
        hostname: "localhost",
        port: "9999",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9999",
        pathname: "/wp-content/uploads/**",
      },
    ],
    // Cloudflare Workers doesn't support Next.js Image Optimization API
    unoptimized: true,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
