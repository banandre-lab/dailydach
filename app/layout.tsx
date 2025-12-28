import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"
import VercelAnalytics from "@/components/vercel-analytics"
import "./globals.css"
import { CookieBanner } from "@/components/ui/cookie-banner"
import { Toaster } from "sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Tribitat - Real Stories in Plain English",
    template: "%s | Tribitat",
  },
  description: "Real Stories in Plain English",
  metadataBase: new URL("https://www.tribitat.com"),
  openGraph: {
    title: "Tribitat",
    description: "Real Stories in Plain English",
    url: "https://www.tribitat.com",
    siteName: "Tribitat",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tribitat",
    description: "Real Stories in Plain English",
    site: "@tribitat",
    creator: "@tribitat",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD structured data for Organization and Website
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tribitat",
    url: "https://www.tribitat.com",
    logo: "https://www.tribitat.com/opengraph-image",
    description: "Real Stories in Plain English",
    sameAs: [
      "https://twitter.com/tribitat",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tribitat",
    url: "https://www.tribitat.com",
    description: "Real Stories in Plain English",
    publisher: {
      "@type": "Organization",
      name: "Tribitat",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD structured data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* JSON-LD structured data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <VercelAnalytics />
        </ThemeProvider>
        <GoogleAnalytics />
        <CookieBanner />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
