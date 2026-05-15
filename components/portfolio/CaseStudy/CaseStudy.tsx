"use client";

import { useState, useEffect } from "react";
import { PROJECTS, type FeaturedProject } from "@/lib/projects";
import { getLenis } from "@/lib/smooth-scroll";
import styles from "./CaseStudy.module.css";

interface CaseImageProps {
  src?: string;
  label: string;
  aspectRatio?: string;
  className?: string;
}

const CaseImage = ({ src, label, aspectRatio = "16 / 9", className }: CaseImageProps) => {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  if (showPlaceholder) {
    return (
      <div className={`placeholder ${className || ""}`} style={{ aspectRatio }}>
        <span className="ph-label">{label}</span>
      </div>
    );
  }
  return (
    <div className={`${styles.placeholderImg} ${className || ""}`} style={{ aspectRatio }}>
      <img src={src} alt={label} onError={() => setFailed(true)} />
    </div>
  );
};

interface CaseStudyProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

export const CaseStudy = ({ project, onClose }: CaseStudyProps) => {
  useEffect(() => {
    if (!project) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
    return () => {
      if (lenis) lenis.start();
      else document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;
  const p = project;
  const cs = p.caseStudy || {};
  const gallery = p.gallery || [];

  const brief = cs.brief || {};
  const approach = cs.approach || [];
  const outcome = cs.outcome || {};
  const quote = cs.quote || {};

  return (
    <div className={styles.overlay}>
      <div className={styles.closeBar}>
        <div className="eyebrow">
          <span className="num">[ CASE STUDY · {p.n} ]</span> {p.title.toUpperCase()}
        </div>
        <button onClick={onClose} className={`eyebrow ${styles.closeBtn}`}>
          CLOSE <span className={styles.closeX}>×</span>
        </button>
      </div>

      <div className={`container ${styles.body}`}>
        <div className={styles.heroBlock}>
          <div className={styles.heroMeta}>
            {[
              ["CLIENT", p.title],
              ["ROLE", p.role],
              ["YEAR", p.year],
              ["STACK", p.tags.join(" · ")],
            ].map(([label, value]) => (
              <div key={label}>
                <div className={`eyebrow ${styles.heroMetaLabel}`}>{label}</div>
                <div className={styles.heroMetaValue}>{value}</div>
              </div>
            ))}
          </div>

          <h1 className={`display-md ${styles.heroHeading}`}>
            {p.title}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className={`body-lg ${styles.heroSummary}`}>{p.summary}</p>
        </div>

        <CaseImage
          src={p.hero}
          label={`${p.label} · HERO IMAGE`}
          aspectRatio="16 / 9"
          className={styles.heroImage}
        />

        <div
          className={`metrics-row ${styles.metricsRow}`}
          style={{ gridTemplateColumns: `repeat(${p.metrics.length + 1}, 1fr)` }}
        >
          <div>
            <div className="eyebrow">
              <span className="num">[ A ]</span> AT A GLANCE
            </div>
          </div>
          {p.metrics.map((m, i) => (
            <div key={i}>
              <div className={`display-md tnum ${styles.metricValue}`}>{m.v}</div>
              <div className={`body ${styles.metricLabel}`}>{m.l}</div>
            </div>
          ))}
        </div>

        {(brief.lede || brief.body) && (
          <div data-grid12="" className={styles.sectionGrid}>
            <div className={styles.sectionLabel}>
              <div className="eyebrow">
                <span className="num">[ B ]</span> THE BRIEF
              </div>
            </div>
            <div className={styles.sectionBody}>
              {brief.lede && <p className={`display-md ${styles.briefLede}`}>{brief.lede}</p>}
              {brief.body && <p className={`body-lg ${styles.briefBody}`}>{brief.body}</p>}
            </div>
          </div>
        )}

        {gallery.length > 0 && (
          <div data-grid12="" className={styles.sectionGrid}>
            {gallery.map((img, i) => (
              <div key={i} style={{ gridColumn: `span ${img.span || 6}` }}>
                <CaseImage
                  src={img.src}
                  label={img.label || `IMAGE ${String(i + 1).padStart(2, "0")}`}
                  aspectRatio={img.aspect || "4/3"}
                />
              </div>
            ))}
          </div>
        )}

        {approach.length > 0 && (
          <div data-grid12="" className={styles.sectionGrid}>
            <div className={styles.sectionLabel}>
              <div className="eyebrow">
                <span className="num">[ C ]</span> APPROACH
              </div>
            </div>
            <div className={styles.sectionBody}>
              {approach.map((s) => (
                <div key={s.n} className={styles.approachRow}>
                  <div className={`eyebrow tnum ${styles.approachNum}`}>[{s.n}]</div>
                  <div>
                    <div className={`h3 ${styles.approachTitle}`}>{s.t}</div>
                    <p className={`body ${styles.approachBody}`}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {quote.text && (
          <div className={styles.quote}>
            <div className="container" style={{ padding: 0 }}>
              <p className={`display-md ${styles.quoteText}`}>
                <span className={styles.quoteItalic}>&ldquo;</span>
                {quote.text}
                <span className={styles.quoteItalic}>&rdquo;</span>
              </p>
              <div className={styles.quoteByline}>
                <div className={styles.quoteAvatar} />
                <div>
                  <div className={styles.quoteAuthor}>{quote.author || "—"}</div>
                  <div className="eyebrow">{quote.role || p.title}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(outcome.lede || outcome.liveUrl) && (
          <div data-grid12="" className={styles.sectionGrid} style={{ marginBottom: 0 }}>
            <div className={styles.sectionLabel}>
              <div className="eyebrow">
                <span className="num">[ D ]</span> OUTCOME
              </div>
            </div>
            <div className={styles.sectionBody}>
              {outcome.lede && <p className={`display-md ${styles.outcomeLede}`}>{outcome.lede}</p>}
              {outcome.liveUrl && (
                <a
                  href={outcome.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line"
                  style={{ fontSize: 14 }}
                >
                  Visit live project <span className="arr">↗</span>
                </a>
              )}
            </div>
          </div>
        )}

        <div className={styles.nextCase}>
          <div>
            <div className={`eyebrow ${styles.nextCaseLabel}`}>NEXT CASE</div>
            <div className="h2">
              {(() => {
                const idx = PROJECTS.findIndex((x) => x.id === p.id);
                const next = PROJECTS[(idx + 1) % PROJECTS.length];
                return next.title;
              })()}
            </div>
          </div>
          <button onClick={onClose} className="link-line" style={{ fontSize: 14 }}>
            Back to index <span className="arr">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};
