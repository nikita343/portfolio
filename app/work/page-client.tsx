"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/portfolio/Nav/Nav";
import { WorkGallery } from "@/components/portfolio/WorkGallery/WorkGallery";
import { WorkArchive } from "@/components/portfolio/WorkArchive/WorkArchive";
import { Booking } from "@/components/portfolio/Booking/Booking";
import { Footer } from "@/components/portfolio/Footer/Footer";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress/ScrollProgress";
import { MagneticCursor } from "@/components/portfolio/MagneticCursor/MagneticCursor";
import { CaseStudy } from "@/components/portfolio/CaseStudy/CaseStudy";
import { Divider } from "@/components/portfolio/Divider/Divider";
import { ALL_PROJECTS, type FeaturedProject } from "@/lib/projects";
import styles from "./page.module.css";

type Theme = "light" | "dark" | "red";

function WorkIntro() {
  const total = ALL_PROJECTS.length;
  const live = ALL_PROJECTS.filter((p) => p.status === "live").length;

  return (
    <section className={styles.intro}>
      <div className="container">
        <div className={`eyebrow ${styles.introLabel}`}>
          <span className="num">[ § WORK ]</span> 2022 — 2026 · {total} PROJECTS · {live} LIVE
        </div>
        <h1 className={`display ${styles.introHeading}`}>
          The <span className="italic">whole</span>
          <br />
          shelf<span className={styles.introAccent}>.</span>
        </h1>
        <div className={styles.introGrid}>
          <div className={styles.introCol1}>
            <div className="eyebrow">
              <span className="num">[ A ]</span> WHAT YOU&apos;RE LOOKING AT
            </div>
          </div>
          <div className={styles.introCol2}>
            <p className={`body-lg ${styles.introBody}`}>
              Five hero cases up top — the work I&apos;d lead with on a first call. Below them, the{" "}
              <span className="italic">full archive</span>: every project shipped between early
              2022 and today, filterable by year, role, stack, industry. Some are under NDA —
              those entries are redacted but counted.
            </p>
            <p className={`body-lg ${styles.introBody2}`}>
              I don&apos;t believe in curating away the volume. The volume{" "}
              <span className="italic">is</span> the case study.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const all = ALL_PROJECTS;
  const stats = [
    { v: all.length, l: "Projects shipped", sub: "2022 — 2026" },
    { v: all.filter((p) => p.status === "live").length, l: "Live in production", sub: "Across 4 years" },
    { v: all.filter((p) => p.lighthouse && p.lighthouse >= 95).length, l: "Lighthouse 95+", sub: "Performance verified" },
    { v: [...new Set(all.flatMap((p) => p.industry))].length, l: "Industries", sub: "Fintech to F&B" },
  ];
  return (
    <section className={styles.statsBand}>
      <div className={`container ${styles.statsBandInner}`}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div
              key={i}
              className={`${styles.statsCell} ${i === 0 ? styles.statsCellFirst : ""}`}
            >
              <div className={`tnum ${styles.statsValue}`}>{s.v}</div>
              <div className={`eyebrow ${styles.statsLabel}`}>{s.l}</div>
              <div className={`eyebrow ${styles.statsSub}`}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WorkPageClient() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [openCase, setOpenCase] = useState<FeaturedProject | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_theme");
      if (stored) {
        const t = stored.replace(/"/g, "") as Theme;
        setThemeState(t);
        document.documentElement.setAttribute("data-theme", t);
      }
    } catch {}
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("portfolio_theme", t);
    } catch {}
    document.documentElement.setAttribute("data-theme", t);
  };

  const scrollTo = (id: string) => {
    if (id === "home") {
      window.location.href = "/";
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal-line, .reveal-fade").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />
      <MagneticCursor />
      <Nav theme={theme} setTheme={setTheme} scrollTo={scrollTo} />

      <main id="home">
        <WorkIntro />
        <StatsBand />
        <Divider />
        <WorkGallery onOpen={setOpenCase} />
        <Divider tall />
        <WorkArchive onOpen={setOpenCase} />
        <Divider />
        <Booking />
      </main>

      <Footer />

      {openCase && <CaseStudy project={openCase} onClose={() => setOpenCase(null)} />}
    </>
  );
}
