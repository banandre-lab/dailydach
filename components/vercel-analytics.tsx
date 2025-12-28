"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

// Cookie utility to get consent status
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export default function VercelAnalytics() {
  const [hasConsent, setHasConsent] = useState(false); // Default to false to prevent premature loading

  useEffect(() => {
    const checkConsent = () => {
      const consent = getCookie("cookie-consent");
      setHasConsent(consent !== "rejected");
    };

    // Use requestAnimationFrame for initial check to avoid synchronous setState during effect
    requestAnimationFrame(() => {
      checkConsent();
    });

    // Listen for changes from the cookie banner
    window.addEventListener("cookie-consent-changed", checkConsent);
    return () =>
      window.removeEventListener("cookie-consent-changed", checkConsent);
  }, []);

  // Only render analytics if user hasn't rejected cookies
  if (!hasConsent) {
    return null;
  }

  return <Analytics />;
}
