"use client";

import { useRevealMount, revealStyle } from "./useRevealMount";
import { FeatureCard } from "./FeatureCard";
import styles from "./Hero.module.css";

export const HeroSplit = ({ scrollTo }: { scrollTo: (id: string) => void }) => {
  const mounted = useRevealMount();
  return (
    <section className={styles.splitSection}>
      <div className="container">
        <div className={`eyebrow ${styles.splitTopBar}`}>
          <span>
            <span className="num">[01]</span> MYKYTA — FRONTEND DEVELOPER
          </span>
          <span>WAW → WORLDWIDE</span>
        </div>
        <div data-grid12="" className={styles.splitGrid}>
          <div className={`hero-split-left ${styles.splitLeft}`}>
            <h1 className="display-md">
              <span className="reveal-line">
                <span style={revealStyle(".1s", mounted)}>React /</span>
              </span>
              <span className="reveal-line">
                <span style={revealStyle(".2s", mounted)}>Next.js dev</span>
              </span>
              <span className="reveal-line">
                <span style={{ ...revealStyle(".3s", mounted), fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
                  building product UI
                </span>
              </span>
              <span className="reveal-line">
                <span style={revealStyle(".4s", mounted)}>
                  end-to-end<span className={styles.accentDot}>.</span>
                </span>
              </span>
            </h1>

            <div className={styles.splitStats}>
              <div>
                <div className="eyebrow tnum">[ 12 ]</div>
                <div className={styles.splitStatSub}>Shipped products</div>
              </div>
              <div>
                <div className="eyebrow tnum">[ 5y ]</div>
                <div className={styles.splitStatSub}>In frontend</div>
              </div>
              <div>
                <div className="eyebrow tnum">[ WEBFLOW · PARTNER ]</div>
                <div className={styles.splitStatSub}>Since 2023</div>
              </div>
            </div>
          </div>

          <div className={`${styles.splitRight} reveal-fade ${mounted ? "in" : ""}`}>
            <FeatureCard scrollTo={scrollTo} />
          </div>
        </div>
      </div>
    </section>
  );
};
