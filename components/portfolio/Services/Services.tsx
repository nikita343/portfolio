"use client";

import { useState } from "react";
import styles from "./Services.module.css";

const SERVICES = [
  {
    n: "01",
    title: "React / Next.js development",
    desc: "Owning product features end-to-end — from Figma to production. Component architecture, state management, API integration, edge cases.",
    deliverables: ["Feature modules", "Component libraries", "API integration", "Performance work"],
  },
  {
    n: "02",
    title: "Webflow design & development",
    desc: "Marketing sites and component systems on Webflow. Custom interactions, headless CMS, Lighthouse-perfect. Webflow Partner.",
    deliverables: ["Marketing sites", "CMS architecture", "GSAP interactions", "Memberships"],
  },
  {
    n: "03",
    title: "Full product UI",
    desc: "Dashboards, SaaS interfaces, AI-powered tools. Real-time data, complex tables, command palettes, multi-tenant role-based UI.",
    deliverables: ["Dashboards", "Editors", "AI interfaces", "Internal tools"],
  },
  {
    n: "04",
    title: "Landing pages & marketing",
    desc: "High-conversion landing pages — built either as Next.js routes or Webflow projects, depending on stack.",
    deliverables: ["Hero sections", "Animation systems", "CMS templates", "A/B variants"],
  },
  {
    n: "05",
    title: "Design systems",
    desc: "Token-driven systems with primitives, recipes, and docs. Storybook, theming, accessibility baked in.",
    deliverables: ["Token systems", "Primitives", "Storybook", "Migration plans"],
  },
  {
    n: "06",
    title: "Animations & motion",
    desc: "GSAP, Framer Motion, scroll-driven storytelling. Motion that earns its place — never decoration.",
    deliverables: ["Hero moments", "Scroll choreography", "State transitions", "Micro-interactions"],
  },
  {
    n: "07",
    title: "Branding",
    desc: "Light-touch brand work in service of digital products. Wordmarks, type pairings, color systems for digital products.",
    deliverables: ["Wordmarks", "Type systems", "Color systems", "Digital guidelines"],
  },
];

const PROCESS = [
  { n: "01", t: "Brief", d: "30-min call. We map the problem, the constraints, and what success looks like." },
  { n: "02", t: "Scope", d: "Written proposal with phases, deliverables, dependencies. No surprises later." },
  { n: "03", t: "Build", d: "Daily progress in Linear/Loom. Code in your repo from day one. Async by default." },
  { n: "04", t: "Ship", d: "Hand-off, docs, optional retainer for continuous improvement." },
];

export const ServicesSection = () => {
  const [open, setOpen] = useState<string | null>("01");

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div data-grid12="" className={styles.headerGrid}>
          <div className={styles.headerLeft}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              <span className="num">[03]</span> SERVICES — WHAT I DO
            </div>
            <h2 className="h2">
              Seven things, done
              <br />
              <span className="italic">properly.</span>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={`body-lg ${styles.headerDescription}`}>
              Most engagements span product UI and marketing surfaces. I work as a single
              contributor with founders, or embed into existing product teams as the dedicated
              frontend engineer.
            </p>
          </div>
        </div>

        <div className={styles.list}>
          {SERVICES.map((s) => {
            const isOpen = open === s.n;
            return (
              <div key={s.n} className={styles.item}>
                <button
                  onClick={() => setOpen(isOpen ? null : s.n)}
                  className={styles.itemBtn}
                >
                  <div className={`eyebrow tnum ${styles.itemNum}`}>[{s.n}]</div>
                  <div className="h3">{s.title}</div>
                  <div
                    className={styles.itemToggle}
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                  >
                    +
                  </div>
                </button>
                <div
                  className={styles.itemBody}
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className={styles.itemBodyInner}>
                    <div className={`service-body ${styles.itemBodyGrid}`}>
                      <div className={`service-spacer ${styles.itemBodySpacer}`} />
                      <p className={`body-lg ${styles.itemBodyDesc}`}>{s.desc}</p>
                      <div>
                        <div className="eyebrow" style={{ marginBottom: 8 }}>DELIVERABLES</div>
                        <ul className={styles.deliverablesList}>
                          {s.deliverables.map((d, i) => (
                            <li key={i} className={styles.deliverableItem}>
                              <span className={styles.deliverableDash}>—</span> {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.process}>
          <div className={`eyebrow ${styles.processLabel}`}>
            <span className="num">[03/B]</span> PROCESS — HOW WE&apos;LL WORK
          </div>
          <div className={`process-grid ${styles.processGrid}`}>
            {PROCESS.map((s) => (
              <div key={s.n} className={styles.processStep}>
                <div className={`eyebrow tnum ${styles.processNum}`}>
                  {s.n} — {s.t.toUpperCase()}
                </div>
                <div className={`h3 ${styles.processStepTitle}`}>{s.t}</div>
                <p className={`body ${styles.processStepBody}`}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
