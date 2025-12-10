import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FluidBackground } from "@/components/ui/fluid-background";

export const metadata: Metadata = {
  title: "Privacy Policy | Tribitat",
  description: "Privacy Policy for Tribitat. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />
      
      <div className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">Privacy Policy</h1>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 glass-card p-8 md:p-12 rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md">
            <p className="lead text-xl text-muted-foreground">
              Last Updated: December 10, 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Introduction</h2>
              <p>
                Welcome to Tribitat ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal data is handled in compliance with applicable laws, including the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA) and applicable US state laws.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>tribitat.com</strong> and use our services, including reading stories and submitting your own content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Information We Collect</h2>
              <h3 className="text-xl font-medium mb-2">2.1 Personal Data You Provide</h3>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li>
                  <strong>Newsletter Subscription:</strong> When you subscribe to our newsletter, we collect your email address.
                </li>
                <li>
                  <strong>Story Submissions:</strong> When you submit a story, we collect your name (or pseudonym), email address, and the content of your story.
                </li>
                <li>
                  <strong>Contact:</strong> If you contact us directly, we may receive your name, email address, and the contents of your message.
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-4">2.2 Data Automatically Collected</h3>
              <p>
                We automatically collect certain information when you visit, use, or navigate the Site. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our Site.
              </p>
              <p>
                This information is primarily needed to maintain the security and operation of our Site, and for our internal analytics and reporting purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. How We Use Your Information</h2>
              <p>We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li>To provide and deliver our services, including publishing your stories.</li>
                <li>To send you our newsletter and marketing communications (you can opt-out at any time).</li>
                <li>To respond to your inquiries and offer support.</li>
                <li>To protect our Site and enforce our Terms of Service.</li>
                <li>To analyze usage patterns and improve our user experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Sharing Your Information</h2>
              <p>
                We do not sell your personal information. We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li><strong>Service Providers:</strong> We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., email delivery, hosting, analytics).</li>
                <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">6. Your Rights (GDPR & US Laws)</h2>
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li><strong>Right to Access:</strong> You have the right to request copies of your personal data.</li>
                <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data ("Right to be Forgotten").</li>
                <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
                <li><strong>Right to Object:</strong> You have the right to object to our processing of your personal data.</li>
                <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <strong>privacy@tribitat.com</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">7. Data Security</h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">8. User-Submitted Stories</h2>
              <p>
                When you submit a story to Tribitat, you acknowledge that the content may be published publicly. While we respect your privacy, the nature of publishing means that the content of your story will be public. Please do not include sensitive personal information in your story content that you do not wish to be public.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">9. Contact Us</h2>
              <p>
                If you have questions or comments about this policy, you may email us at <strong>privacy@tribitat.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}