import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Globe, BookOpen, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Tribitat",
  description: "Learn more about Tribitat and our mission to share real stories in plain English.",
  openGraph: {
    title: "About - Tribitat",
    description: "Learn more about Tribitat and our mission to share real stories in plain English.",
    url: "https://www.tribitat.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Tribitat",
    description: "Learn more about Tribitat and our mission to share real stories in plain English.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
            About <span className="text-primary">Tribitat</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connecting cultures through the power of storytelling.
          </p>
        </ScrollReveal>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-16 md:py-24 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center">
                 {/* Abstract representation of connection */}
                 <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
                 <div className="w-32 h-32 bg-primary/30 rounded-full blur-3xl absolute top-1/4 left-1/4" />
                 <div className="w-40 h-40 bg-accent/30 rounded-full blur-3xl absolute bottom-1/4 right-1/4" />
                 <h3 className="relative z-10 text-3xl font-bold text-foreground/80 text-center px-6">
                   "Language is not a barrier."
                 </h3>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Real Stories in Plain English
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Tribitat, we believe that everyone has a story worth telling. Our platform is designed to break down language barriers and bring authentic voices to the forefront.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're sharing a personal journey, a cultural insight, or a unique perspective on current events, Tribitat provides the space for your voice to be heard clearly and beautifully.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What drives us to build the best platform for storytellers and readers alike.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<BookOpen className="w-8 h-8 text-primary" />}
            title="Curated Stories"
            description="We hand-pick the most compelling narratives to ensure quality and relevance for our readers."
            delay={0.1}
          />
          <ValueCard 
            icon={<Sparkles className="w-8 h-8 text-primary" />}
            title="Insightful Articles"
            description="Deep dives into topics that matter, written with clarity and depth to spark meaningful conversation."
            delay={0.2}
          />
          <ValueCard 
            icon={<Globe className="w-8 h-8 text-primary" />}
            title="Fresh Perspectives"
            description="Voices from around the globe, offering unique viewpoints on culture, technology, and life."
            delay={0.3}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <ScrollReveal delay={1}>
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="absolute -top-[50%] -left-[10%] w-[50%] h-[100%] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
              Ready to Share Your Story?
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto relative z-10">
              Join our community of writers and share your unique perspective with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button asChild size="lg" className="rounded-full text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/submit-story">
                  Submit a Story <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 border-white/10 hover:bg-white/5 text-foreground">
                <Link href="/stories">
                  Explore Stories
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
}

function ValueCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-2xl h-full hover:border-primary/50 transition-colors duration-300 group">
        <div className="mb-6 p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </ScrollReveal>
  );
}
