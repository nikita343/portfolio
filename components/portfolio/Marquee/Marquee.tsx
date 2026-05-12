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

export const Marquee = () => {
  const all = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {all.map((it, i) => (
          <span key={i} className={styles.item}>
            {it}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
};
