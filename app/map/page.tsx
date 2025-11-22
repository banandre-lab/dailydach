import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { EuropeMap } from "@/components/europe-map";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
        <ScrollReveal direction="down">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              European Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore articles from across Europe. Hover over a country to discover stories.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative w-full h-full flex items-center justify-center rounded-3xl glass-card border-white/10 p-4 md:p-8 overflow-hidden">
           {/* Background Glow */}
           <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
           
           <EuropeMap />
        </div>
      </section>

      <Footer />
    </main>
  );
}
