"use client";

import { useEffect, type ReactNode } from "react";
import styles from "./Booking.module.css";

const CAL_LINK = "nick-kashcheiev-okmojc/30min";
const CAL_NAMESPACE = "30min";

const calThemeFor = (siteTheme: string | null) => (siteTheme === "light" ? "light" : "dark");

declare global {
  interface Window {
    Cal?: any;
  }
}

const CalComEmbed = () => {
  useEffect(() => {
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          // eslint-disable-next-line prefer-rest-params
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              // eslint-disable-next-line prefer-rest-params
              p(api, arguments);
            };
            const namespace = ar[1];
            (api as any).q = (api as any).q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal!("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });

    window.Cal!.ns[CAL_NAMESPACE]("inline", {
      elementOrSelector: "#my-cal-inline-30min",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: CAL_LINK,
    });

    const applyUi = () => {
      const siteTheme = document.documentElement.getAttribute("data-theme");
      window.Cal!.ns[CAL_NAMESPACE]("ui", {
        theme: calThemeFor(siteTheme),
        cssVarsPerTheme: {
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
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };
    applyUi();

    const obs = new MutationObserver(applyUi);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  return <div id="my-cal-inline-30min" className={styles.calEmbed} />;
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
    {children}
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
