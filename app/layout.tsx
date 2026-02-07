import type React from "react"
import type { Metadata } from "next"
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"
import VercelAnalytics from "@/components/vercel-analytics"
import "./globals.css"
import { CookieBanner } from "@/components/ui/cookie-banner"
import { Toaster } from "sonner"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tribitat",
    url: "https://www.tribitat.com",
    logo: "https://www.tribitat.com/opengraph-image",
    description: "Real Stories in Plain English",
    sameAs: ["https://twitter.com/tribitat"],
  }

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
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} ${dmMono.variable} font-sans antialiased`}
      >
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
