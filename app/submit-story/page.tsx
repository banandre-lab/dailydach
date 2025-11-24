import { SubmitStoryForm } from "@/components/submit-story-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Your Story | Tribitat",
  description: "Share your experiences, insights, and stories with the Tribitat community.",
};

export default function SubmitStoryPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-12 md:mb-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Share Your Story
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Have a unique perspective or an inspiring experience? We'd love to hear from you. 
            Submit your story below and become a part of our growing community.
          </p>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <SubmitStoryForm />
        </div>
      </section>
    </main>
  );
}
