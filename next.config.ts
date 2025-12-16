import type { NextConfig } from "next";

const nextConfig = {
  // Allow more time for slow external data sources during SSG
  staticPageGenerationTimeout: 180,
  // Empty turbopack config to silence warning
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: process.env.WORDPRESS_PROTOCOL || "https",
        hostname: process.env.WORDPRESS_HOSTNAME || "www.tribitat.com",
        port: process.env.WORDPRESS_PORT || "",
        pathname: process.env.WORDPRESS_PATHNAME || "/wp-content/uploads/**",
      },
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

export default nextConfig;
