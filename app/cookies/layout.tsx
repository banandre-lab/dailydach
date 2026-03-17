import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 glass-card p-8 md:p-12 rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
