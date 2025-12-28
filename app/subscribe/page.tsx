import { getAllCategories } from "@/lib/wordpress";
import { SubscriptionForm } from "@/components/subscription-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { verifySubscriptionHash } from "@/lib/security";

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string;
    hash?: string;
    unsubscribe?: string;
  }>;
}) {
  const { email, hash, unsubscribe } = await searchParams;
  const categories = await getAllCategories();

  const isVerified =
    email && hash ? verifySubscriptionHash(email, hash) : false;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {unsubscribe === "true" && isVerified
                ? "Unsubscribe"
                : "Stay in the Loop"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {unsubscribe === "true" && isVerified
                ? "We're sorry to see you go. Confirm your email below to unsubscribe."
                : "Subscribe to our newsletter and get the latest stories delivered directly to your inbox."}
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            <Suspense
              fallback={
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              }
            >
              <SubscriptionForm
                categories={categories}
                isVerified={isVerified}
                initialUnsubscribe={unsubscribe === "true"}
              />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
