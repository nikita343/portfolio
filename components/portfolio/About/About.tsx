import styles from "./About.module.css";

const STACK = [
  "React, Next.js, TypeScript",
  "Tailwind, SCSS, Framer Motion, GSAP",
  "Redux, Zustand, REST API, Jest",
  "SEO, WCAG, RWD, Figma, Git/CI/CD",
];

const RECOGNITION = [
  "Webflow Partner — 2023",
  "30+ 5-star client reviews",
  "Upwork · Top Rated · 100% Job Success",
  "5y professional · since 2021",
];

export const AboutSection = () => {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div data-grid12="" className={styles.grid}>
          <div className={styles.label}>
            <div className="eyebrow">
              <span className="num">[04]</span> ABOUT
            </div>
          </div>

          <div className={styles.portraitCol}>
            <div className={styles.portrait}>
              <img
                src="/assets/selfportrait.avif"
                alt="Mykyta K. — portrait, Warsaw studio, 2026"
                loading="lazy"
                className={styles.portraitImg}
              />
            </div>
            <div className={styles.portraitCaption}>
              <span>Fig. A — Portrait, Warsaw Studio, 2026</span>
              <span>WAW / 52.2°N · 21.0°E</span>
            </div>
          </div>

          <div className={styles.copyCol}>
            <h2 className={`h2 ${styles.heading}`}>
              Frontend developer focused on{" "}
              <span className="italic">React, Next.js, and TypeScript</span> —
              comfortable taking real product features from Figma to production.
            </h2>
            <p className={`body-lg ${styles.lede}`}>
              Recent work includes a Notion-like app with AI features and a
              creator analytics dashboard, so there&apos;s experience with
              complex UIs, state management, and integrating APIs. I care about
              clean data flows, performance, and code that other engineers
              actually want to touch.
            </p>
            <p className={`body-lg ${styles.lede2}`}>
              Looking for a full-time role in a product team — and available for
              selected freelance projects in the meantime.
            </p>

            <div className={styles.stackGrid}>
              <div>
                <div className={`eyebrow ${styles.stackLabel}`}>
                  STACK · DAILY
                </div>
                <ul className={styles.stackList}>
                  {STACK.map((s, i) => (
                    <li
                      key={s}
                      className={
                        i < STACK.length - 1 ? styles.stackItem : undefined
                      }
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className={`eyebrow ${styles.stackLabel}`}>
                  RECOGNITION
                </div>
                <ul className={styles.stackList}>
                  {RECOGNITION.map((s, i) => (
                    <li
                      key={s}
                      className={
                        i < RECOGNITION.length - 1
                          ? styles.stackItem
                          : undefined
                      }
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
