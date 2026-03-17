"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Category } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";

interface SubscriptionFormProps {
  categories?: Category[];
  isVerified?: boolean;
  initialUnsubscribe?: boolean;
}

export function SubscriptionForm({
  categories = [],
  isVerified = false,
  initialUnsubscribe = false,
}: SubscriptionFormProps) {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [isUnsubscribeMode, setIsUnsubscribeMode] =
    useState(initialUnsubscribe);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam && isVerified) {
      setEmail(emailParam);
    }
  }, [searchParams, isVerified]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    categories.map((c) => c.id)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((c) => c.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const categoryNames = categories
        .filter((c) => selectedCategories.includes(c.id))
        .map((c) => c.name);

      const endpoint = isUnsubscribeMode
        ? "/api/unsubscribe"
        : "/api/subscribe";
      const hash = searchParams.get("hash");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          categories: isUnsubscribeMode ? [] : categoryNames,
          hash: isVerified ? hash : undefined,
        }),
      });

      if (!response.ok) throw new Error("Operation failed");

      setIsSuccess(true);
      toast.success(
        isUnsubscribeMode
          ? "Successfully unsubscribed."
          : "Successfully subscribed!"
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">
          {isUnsubscribeMode ? "Unsubscribed" : "You're subscribed!"}
        </h3>
        <p className="text-muted-foreground">
          {isUnsubscribeMode
            ? "You have been removed from our mailing list."
            : "Check your inbox for a welcome email from us soon."}
        </p>
        {!isUnsubscribeMode && (
          <Button
            variant="outline"
            onClick={() => {
              setIsSuccess(false);
              setEmail("");
            }}
            className="mt-4 rounded-full"
          >
            Subscribe another email
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="email" className="text-lg font-semibold">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isVerified}
          className="h-12 text-lg rounded-xl border-border bg-background focus:ring-primary disabled:opacity-70"
        />
        {isVerified && (
          <p className="text-xs text-muted-foreground">
            Email verified via secure link.
          </p>
        )}
      </div>

      {!isUnsubscribeMode && categories.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Interest Categories</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleAll}
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              {selectedCategories.length === categories.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant="outline"
                className={cn(
                  "cursor-pointer px-4 py-2 text-sm rounded-full transition-all border-border",
                  selectedCategories.includes(category.id)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:border-primary/50"
                )}
                onClick={() => toggleCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Button
          type="submit"
          disabled={isLoading || !email}
          variant={isUnsubscribeMode ? "destructive" : "default"}
          className={cn(
            "w-full h-14 text-lg font-bold rounded-xl transition-all shadow-lg",
            !isUnsubscribeMode
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20"
              : ""
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {isUnsubscribeMode ? "Unsubscribing..." : "Subscribing..."}
            </>
          ) : isUnsubscribeMode ? (
            "Confirm Unsubscribe"
          ) : (
            "Subscribe to Newsletter"
          )}
        </Button>

        {isVerified && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsUnsubscribeMode(!isUnsubscribeMode)}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            {isUnsubscribeMode
              ? "Change preferences instead"
              : "Unsubscribe from all emails"}
          </Button>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
}
