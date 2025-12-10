import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FluidBackground } from "@/components/ui/fluid-background";

export const metadata: Metadata = {
  title: "Terms of Service | Tribitat",
  description: "Terms of Service for Tribitat. Read our terms regarding user-submitted stories, content ownership, and liability.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />
      
      <div className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">Terms of Service</h1>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 glass-card p-8 md:p-12 rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md">
            <p className="lead text-xl text-muted-foreground">
              Last Updated: December 10, 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Tribitat ("we," "our," "us," or "the Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. User-Submitted Stories</h2>
              <h3 className="text-xl font-medium mb-2">2.1 Submission and Grant of Rights</h3>
              <p>
                Tribitat allows users to submit stories, articles, and other content ("User Content"). By submitting User Content to us, you grant Tribitat a worldwide, non-exclusive, royalty-free, perpetual, irrevocable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content throughout the world in any media.
              </p>
              <h3 className="text-xl font-medium mb-2 mt-4">2.2 Responsibility for Content</h3>
              <p>
                <strong>You are solely responsible for the User Content you submit.</strong> You represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li>You own or control all rights in and to the User Content and have the right to grant the license granted above.</li>
                <li>Your User Content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.</li>
                <li>Your User Content is not libelous, defamatory, obscene, pornographic, abusive, or otherwise illegal.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. Disclaimer of Liability</h2>
              <p>
                <strong>Tribitat acts as a platform for distribution and does not guarantee the accuracy, integrity, or quality of User Content.</strong> We do not endorse any User Content or any opinion, recommendation, or advice expressed therein. We expressly disclaim any and all liability in connection with User Content.
              </p>
              <p>
                We reserve the right, but have no obligation, to review, screen, refuse, or remove any User Content at our sole discretion at any time and for any reason or no reason, without notice to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Prohibited Conduct</h2>
              <p>You agree not to use the Site to:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li>Upload or transmit any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.</li>
                <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                <li>Violate any applicable local, state, national, or international law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. Intellectual Property</h2>
              <p>
                The Site and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of Tribitat and its licensors. The Site is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">6. DMCA / Copyright Infringement</h2>
              <p>
                We respect the intellectual property rights of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please contact us at <strong>legal@tribitat.com</strong> with the subject line "Copyright Infringement" and include a description of the alleged infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">7. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">8. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <strong>legal@tribitat.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}