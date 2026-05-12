"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { PROJECTS, ALL_PROJECTS, type FeaturedProject } from "@/lib/projects";
import styles from "./Work.module.css";

interface WorkRowProps {
  p: FeaturedProject;
  onOpen: (p: FeaturedProject) => void;
  onHover: (id: string | null) => void;
  isActive: boolean;
}

const WorkRow = ({ p, onOpen, onHover, isActive }: WorkRowProps) => (
  <div
    onMouseEnter={() => onHover(p.id)}
    onMouseLeave={() => onHover(null)}
    onClick={() => onOpen(p)}
    data-cursor="View case ↗"
    className={styles.row}
  >
    <div className={`eyebrow tnum ${styles.rowNum}`}>[{p.n}]</div>

    <div>
      <div
        className={styles.rowTitle}
        style={{ transform: isActive ? "translateX(20px)" : "translateX(0)" }}
      >
        {p.title}
      </div>
    </div>

    <div className={styles.rowTags}>
      {p.tags.map((t, i) => (
        <span key={i} className="work-row-tag">
          {t}
        </span>
      ))}
    </div>

    <div className={styles.rowYear}>{p.year}</div>

    <div className={styles.rowArrCell}>
      <span
        className={styles.rowArr}
        style={{ transform: isActive ? "translate(4px, -4px)" : "translate(0,0)" }}
      >
        ↗
      </span>
    </div>
  </div>
);

interface WorkSectionProps {
  onOpen: (p: FeaturedProject) => void;
}

export const WorkSection = ({ onOpen }: WorkSectionProps) => {
  const [active, setActive] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    if (!previewRef.current) return;
    previewRef.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 120}px)`;
  }, []);

  useEffect(() => {
    if (active) {
      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    }
  }, [active, handleMove]);

  const activeProj = PROJECTS.find((p) => p.id === active);

  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={`eyebrow ${styles.headerTitleNum}`}>
              <span className="num">[02]</span> SELECTED WORK / 2023 — 2026
            </div>
            <h2 className="h2">
              Built for teams who care
              <br />
              <span className="italic">how the product feels.</span>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <div className="eyebrow tnum">
              <span className="num">[ COUNT ]</span>{" "}
              {String(PROJECTS.length).padStart(2, "0")} FEATURED · MORE IN ARCHIVE
            </div>
            <a href="/work" className={`link-line eyebrow ${styles.headerLink}`}>
              VIEW ALL WORK <span className="arr">↗</span>
            </a>
          </div>
        </div>

        <div className={styles.list}>
          {PROJECTS.map((p) => (
            <WorkRow
              key={p.id}
              p={p}
              onOpen={onOpen}
              onHover={setActive}
              isActive={active === p.id}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <div className={`body ${styles.footerBody}`}>
            Selected projects only. Full archive of{" "}
            <span style={{ color: "var(--fg)" }}>{ALL_PROJECTS.length}+ projects</span> —
            filterable by year, role, stack, industry.
          </div>
          <a href="/work" className="link-line" style={{ fontSize: 14 }}>
            View full archive <span className="arr">↗</span>
          </a>
        </div>

        <div
          ref={previewRef}
          className={styles.preview}
          style={{
            opacity: active ? 1 : 0,
            transform: "translate(-9999px, -9999px)",
          }}
        >
          {activeProj &&
            (activeProj.hero ? (
              <div className={styles.previewInner}>
                <img
                  src={activeProj.hero}
                  alt={activeProj.label}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className={styles.previewImg}
                />
              </div>
            ) : (
              <div className={`placeholder ${styles.previewInner}`}>
                <span className="ph-label">{activeProj.label}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
