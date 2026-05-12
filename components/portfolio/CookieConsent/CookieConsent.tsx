"use client";

import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

export const COOKIE_CONSENT_KEY = "portfolio_cookie_consent";
export const COOKIE_CONSENT_EVENT = "portfolio:cookie-consent";

export type ConsentValue = "accepted" | "declined";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: ConsentValue) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {}
    window.dispatchEvent(
      new CustomEvent<ConsentValue>(COOKIE_CONSENT_EVENT, { detail: value }),
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.wrap}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className={`eyebrow ${styles.label}`}>
        <span className="num">[ COOKIES ]</span> ANALYTICS
      </div>
      <p className={styles.text}>
        I use Google Analytics to see which sections people find useful — no
        personal data, no cross-site tracking.
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={() => decide("declined")}
        >
          Decline
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnAccent}`}
          onClick={() => decide("accepted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
};
