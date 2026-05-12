"use client";

import { useState, useEffect, useRef } from "react";
import { HERO_PROJECTS, type ArchiveProject, type FeaturedProject } from "@/lib/projects";
import { HeroTile } from "./HeroTile";
import styles from "./WorkGallery.module.css";

const MobileGallery = ({
  heroes,
  onOpen,
}: {
  heroes: ArchiveProject[];
  onOpen: (p: FeaturedProject) => void;
}) => (
  <section className={styles.mobileWrap}>
    <div className="container">
      <div className={styles.mobileCounter}>
        <span>◉ FEATURED · {heroes.length} cases</span>
        <span className="tnum">
          {String(heroes.length).padStart(2, "0")} / {String(heroes.length).padStart(2, "0")}
        </span>
      </div>
      <div className={styles.mobileStack}>
        {heroes.map((p, i) => (
          <div
            key={p.id}
            className={`${styles.mobileItem} ${i === 0 ? styles.mobileItemFirst : ""}`}
          >
            <HeroTile p={p} idx={i} total={heroes.length} onOpen={onOpen} fullHeight={false} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DesktopGallery = ({
  heroes,
  onOpen,
}: {
  heroes: ArchiveProject[];
  onOpen: (p: FeaturedProject) => void;
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isShortViewport, setIsShortViewport] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || heroes.length === 0) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(0.999, -rect.top / scrollable));
      const idx = Math.floor(progress * heroes.length);
      setActiveIdx(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroes.length]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-height: 1000px)");
    const update = () => setIsShortViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollToIdx = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const targetY = section.offsetTop + i * window.innerHeight + 4;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.desktopWrap}
      style={{ height: `${heroes.length * 100}vh` }}
    >
      <div className={styles.desktopSticky}>
        <div className={styles.desktopCounter}>
          <span>◉ FEATURED · {heroes.length} cases</span>
          <span className="tnum">
            {String(activeIdx + 1).padStart(2, "0")} / {String(heroes.length).padStart(2, "0")}
          </span>
        </div>

        <div className={`container ${styles.desktopTileContainer}`}>
          {heroes.map((p, i) => (
            <div
              key={p.id}
              className={styles.desktopTile}
              style={{
                opacity: i === activeIdx ? 1 : 0,
                pointerEvents: i === activeIdx ? "auto" : "none",
              }}
            >
              <HeroTile
                p={p}
                idx={i}
                total={heroes.length}
                onOpen={onOpen}
                useLongImage={isShortViewport}
              />
            </div>
          ))}
        </div>

        <div className={styles.desktopDots}>
          {heroes.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to project ${i + 1}`}
              className={styles.desktopDot}
              style={{
                width: i === activeIdx ? 18 : 8,
                background: i === activeIdx ? "var(--accent)" : "var(--line-strong)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const WorkGallery = ({ onOpen }: { onOpen: (p: FeaturedProject) => void }) => {
  const heroes = HERO_PROJECTS;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (heroes.length === 0) return null;

  return isMobile ? (
    <MobileGallery heroes={heroes} onOpen={onOpen} />
  ) : (
    <DesktopGallery heroes={heroes} onOpen={onOpen} />
  );
};
