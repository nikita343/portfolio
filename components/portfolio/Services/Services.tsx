"use client";

import { useState } from "react";
import styles from "./Services.module.css";

const SERVICES = [
  {
    n: "01",
    title: "Product engineering",
    desc: "End-to-end feature ownership in React and Next.js. I take work from product conversation to production — building user-facing flows, complex state, and the architecture that holds them together. TypeScript-first, component-driven, with state managed in Redux or Zustand and performance treated as a first-class concern, not a cleanup pass.",
    deliverables: [
      "Feature modules",
      "State architecture",
      "Component systems",
      "Performance work",
    ],
  },
  {
    n: "02",
    title: "Internal tools & back-office systems",
    desc: "Admin and operations interfaces that teams actually run on. Configuration UIs, data-dense dashboards, complex tables with filtering and bulk actions, role-based access — turning business logic into something operators, finance, and content teams can trust and move fast in.",
    deliverables: [
      "Admin & back-office UIs",
      "Configuration interfaces",
      "Data tables & dashboards",
      "RBAC + auth flows",
    ],
  },
  {
    n: "03",
    title: "AI product development",
    desc: "AI-powered product surfaces built to feel reliable, fast, and product-grade — not demo-grade. LLM integrations, streaming responses, agent and assistant UIs, semantic search, prompt and tool orchestration. The layer where AI stops being a feature flag and starts being a product.",
    deliverables: [
      "LLM integrations",
      "Streaming UIs",
      "Agent & assistant interfaces",
      "Prompt + tool orchestration",
    ],
  },
  {
    n: "04",
    title: "Design systems & frontend platform",
    desc: "Shared component libraries, design tokens, and frontend infrastructure that scale with the team. Consistent patterns across products, documented primitives, and the kind of foundation that makes every next feature ship faster — not the kind that quietly forks and rots.",
    deliverables: [
      "Component libraries",
      "Design tokens",
      "Documentation & DX",
      "Tooling & build setup",
    ],
  },
  {
    n: "05",
    title: "Marketing & brand sites",
    desc: "Marketing sites and product landings in Next.js or Webflow — the stack call depends on who owns the site after launch. Performance-first build, considered motion, CMS the marketing team actually runs themselves. Accessible by default, fast on Lighthouse, structured so the next campaign doesn't need an engineer to ship.",
    deliverables: [
      "Build (Next.js / Webflow)",
      "CMS architecture",
      "Motion & interactions",
      "SEO & performance",
    ],
  },
];

const PROCESS = [
  { n: "01", t: "Align", d: "Initial conversation on product context, team setup, constraints, and what success actually looks like." },
  { n: "02", t: "Plan", d: "Written approach: phases, technical decisions, dependencies, how the work plugs into the team's existing flow." },
  { n: "03", t: "Build", d: "In your repo, in your tools, in your team's rhythm. PRs, design reviews, async by default. Decisions owned, not deferred." },
  { n: "04", t: "Ship & evolve", d: "Production hand-off with docs and context. Continued involvement for iteration, follow-up work, and what comes next." },
];

export const ServicesSection = () => {
  const [open, setOpen] = useState<string | null>("01");

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div data-grid12="" className={styles.headerGrid}>
          <div className={styles.headerLeft}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              <span className="num">[03]</span> SERVICES — WHERE I CONTRIBUTE
            </div>
            <h2 className="h2">
              Product engineering,
              <br />
              <span className="italic">end to end.</span>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={`body-lg ${styles.headerDescription}`}>
              I embed into product teams as a frontend engineer — owning features from
              product conversation through production. Independent enough to drive
              decisions, accountable enough to ship the outcomes that follow them.
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
