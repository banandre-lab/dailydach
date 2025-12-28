import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const wordpressPort = process.env.WORDPRESS_PORT;

if (!process.env.RESEND_API_KEY) {
  throw new Error("Abort: You need to define RESEND_API_KEY in the .env file.");
}

if (!process.env.RESEND_SEGEMENT_ID) {
  throw new Error(
    "Abort: You need to define RESEND_SEGEMENT_ID in the .env file."
  );
}

if (!process.env.SUBSCRIPTION_SALT) {
  throw new Error(
    "Abort: You need to define SUBSCRIPTION_SALT in the .env file."
  );
}

const wordpressRemotePattern = {
  protocol: (process.env.WORDPRESS_PROTOCOL || "https") as "http" | "https",
  hostname: process.env.WORDPRESS_HOSTNAME || "www.tribitat.com",
  ...(wordpressPort && { port: wordpressPort }),
  pathname: process.env.WORDPRESS_PATHNAME || "/wp-content/uploads/**",
};

const nextConfig: NextConfig = {
  // Configure pageExtensions to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Allow more time for slow external data sources during SSG
  staticPageGenerationTimeout: 180,
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
