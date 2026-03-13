import { Metadata } from "next"
import Link from "next/link"
import { Mail, ArrowRight, Paperclip, FileText } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Submit Your Story | DailyDach",
  description:
    "Share your experiences, insights, and stories with the DailyDach community. Email us at story@dailydach.com.",
  alternates: {
    canonical: "https://www.dailydach.com/submit-story",
  },
  openGraph: {
    title: "Submit Your Story | DailyDach",
    description:
      "Share your experiences, insights, and stories with the DailyDach community.",
    url: "https://www.dailydach.com/submit-story",
    type: "website",
  },
}

export default function SubmitStoryPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-background">
      <Header />

      <section className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 lg:py-16">
        <div className="border-2 border-foreground/90 bg-card p-6 shadow-[6px_6px_0_0_var(--foreground)] sm:p-10">
          <span className="section-kicker mb-4">Submit to DailyDach</span>
          <h1 className="headline-lg mb-4 text-balance">Share your story with the world.</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Main goal: send us your story by email. Personal journeys, cultural insights, and grounded takes are all
            welcome.
          </p>

          <div className="mt-8 border-2 border-foreground/90 bg-background p-4 sm:p-6">
            <p className="mb-2 text-[0.64rem] font-black uppercase tracking-[0.1em] text-muted-foreground">
              Editorial inbox
            </p>
            <Link
              href="mailto:story@dailydach.com"
              className="inline-flex items-center gap-3 font-display text-3xl font-bold italic text-primary transition-colors hover:text-foreground sm:text-5xl"
            >
              <Mail className="size-8" />
              story@dailydach.com
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="mailto:story@dailydach.com"
              className="inline-flex items-center gap-2 border-2 border-foreground/90 bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.1em] text-primary-foreground shadow-[3px_3px_0_0_var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--foreground)]"
            >
              Open email client <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <MiniStep
            icon={<FileText className="size-4" />}
            title="Write your draft"
            description="Keep it clear and include context."
          />
          <MiniStep
            icon={<Paperclip className="size-4" />}
            title="Attach visuals"
            description="Photos/screenshots are optional."
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}

function MiniStep({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="border-2 border-foreground/90 bg-card p-4 shadow-[3px_3px_0_0_var(--foreground)]">
      <div className="mb-2 inline-flex items-center gap-2 text-[0.64rem] font-black uppercase tracking-[0.1em] text-muted-foreground">
        {icon}
        {title}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
