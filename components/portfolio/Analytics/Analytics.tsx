"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
  type ConsentValue,
} from "@/components/portfolio/CookieConsent/CookieConsent";

const GA_ID = "G-B2L4GF90RD";

export const Analytics = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted") {
        setEnabled(true);
      }
    } catch {}

    const handler = (e: Event) => {
      const value = (e as CustomEvent<ConsentValue>).detail;
      if (value === "accepted") setEnabled(true);
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, handler);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handler);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
};
