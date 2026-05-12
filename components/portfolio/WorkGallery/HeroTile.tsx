"use client";

import { PROJECTS, type ArchiveProject, type FeaturedProject } from "@/lib/projects";
import styles from "./WorkGallery.module.css";

interface HeroTileProps {
  p: ArchiveProject;
  idx: number;
  total: number;
  onOpen: (p: FeaturedProject) => void;
  fullHeight?: boolean;
  useLongImage?: boolean;
}

export const HeroTile = ({
  p,
  idx,
  total,
  onOpen,
  fullHeight = true,
  useLongImage = false,
}: HeroTileProps) => {
  const num = String(idx + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");
  const caseProj = p.caseStudyId ? PROJECTS.find((x) => x.id === p.caseStudyId) : null;
  const handleOpen = () => {
    if (caseProj && onOpen) onOpen(caseProj);
  };

  const heroSrc = fullHeight && useLongImage && p.ogImageLong ? p.ogImageLong : p.ogImage;

  return (
    <article
      className={`${styles.tile} ${fullHeight ? styles.tileFull : styles.tileLoose}`}
      style={{ cursor: caseProj ? "pointer" : "default" }}
      onClick={caseProj ? handleOpen : undefined}
    >
      <div className={styles.meta}>
        <div className={`eyebrow tnum ${styles.metaNum}`}>
          [{num} / {totalStr}]
        </div>
        <div className={`eyebrow ${styles.metaCenter}`}>
          <span className="num">{p.year}</span> · {p.industry.toUpperCase()} ·{" "}
          {p.role.toUpperCase()}
        </div>
        <div className={`eyebrow ${styles.metaRight}`}>
          {p.status === "live" ? "◉ LIVE" : p.status === "nda" ? "◐ NDA" : "◯ ARCHIVED"}
        </div>
      </div>

      <div className={`${styles.media} ${heroSrc ? styles.mediaImage : "placeholder"}`}>
        {heroSrc ? (
          <img
            src={heroSrc}
            alt={`${p.title} — hero thumbnail`}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
            className={styles.mediaImg}
          />
        ) : (
          <span className="ph-label">{p.title.toUpperCase()} · HERO</span>
        )}
        <div className={styles.mediaClientTag}>{p.client.toUpperCase()}</div>
        {p.lighthouse && (
          <div className={styles.mediaLighthouse}>
            <span className={styles.mediaLighthouseDot} />
            LIGHTHOUSE {p.lighthouse}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.infoTitleCol}>
          <div className={`eyebrow ${styles.infoNumLabel}`}>
            <span className="num">№ {p.id.split("-")[1] || p.id}</span>
          </div>
          <h2 className={styles.infoTitle}>
            {p.title}
            <span className={styles.infoAccent}>.</span>
          </h2>
        </div>

        <div
          className={`body ${styles.infoSummary} ${fullHeight ? styles.infoSummaryClamp : ""}`}
        >
          {p.summary ||
            `${p.role} on ${p.title} for ${p.client} — built with ${p.stack
              .slice(0, 3)
              .join(", ")}.`}
        </div>

        <div className={styles.infoMeta}>
          <div className={styles.infoTagsRow}>
            {p.stack.slice(0, 3).map((t, i) => (
              <span key={i} className={styles.infoTag}>
                {t}
              </span>
            ))}
          </div>
          {caseProj && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              className={`link-line ${styles.infoCaseBtn}`}
            >
              View case <span className="arr">↗</span>
            </button>
          )}
          {p.live && (
            <a
              href={`https://${p.live}`}
              target="_blank"
              rel="noreferrer"
              className={`link-line ${styles.infoLiveLink}`}
              onClick={(e) => e.stopPropagation()}
            >
              {p.live} <span className="arr">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
