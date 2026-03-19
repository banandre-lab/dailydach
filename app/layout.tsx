import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Bungee, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"
import VercelAnalytics from "@/components/vercel-analytics"
import "./globals.css"
import { CookieBanner } from "@/components/ui/cookie-banner"
import { Toaster } from "sonner"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
})

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "DailyDach - Raw stories from the DACH region",
    template: "%s | DailyDach",
  },
  description: "Raw, skeptical, kuschelig stories from Austria, Germany, and Switzerland.",
  metadataBase: new URL("https://www.dailydach.com"),
  openGraph: {
    title: "DailyDach",
    description: "Raw, skeptical, kuschelig stories from Austria, Germany, and Switzerland.",
    url: "https://www.dailydach.com",
    siteName: "DailyDach",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DailyDach",
    description: "Raw, skeptical, kuschelig stories from Austria, Germany, and Switzerland.",
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
    name: "DailyDach",
    url: "https://www.dailydach.com",
    logo: "https://www.dailydach.com/opengraph-image",
    description: "Raw, skeptical, kuschelig stories from Austria, Germany, and Switzerland.",
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DailyDach",
    url: "https://www.dailydach.com",
    description: "Raw, skeptical, kuschelig stories from Austria, Germany, and Switzerland.",
    publisher: {
      "@type": "Organization",
      name: "DailyDach",
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
        className={`${bricolage.variable} ${bungee.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
