"use client";

import { useRevealMount, revealStyle } from "./useRevealMount";
import styles from "./Hero.module.css";

export const HeroStatement = ({ scrollTo }: { scrollTo: (id: string) => void }) => {
  const mounted = useRevealMount();

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
          <div className={styles.eyebrowRow}>
            <div className={`reveal-fade ${mounted ? "in" : ""}`} style={{ transitionDelay: ".05s" }}>
              <span className="eyebrow">
                <span className="num">[01]</span> INDEX · PORTFOLIO 2026
              </span>
            </div>
            <div className={`reveal-fade ${mounted ? "in" : ""}`} style={{ transitionDelay: ".15s" }}>
              <span className="eyebrow">MYKYTA K. — REACT / NEXT.JS / WEBFLOW</span>
            </div>
            <div className={`reveal-fade ${mounted ? "in" : ""}`} style={{ transitionDelay: ".25s" }}>
              <span className="eyebrow">BASED IN WARSAW — WORKING WORLDWIDE</span>
            </div>
          </div>

          <h1 className="display" style={{ paddingTop: 24 }}>
            <span className="reveal-line" style={{ display: "block" }}>
              <span style={revealStyle(".1s", mounted)}>Frontend</span>
            </span>
            <span className="reveal-line" style={{ display: "block" }}>
              <span style={revealStyle(".2s", mounted)}>
                developer<span className={styles.accentDot}>.</span>
              </span>
            </span>
            <span className="reveal-line" style={{ display: "block" }}>
              <span style={{ ...revealStyle(".3s", mounted), ...{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.03em" } }}>
                shipping product UI
              </span>
            </span>
            <span className="reveal-line" style={{ display: "block" }}>
              <span style={revealStyle(".4s", mounted)}>end-to-end.</span>
            </span>
          </h1>

          <div data-grid12="" className={styles.metaGrid}>
            <div style={{ gridColumn: "span 6" }} className={`reveal-fade ${mounted ? "in" : ""}`}>
              <p className={`body-lg ${styles.metaP}`}>
                React/Next.js engineer building{" "}
                <em className="italic">complex dashboards, editors and SaaS interfaces</em>.
                Webflow Partner. Available for full-time roles, contracts and selected freelance
                projects.
              </p>
            </div>
            <div style={{ gridColumn: "span 3" }} className={`reveal-fade ${mounted ? "in" : ""}`}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>FOCUS</div>
              <ul className={styles.focusList}>
                <li>React · Next.js · TypeScript</li>
                <li>Framer Motion · GSAP</li>
                <li>Webflow · Headless CMS</li>
                <li>Design systems</li>
              </ul>
            </div>
            <div
              style={{ gridColumn: "span 3", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              className={`reveal-fade ${mounted ? "in" : ""}`}
            >
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>STATUS</div>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot} />
                  Open for new projects
                </div>
                <div className={styles.statusBooking}>Booking → Q3 2026</div>
              </div>
              <button
                onClick={() => scrollTo("work")}
                className="link-line"
                style={{ alignSelf: "flex-start", marginTop: 16, fontSize: 14 }}
              >
                Selected work <span className="arr">↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
