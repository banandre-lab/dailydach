import { Metadata } from "next";
import Link from "next/link";
import { Mail, FileText, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FluidBackground } from "@/components/ui/fluid-background";

export const metadata: Metadata = {
  title: "Submit Your Story | Tribitat",
  description:
    "Share your experiences, insights, and stories with the Tribitat community. Email us at story@tribitat.com.",
};

export default function SubmitStoryPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-background">
      <FluidBackground />
      <Header />
      
      <div className="w-full flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10 py-12">
        <div className="max-w-3xl w-full space-y-12 text-center">
          {/* Header Section */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Share Your Story
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed text-balance">
              Have a unique perspective or an inspiring experience? We'd love to
              hear from you. Become a part of our growing community.
            </p>
          </div>

          {/* Main Action Card */}
          <div className="glass-card p-8 md:p-12 rounded-[2rem] flex flex-col items-center gap-8 max-w-2xl mx-auto border border-white/10 bg-card/30 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-4 w-full">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Send your submission to
              </p>
              <Link
                href="mailto:story@tribitat.com"
                className="block text-3xl md:text-5xl font-bold text-foreground hover:text-primary transition-colors break-words"
              >
                story@tribitat.com
              </Link>
            </div>

            <div className="w-full h-px bg-border/50" />

            {/* Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-secondary/30 border border-border/50">
                <FileText className="w-6 h-6 text-foreground/70" />
                <div className="text-center">
                  <h3 className="font-semibold mb-1">Write your story</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your experience in detail
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-secondary/30 border border-border/50">
                <ImageIcon className="w-6 h-6 text-foreground/70" />
                <div className="text-center">
                  <h3 className="font-semibold mb-1">Attach media</h3>
                  <p className="text-sm text-muted-foreground">
                    Include photos or documents
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="mailto:story@tribitat.com"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4 mt-2"
            >
              Open your email client <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full relative z-10">
        <Footer />
      </div>
    </main>
  );
}
