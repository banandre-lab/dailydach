import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FluidBackground } from "@/components/ui/fluid-background";
import { getAllCategories } from "@/lib/wordpress";
import { CategoriesLiquidBridge } from "@/components/categories-liquid-bridge";

export const revalidate = 3600; // Revalidate every hour

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FluidBackground />
      <Header />
      
      <div className="min-h-[80vh] flex flex-col justify-center">
        <CategoriesLiquidBridge categories={categories} />
      </div>

      <Footer />
    </main>
  );
}

