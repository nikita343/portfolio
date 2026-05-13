"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./PinnedShowcase.module.css";

const PANELS = [
  {
    n: "01",
    label: "OWNERSHIP",
    t: "I ship the whole feature.",
    d: "From spec to deploy — state design, data flow, edge cases, telemetry. Not just components in isolation.",
  },
  {
    n: "02",
    label: "CODE QUALITY",
    t: "Typed top to bottom.",
    d: "Strict TypeScript. Zod at the boundary. Components that document themselves and survive a refactor.",
  },
  {
    n: "03",
    label: "PERFORMANCE",
    t: "Sub-second TTI.",
    d: "Lighthouse green by default. Bundle budgets in CI. Streaming where it earns its keep.",
  },
  {
    n: "04",
    label: "COLLABORATION",
    t: "Inside the team.",
    d: "Decisions documented in PRs. Design and code reviews left tighter than I found them. In standups and rhythm from week one — embedded, not adjacent.",
  },
];

const PANEL_THEMES = [
  { bg: "var(--bg)", fg: "var(--fg)" },
  { bg: "#161D25", fg: "#F1F1F3" },
  { bg: "#FF003D", fg: "#F1F1F3" },
  { bg: "#F1F1F3", fg: "#161D25" },
];

export const PinnedShowcase = () => {
  const wrapRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let lastIdx = -1;

    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      const p = Math.max(0, Math.min(1, scrolled / Math.max(1, total)));
      const idxFloat = p * PANELS.length;
      const idx = Math.min(PANELS.length - 1, Math.floor(idxFloat));
      const local = idxFloat - idx;

      if (idx !== lastIdx) {
        lastIdx = idx;
        setActiveIdx(idx);
      }

      const sticky = stickyRef.current;
      if (sticky) {
        const t = PANEL_THEMES[idx] || PANEL_THEMES[0];
        sticky.style.backgroundColor = t.bg;
        sticky.style.color = t.fg;
      }

      if (numRef.current) {
        numRef.current.style.transform = `translateY(${(1 - local) * 8}vh) scale(${0.92 + local * 0.08})`;
        numRef.current.style.opacity = String(0.04 + local * 0.08);
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${(1 - local) * 30}px)`;
        textRef.current.style.opacity = String(Math.min(1, local * 1.4));
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${p * 100}%`;
      }
      if (counterRef.current) {
        counterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(PANELS.length).padStart(2, "0")}`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const p = PANELS[activeIdx];

  return (
    <section
      id="manifesto"
      ref={wrapRef}
      className={styles.wrap}
      style={{ height: `${PANELS.length * 110}vh` }}
    >
      <div ref={stickyRef} className={styles.sticky}>
        <div className={`container ${styles.topHud}`}>
          <div className="eyebrow">
            <span className="num">[03]</span> APPROACH — FOUR PRINCIPLES
          </div>
          <div ref={counterRef} className="eyebrow tnum">
            01 / 04
          </div>
        </div>

        <div className={`container ${styles.progress}`}>
          <div className={styles.progressTrack}>
            <div ref={progressBarRef} className={styles.progressFill} />
          </div>
        </div>

        <div className={styles.main}>
          <div ref={numRef} className={styles.bigNumber}>
            {p.n}
          </div>

          <div ref={textRef} className={styles.text}>
            <div className={`eyebrow ${styles.textLabel}`}>{p.label}</div>
            <div className={styles.textHead}>
              {p.t.split(" ").slice(0, -1).join(" ")}{" "}
              <span className={styles.textHeadItalic}>{p.t.split(" ").slice(-1)[0]}</span>
            </div>
            <p className={styles.textBody}>{p.d}</p>
          </div>
        </div>

        <div className={`container ${styles.bottomHint}`}>
          <div className={`eyebrow ${styles.bottomHintLabel}`}>↓ KEEP SCROLLING</div>
        </div>
      </div>
    </section>
  );
};
