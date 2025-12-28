"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

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

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false); // Default to false to prevent premature script loading

  useEffect(() => {
    const checkConsent = () => {
      const consent = getCookie("cookie-consent");
      setHasConsent(consent !== "rejected");

      // Also set the global disable flag for GA if rejected
      if (consent === "rejected") {
        // @ts-expect-error - Global GA disable flag
        window["ga-disable-G-0C34L33RCK"] = true;
      } else {
        // @ts-expect-error - Global GA disable flag
        window["ga-disable-G-0C34L33RCK"] = false;
      }
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

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0C34L33RCK"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0C34L33RCK');
          `,
        }}
      />
    </>
  );
}
