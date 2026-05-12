"use client";

import styles from "./Hero.module.css";

export const FeatureCard = ({ scrollTo }: { scrollTo: (id: string) => void }) => (
  <button onClick={() => scrollTo("work")} className={styles.featureCard}>
    <div className={`placeholder ${styles.featurePlaceholder}`}>
      <span className="ph-label">FEATURED · FRAME.SO — DASHBOARD UI</span>
      <div className={styles.featureGradient}>
        <div className="eyebrow">[ FEATURED CASE — 01 ]</div>
        <div className={`h3 ${styles.featureH3}`}>Frame.so</div>
        <div className={styles.featureMeta}>Notion-like editor · AI features · Whiteboard</div>
        <div className={`link-line ${styles.featureLink}`}>
          View case <span className="arr">↗</span>
        </div>
      </div>
    </div>
  </button>
);
