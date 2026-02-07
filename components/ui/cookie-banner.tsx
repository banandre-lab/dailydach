"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { isFromEU } from "@/lib/eu-utils"
import { Button } from "@/components/ui/button"

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`
  const cookies = document.cookie.split(";")

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === " ") cookie = cookie.substring(1)
    if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length)
  }

  return null
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = getCookie("cookie-consent")
    const shouldShow = isFromEU() && consent !== "accepted"

    if (shouldShow) {
      requestAnimationFrame(() => {
        setShowBanner(true)
        setTimeout(() => setIsVisible(true), 100)
      })
    }
  }, [])

  const handleAccept = () => {
    setCookie("cookie-consent", "accepted", 365)
    window.dispatchEvent(new Event("cookie-consent-changed"))
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 260)
  }

  const handleReject = () => {
    setCookie("cookie-consent", "rejected", 365)
    window.dispatchEvent(new Event("cookie-consent-changed"))
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 260)
  }

  if (!showBanner) return null

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 transition-all duration-300 sm:left-auto sm:max-w-md ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="border-2 border-foreground/90 bg-card p-4 shadow-[5px_5px_0_0_var(--foreground)]">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          We use cookies to keep Tribitat reliable and relevant. Read our{" "}
          <Link href="/cookies" className="font-semibold text-foreground underline decoration-2 underline-offset-4">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="font-semibold text-foreground underline decoration-2 underline-offset-4">
            Terms
          </Link>
          .
        </p>

        <div className="flex items-center justify-end gap-2">
          <Button onClick={handleReject} variant="outline" size="sm" className="text-[0.68rem] uppercase tracking-[0.08em]">
            Reject
          </Button>
          <Button onClick={handleAccept} size="sm" className="text-[0.68rem] uppercase tracking-[0.08em]">
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
