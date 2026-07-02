"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ALL_PROJECTS, type ArchiveProject } from "@/lib/projects";
import styles from "./Work.module.css";

// A slice of the full archive for the homepage — named, live, clickable.
const HOME_PROJECTS = ALL_PROJECTS.filter((p) => p.status !== "nda").slice(0, 10);

interface WorkRowProps {
  p: ArchiveProject;
  n: string;
  onHover: (id: string | null) => void;
  isActive: boolean;
}

const WorkRow = ({ p, n, onHover, isActive }: WorkRowProps) => {
  const handleClick = () => {
    if (p.live) window.open(`https://${p.live}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onMouseEnter={() => onHover(p.id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
      data-cursor={p.live ? "Visit site ↗" : undefined}
      className={styles.row}
    >
      <div className={`eyebrow tnum ${styles.rowNum}`}>[{n}]</div>

      <div>
        <div
          className={styles.rowTitle}
          style={{ transform: isActive ? "translateX(20px)" : "translateX(0)" }}
        >
          {p.title}
        </div>
      </div>

      <div className={styles.rowTags}>
        {p.stack.slice(0, 3).map((t, i) => (
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
};

export const WorkSection = () => {
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

  const activeProj = HOME_PROJECTS.find((p) => p.id === active);

  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={`eyebrow ${styles.headerTitleNum}`}>
              <span className="num">[02]</span> SELECTED WORK / 2022 — 2026
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
              {String(HOME_PROJECTS.length).padStart(2, "0")} SHOWN ·{" "}
              {ALL_PROJECTS.length} IN ARCHIVE
            </div>
            <a href="/work" className={`link-line eyebrow ${styles.headerLink}`}>
              VIEW ALL WORK <span className="arr">↗</span>
            </a>
          </div>
        </div>

        <div className={styles.list}>
          {HOME_PROJECTS.map((p, i) => (
            <WorkRow
              key={p.id}
              p={p}
              n={String(i + 1).padStart(2, "0")}
              onHover={setActive}
              isActive={active === p.id}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <div className={`body ${styles.footerBody}`}>
            A slice of the work. The full archive of{" "}
            <span style={{ color: "var(--fg)" }}>{ALL_PROJECTS.length}+ projects</span> is
            filterable by year, role, stack, and industry.
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
            (activeProj.ogImage ? (
              <div className={styles.previewInner}>
                <img
                  src={activeProj.ogImage}
                  alt={activeProj.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className={styles.previewImg}
                />
              </div>
            ) : (
              <div className={`placeholder ${styles.previewInner}`}>
                <span className="ph-label">{activeProj.title}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
