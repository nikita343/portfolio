"use client";

import { useState } from "react";
import styles from "./Services.module.css";

const SERVICES = [
  {
    n: "01",
    title: "React / Next.js development",
    desc: "Full product UI development. Dashboards, SaaS interfaces, editors, AI-powered tools — TypeScript-first, component-driven, with thoughtful state management (Redux / Zustand) and clean architecture.",
    deliverables: [
      "Feature modules",
      "Component libraries",
      "State architecture",
      "Performance work",
    ],
  },
  {
    n: "02",
    title: "Custom development",
    desc: "Beyond UI: third-party integrations and custom logic. REST APIs, HubSpot, Mapbox, Instagram analytics, AWS Cognito auth — connecting product surfaces to the systems they depend on.",
    deliverables: [
      "API integrations",
      "Auth & access control",
      "CMS / analytics connections",
      "Custom feature work",
    ],
  },
  {
    n: "03",
    title: "Website development",
    desc: "Full-scale marketing sites end-to-end. UX/UI direction, build in Next.js or Webflow depending on the stack, animations, CMS, SEO and performance. One contact, ship-ready outcome.",
    deliverables: [
      "UX & UI direction",
      "Build (Next.js / Webflow)",
      "CMS architecture",
      "SEO & performance",
    ],
  },
  {
    n: "04",
    title: "Webflow development",
    desc: "Webflow Partner. Marketing sites and component systems with CMS, memberships, custom GSAP interactions, and Lighthouse-perfect performance.",
    deliverables: [
      "Marketing sites",
      "CMS architecture",
      "GSAP interactions",
      "Memberships",
    ],
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
              Four lanes,
              <br />
              <span className="italic">done properly.</span>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={`body-lg ${styles.headerDescription}`}>
              Narrow on purpose. I&apos;d rather go deep on a few things than spread thin
              across many. I work as a single contributor with founders, or embed into product
              teams as the dedicated frontend engineer.
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
