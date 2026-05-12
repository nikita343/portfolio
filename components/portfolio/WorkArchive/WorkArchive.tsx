"use client";

import { useState, type ReactNode } from "react";
import {
  ALL_PROJECTS,
  WORK_FACETS,
  PROJECTS,
  type ArchiveProject,
  type FeaturedProject,
} from "@/lib/projects";
import styles from "./WorkArchive.module.css";

const StatusDot = ({ status }: { status: "live" | "nda" | "archived" }) => {
  const map = {
    live: { c: "var(--accent)", t: "◉" },
    nda: { c: "var(--fg-faint)", t: "◐" },
    archived: { c: "var(--fg-faint)", t: "◯" },
  };
  const s = map[status] || map.live;
  return <span style={{ color: s.c }}>{s.t}</span>;
};

interface FilterPillProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  count?: number;
}

const FilterPill = ({ active, onClick, children, count }: FilterPillProps) => (
  <button
    onClick={onClick}
    className={`${styles.pill} ${active ? styles.pillActive : ""}`}
  >
    {children}
    {count !== undefined && (
      <span className={styles.pillCount}>{String(count).padStart(2, "0")}</span>
    )}
  </button>
);

interface FilterGroupProps<T> {
  label: string;
  options: T[];
  value: T | null;
  onChange: (v: T | null) => void;
  getCount?: (v: T) => number;
}

function FilterGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
  getCount,
}: FilterGroupProps<T>) {
  return (
    <div className={styles.filterGroup}>
      <div className={`eyebrow ${styles.filterGroupLabel}`}>{label}</div>
      <div className={styles.filterPillRow}>
        <FilterPill active={value === null} onClick={() => onChange(null)}>
          All
        </FilterPill>
        {options.map((o) => (
          <FilterPill
            key={String(o)}
            active={value === o}
            onClick={() => onChange(o)}
            count={getCount ? getCount(o) : undefined}
          >
            {o}
          </FilterPill>
        ))}
      </div>
    </div>
  );
}

interface ArchiveRowProps {
  p: ArchiveProject;
  idx: number;
  onOpen: (p: FeaturedProject) => void;
}

const ArchiveRow = ({ p, idx, onOpen }: ArchiveRowProps) => {
  const num = String(idx + 1).padStart(3, "0");
  const isNda = p.status === "nda";
  const caseProj = p.caseStudyId ? PROJECTS.find((x) => x.id === p.caseStudyId) : null;
  const clickable = caseProj || p.live;

  const handleClick = () => {
    if (caseProj && onOpen) onOpen(caseProj);
    else if (p.live) window.open(`https://${p.live}`, "_blank");
  };

  return (
    <div
      className={styles.row}
      style={{ cursor: clickable ? "pointer" : "default" }}
      onClick={handleClick}
    >
      <div className={`eyebrow tnum ${styles.rowNum}`}>[{num}]</div>

      <div className={`${styles.rowTitle} ${isNda ? styles.rowTitleBlur : ""}`}>
        {isNda ? "████████████" : p.title}
      </div>

      <div className={`${styles.rowClient} ${isNda ? styles.rowClientBlur : ""}`}>
        {isNda ? "████████" : p.client}
      </div>

      <div className={`tnum ${styles.rowYear}`}>{p.year}</div>

      <div className={styles.rowRole}>{p.role}</div>

      <div className={styles.rowStack}>
        {p.stack.slice(0, 3).map((s, i) => (
          <span key={i} className={styles.rowStackItem}>
            {s}
            {i < Math.min(p.stack.length, 3) - 1 ? " ·" : ""}
          </span>
        ))}
      </div>

      <div className={styles.rowIndustry}>{p.industry}</div>

      <div className={styles.rowLink}>
        {isNda ? (
          <span style={{ color: "var(--fg-faint)" }}>
            <StatusDot status="nda" /> NDA
          </span>
        ) : caseProj ? (
          <span style={{ color: "var(--accent)" }}>
            <StatusDot status="live" /> CASE
          </span>
        ) : p.live ? (
          <span style={{ color: "var(--accent)" }}>
            <StatusDot status="live" /> ↗
          </span>
        ) : (
          <span style={{ color: "var(--fg-faint)" }}>
            <StatusDot status="archived" /> —
          </span>
        )}
      </div>
    </div>
  );
};

export const WorkArchive = ({ onOpen }: { onOpen: (p: FeaturedProject) => void }) => {
  const all = ALL_PROJECTS;
  const facets = WORK_FACETS;

  const [year, setYear] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [stack, setStack] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const filtered = all.filter(
    (p) =>
      (!year || p.year === year) &&
      (!role || p.role === role) &&
      (!industry || p.industry === industry) &&
      (!stack || p.stack.includes(stack)) &&
      (!status || p.status === status),
  );

  const reset = () => {
    setYear(null);
    setRole(null);
    setIndustry(null);
    setStack(null);
    setStatus(null);
  };
  const hasActive = year || role || industry || stack || status;

  const countBy = (key: keyof ArchiveProject, val: string | number) =>
    all.filter((p) => {
      const v = p[key];
      return Array.isArray(v) ? v.includes(val as string) : v === val;
    }).length;

  return (
    <section id="archive" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={`eyebrow ${styles.headerLabel}`}>
              <span className="num">[02]</span> FULL ARCHIVE / 2022 — 2026
            </div>
            <h2 className="h2">
              {String(all.length).padStart(2, "0")} projects.
              <br />
              <span className="italic">Four years</span> on the receipts.
            </h2>
          </div>
          <div className={styles.headerRight}>
            <div className={`eyebrow ${styles.headerCountLabel}`}>SHOWING</div>
            <div className={`tnum ${styles.headerCount}`}>
              {String(filtered.length).padStart(2, "0")}
              <span className={styles.headerCountFaint}> / {all.length}</span>
            </div>
          </div>
        </div>

        <div className={styles.filters}>
          <FilterGroup
            label="YEAR"
            options={facets.year}
            value={year}
            onChange={setYear}
            getCount={(v) => countBy("year", v)}
          />
          <FilterGroup
            label="ROLE"
            options={facets.role}
            value={role}
            onChange={setRole}
            getCount={(v) => countBy("role", v)}
          />
          <FilterGroup
            label="INDUSTRY"
            options={facets.industry}
            value={industry}
            onChange={setIndustry}
          />
          <FilterGroup
            label="STACK"
            options={facets.stack}
            value={stack}
            onChange={setStack}
            getCount={(v) => countBy("stack", v)}
          />
          <FilterGroup
            label="STATUS"
            options={facets.status}
            value={status}
            onChange={setStatus}
          />

          {hasActive && (
            <div>
              <button onClick={reset} className={`eyebrow ${styles.clearBtn}`}>
                ✕ CLEAR ALL
              </button>
            </div>
          )}
        </div>

        <div className={styles.tableHeader}>
          <div>№</div>
          <div>PROJECT</div>
          <div>CLIENT</div>
          <div>YEAR</div>
          <div>ROLE</div>
          <div>STACK</div>
          <div>INDUSTRY</div>
          <div className={styles.tableHeaderRight}>LINK</div>
        </div>

        <div>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={`eyebrow ${styles.emptyTitle}`}>NO MATCHES</div>
              <div className={`body ${styles.emptyBody}`}>
                Try widening the filters — or{" "}
                <button onClick={reset} className={styles.emptyLink}>
                  clear all
                </button>
                .
              </div>
            </div>
          ) : (
            filtered.map((p, i) => <ArchiveRow key={p.id} p={p} idx={i} onOpen={onOpen} />)
          )}
        </div>

        <div className={styles.summaryFooter}>
          {[
            { v: all.length, l: "Projects shipped" },
            { v: all.filter((p) => p.status === "live").length, l: "Live in production" },
            { v: 40, l: "Lighthouse 95+" },
            { v: 4, l: "Active practice", suffix: "yr" as const },
          ].map((s) => (
            <div key={s.l}>
              <div className={`tnum ${styles.summaryFigure}`}>
                {s.v}
                {s.suffix && <span className={styles.summaryFigureFaint}>{s.suffix}</span>}
              </div>
              <div className={`eyebrow ${styles.summaryLabel}`}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
