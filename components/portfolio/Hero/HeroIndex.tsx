"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRevealMount, revealStyle } from "./useRevealMount";
import styles from "./Hero.module.css";

export const HeroIndex = ({ scrollTo }: { scrollTo: (id: string) => void }) => {
  const mounted = useRevealMount();
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.45]);

  return (
    <section ref={sectionRef} className={styles.indexSection}>
      <div className={`container ${styles.indexInner}`}>
        <motion.div style={{ width: "100%", y, opacity, willChange: "transform" }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            <span className="num">[ 2026 / VOL.04 ]</span> OPEN TO FULL-TIME
            ROLES
          </div>
          <h1 className={styles.indexHeading}>
            <span className="reveal-line">
              <span style={revealStyle(".05s", mounted)}>I ship</span>
            </span>
            <span className="reveal-line">
              <span
                style={{
                  ...revealStyle(".15s", mounted),
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                }}
              >
                product
              </span>
            </span>
            <span className="reveal-line">
              <span style={revealStyle(".25s", mounted)}>features</span>
            </span>
            <span className="reveal-line">
              <span style={revealStyle(".35s", mounted)}>
                end to end<span className={styles.accentDot}>.</span>
              </span>
            </span>
          </h1>
        </motion.div>
      </div>

      <div className="container">
        <div data-grid12="" className={styles.indexFooterGrid}>
          <div style={{ gridColumn: "span 4" }}>
            <p className={`body ${styles.indexFooterBlurb}`}>
              React, Next.js, TypeScript. Five years building product UI —
              Notion-like editors, creator analytics, AI-powered tools.
            </p>
          </div>
          <div style={{ gridColumn: "span 4" }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              NOW
            </div>
            <div style={{ fontSize: 14 }}>
              Building component library for an AI-native dashboard.
            </div>
          </div>
          <div
            style={{
              gridColumn: "span 4",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => scrollTo("work")}
              className="link-line"
              style={{ fontSize: 14 }}
            >
              Scroll — selected work <span className="arr">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
