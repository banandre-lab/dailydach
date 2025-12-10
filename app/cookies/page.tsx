import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FluidBackground } from "@/components/ui/fluid-background";

export const metadata: Metadata = {
  title: "Cookie Policy | Tribitat",
  description: "Cookie Policy for Tribitat. Understand how and why we use cookies.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />
      
      <div className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">Cookie Policy</h1>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 glass-card p-8 md:p-12 rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md">
            <p className="lead text-xl text-muted-foreground">
              Last Updated: December 10, 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. What Are Cookies?</h2>
              <p>
                Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. How Tribitat Uses Cookies</h2>
              <p>
                When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li><strong>Essential Cookies:</strong> To enable certain functions of the Service, such as authentication and security.</li>
                <li><strong>Analytics Cookies:</strong> To provide analytics (e.g., Google Analytics) to help us understand how our Service is used and improve it.</li>
                <li><strong>Preferences Cookies:</strong> To store your preferences, such as theme settings.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Your Choices Regarding Cookies</h2>
              <p>
                If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
              </p>
              <p>
                Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. More Information</h2>
              <p>
                For more information about cookies, you can visit <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AllAboutCookies</a>.
              </p>
              <p>
                For more information about our privacy practices, please see our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}