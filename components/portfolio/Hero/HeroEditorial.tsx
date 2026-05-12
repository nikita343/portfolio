"use client";

import { useState, useEffect } from "react";
import { useRevealMount, revealStyle } from "./useRevealMount";
import styles from "./Hero.module.css";

export const HeroEditorial = ({ scrollTo }: { scrollTo: (id: string) => void }) => {
  const mounted = useRevealMount();
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(Math.min(window.scrollY, 1200));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const xShift = -scroll * 0.4;

  return (
    <section className={styles.editorialSection}>
      <div className="container">
        <div className={styles.editorialBar}>
          <span className="eyebrow">
            <span className="num">[ 01 / 26 ]</span> MYKYTA K. — INDEX
          </span>
          <span className="eyebrow">REACT · NEXT.JS · WEBFLOW PARTNER</span>
          <span className="eyebrow">WAW / 52.2°N · 21.0°E</span>
        </div>
      </div>

      <div className={styles.editorialBigLine} style={{ transform: `translateX(${xShift}px)` }}>
        <span className="reveal-line" style={{ display: "inline-block" }}>
          <span style={revealStyle(".1s", mounted)}>
            Frontend, end-to-end<span className={styles.accentDot}>.</span>
          </span>
        </span>
      </div>
      <div className={styles.editorialBigLine} style={{ transform: `translateX(${-xShift * 0.6}px)` }}>
        <span className="reveal-line" style={{ display: "inline-block" }}>
          <span style={{ ...revealStyle(".2s", mounted), fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
            for product teams who care.
          </span>
        </span>
      </div>

      <div className={`container ${styles.editorialFooterContainer}`}>
        <div data-grid12="" className={styles.editorialFooter}>
          <div style={{ gridColumn: "span 5" }} className={`reveal-fade ${mounted ? "in" : ""}`}>
            <p className="body-lg" style={{ maxWidth: 480 }}>
              I&apos;m Mykyta — a React/Next.js developer building{" "}
              <em className="italic">complex dashboards, editors and SaaS interfaces</em>.
              Webflow Partner. Available for full-time roles, contracts and selected freelance projects.
            </p>
          </div>
          <div style={{ gridColumn: "span 4" }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>FOCUS · 2026</div>
            <ul className={styles.focusList}>
              <li>Product UI · dashboards · editors</li>
              <li>AI-powered tooling</li>
              <li>Marketing systems · Webflow</li>
            </ul>
          </div>
          <div style={{ gridColumn: "span 3" }}>
            <button onClick={() => scrollTo("work")} className="link-line" style={{ fontSize: 14 }}>
              Scroll — selected work <span className="arr">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
