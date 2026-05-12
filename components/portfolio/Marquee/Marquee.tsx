import { memo } from "react";
import styles from "./Marquee.module.css";

const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Webflow Partner",
  "GSAP",
  "Framer Motion",
  "Tailwind",
  "Storybook",
  "Figma → Code",
  "Headless CMS",
  "AI Interfaces",
  "Design Systems",
];

const ALL_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS];

const MarqueeImpl = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {ALL_ITEMS.map((it, i) => (
          <span key={i} className={styles.item}>
            {it}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
};

export const Marquee = memo(MarqueeImpl);
