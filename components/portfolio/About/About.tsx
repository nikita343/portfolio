"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./About.module.css";

const STACK = [
  "React, Next.js, TypeScript",
  "Tailwind, SCSS, Framer Motion, GSAP",
  "Redux, Zustand, REST API, Jest",
  "SEO, WCAG, RWD, Figma, Git/CI/CD",
];

const BACKGROUND = [
  "5+ years building product UI",
  "B.Sc. Information Technology — 2024",
  "Cross-functional product teams · Agile/Scrum",
  "EN C1 · PL B2 · UK / RU native",
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : 40, reduce ? 0 : -40],
  );

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <div className="container">
        <div data-grid12="" className={styles.grid}>
          <div className={styles.label}>
            <div className="eyebrow">
              <span className="num">[04]</span> ABOUT
            </div>
          </div>

          <div className={styles.portraitCol}>
            <motion.div
              className={styles.portrait}
              style={{ y: portraitY, willChange: "transform" }}
            >
              <img
                src="/assets/selfportrait.avif"
                alt="Mykyta K. — portrait, Warsaw studio, 2026"
                loading="lazy"
                className={styles.portraitImg}
              />
            </motion.div>
            <div className={styles.portraitCaption}>
              <span>Fig. A — Portrait, Warsaw Studio, 2026</span>
              <span>WAW / 52.2°N · 21.0°E</span>
            </div>
          </div>

          <div className={styles.copyCol}>
            <h2 className={`h2 ${styles.heading}`}>
              Frontend developer focused on{" "}
              <span className="italic">React, Next.js, and TypeScript</span> —
              comfortable taking real product features from Figma to production.
            </h2>
            <p className={`body-lg ${styles.lede}`}>
              Recent work includes a Notion-like app with AI features and a
              creator analytics dashboard, so there&apos;s experience with
              complex UIs, state management, and integrating APIs. I care about
              clean data flows, performance, and code that other engineers
              actually want to touch.
            </p>
            <p className={`body-lg ${styles.lede2}`}>
              Looking for a full-time role in a product team — somewhere features
              are owned end-to-end and decisions sit close to the code. Open to
              short engagements with product teams in the meantime.
            </p>

            <div className={styles.stackGrid}>
              <div>
                <div className={`eyebrow ${styles.stackLabel}`}>
                  STACK · DAILY
                </div>
                <ul className={styles.stackList}>
                  {STACK.map((s, i) => (
                    <li
                      key={s}
                      className={
                        i < STACK.length - 1 ? styles.stackItem : undefined
                      }
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className={`eyebrow ${styles.stackLabel}`}>
                  BACKGROUND
                </div>
                <ul className={styles.stackList}>
                  {BACKGROUND.map((s, i) => (
                    <li
                      key={s}
                      className={
                        i < BACKGROUND.length - 1
                          ? styles.stackItem
                          : undefined
                      }
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
