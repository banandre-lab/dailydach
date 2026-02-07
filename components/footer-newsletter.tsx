"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function FooterNewsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          categories: [],
        }),
      })

      if (!response.ok) throw new Error("Failed to subscribe")

      toast.success("You are in. Check your inbox.")
      setEmail("")
    } catch {
      toast.error("Subscription failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border-border/80 bg-background"
      />
      <Button
        type="submit"
        disabled={isLoading || !email}
        className="w-full text-xs uppercase tracking-[0.1em]"
      >
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Subscribe"}
      </Button>
    </form>
  )
}
