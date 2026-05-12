"use client";

import { useState, useEffect } from "react";
import styles from "./ScrollProgress.module.css";

const SECTIONS = [
  { id: "home", n: "01", label: "INDEX" },
  { id: "work", n: "02", label: "SELECTED WORK" },
  { id: "manifesto", n: "03", label: "APPROACH" },
  { id: "services", n: "04", label: "SERVICES" },
  { id: "about", n: "05", label: "ABOUT" },
  { id: "book", n: "06", label: "BOOKING" },
];

export const ScrollProgress = () => {
  const [p, setP] = useState(0);
  const [section, setSection] = useState({ n: "01", label: "INDEX" });

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = h > 0 ? window.scrollY / h : 0;
      setP(Math.max(0, Math.min(1, ratio)));

      const y = window.scrollY + window.innerHeight * 0.35;
      let active = SECTIONS[0];
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) active = s;
      }
      setSection(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.barInner} style={{ width: `${p * 100}%` }} />
      </div>

      <div className={`${styles.hud} ${styles.hudLeft}`}>
        <span className={styles.hudAccent}>●</span>
        <span className={styles.hudFaint}>[{section.n}]</span>
        <span>{section.label}</span>
      </div>

      <div className={`${styles.hud} ${styles.hudRight}`}>
        <span className="tnum">{String(Math.round(p * 100)).padStart(3, "0")}%</span>
        <span className={styles.hudFaintAfter}>SCROLLED</span>
      </div>
    </>
  );
};
