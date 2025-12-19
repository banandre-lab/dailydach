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
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check if user has accepted cookies
    const consent = getCookie("cookie-consent");
    setHasConsent(consent === "accepted");
  }, []);

  // Only render analytics if user has accepted cookies
  if (!hasConsent) {
    return null;
  }

  return <Analytics />;
}
