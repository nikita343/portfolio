"use client";

import { useEffect, useState, type ReactNode } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import styles from "./Booking.module.css";

const CAL_LINK = "nick-kashcheiev-okmojc/30min";
const CAL_NAMESPACE = "30min";

const CSS_VARS = {
  light: {
    "cal-brand": "#161D25",
    "cal-bg": "#F1F1F3",
    "cal-bg-emphasis": "#E8E8EA",
    "cal-bg-muted": "#F1F1F3",
    "cal-bg-subtle": "#E8E8EA",
    "cal-text": "#161D25",
    "cal-text-emphasis": "#161D25",
    "cal-text-muted": "#6B7280",
    "cal-border": "#161D2520",
    "cal-border-subtle": "#161D2520",
    "cal-border-emphasis": "#161D2540",
    "cal-border-booker": "transparent",
  },
  dark: {
    "cal-brand": "#FF003D",
    "cal-bg": "#161D25",
    "cal-bg-emphasis": "#1E262F",
    "cal-bg-muted": "#161D25",
    "cal-bg-subtle": "#1E262F",
    "cal-text": "#F1F1F3",
    "cal-text-emphasis": "#F1F1F3",
    "cal-text-muted": "#8B939B",
    "cal-border": "#F1F1F320",
    "cal-border-subtle": "#F1F1F320",
    "cal-border-emphasis": "#F1F1F340",
    "cal-border-booker": "transparent",
  },
};

type CalTheme = "light" | "dark";

const resolveCalTheme = (siteTheme: string | null): CalTheme =>
  siteTheme === "light" ? "light" : "dark";

const CalComEmbed = () => {
  const [calTheme, setCalTheme] = useState<CalTheme>(() =>
    typeof document !== "undefined"
      ? resolveCalTheme(document.documentElement.getAttribute("data-theme"))
      : "dark",
  );

  useEffect(() => {
    const sync = () => {
      const next = resolveCalTheme(
        document.documentElement.getAttribute("data-theme"),
      );
      setCalTheme(next);
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: calTheme,
        cssVarsPerTheme: CSS_VARS,
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [calTheme]);

  return (
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={CAL_LINK}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: calTheme,
      }}
    />
  );
};

const CROSSHAIRS: React.CSSProperties[] = [
  { top: 12, left: 12 },
  { top: 12, right: 12 },
  { bottom: 12, left: 12 },
  { bottom: 12, right: 12 },
];

const CalFrame = ({ children }: { children: ReactNode }) => (
  <div className={styles.frame}>
    <div aria-hidden="true" className={styles.frameDots} />
    <div aria-hidden="true" className={`${styles.frameHatch} ${styles.frameHatchTL}`} />
    <div aria-hidden="true" className={`${styles.frameHatch} ${styles.frameHatchBR}`} />
    {CROSSHAIRS.map((pos, i) => (
      <div key={i} aria-hidden="true" className={styles.crosshair} style={pos}>
        <span className={styles.crosshairH} />
        <span className={styles.crosshairV} />
      </div>
    ))}
    <div className={styles.calEmbed}>{children}</div>
  </div>
);

export const Booking = () => {
  return (
    <section id="book" className={styles.section}>
      <div className="container">
        <div data-grid12="" className={styles.headerGrid}>
          <div className={styles.headerLeft}>
            <div className={`eyebrow ${styles.headerLabel}`}>
              <span className="num">[05]</span> BOOK A CALL
            </div>
            <h2 className="h2">
              30 minutes,
              <br />
              <span className="italic">no slides.</span>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={`body-lg ${styles.headerDesc}`}>
              We&apos;ll talk through what you&apos;re building, where the friction is, and whether
              I&apos;m the right fit. If we&apos;re not aligned by minute 20, I&apos;ll point you
              to someone who is.
            </p>
          </div>
        </div>

        <CalFrame>
          <CalComEmbed />
        </CalFrame>
      </div>
    </section>
  );
};
