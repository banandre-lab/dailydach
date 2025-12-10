import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"
import "./globals.css"
import { CookieBanner } from "@/components/ui/cookie-banner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tribitat",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
        <GoogleAnalytics />
        <CookieBanner />
      </body>
    </html>
  )
}
