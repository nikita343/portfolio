"use client";

import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { Nav } from "@/components/portfolio/Nav/Nav";
import { Hero } from "@/components/portfolio/Hero/Hero";
import { Marquee } from "@/components/portfolio/Marquee/Marquee";
import { Divider } from "@/components/portfolio/Divider/Divider";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress/ScrollProgress";
import { MagneticCursor } from "@/components/portfolio/MagneticCursor/MagneticCursor";
import type { FeaturedProject } from "@/lib/projects";

const WorkSection = lazy(() =>
  import("@/components/portfolio/Work/Work").then((m) => ({ default: m.WorkSection })),
);
const PinnedShowcase = lazy(() =>
  import("@/components/portfolio/PinnedShowcase/PinnedShowcase").then((m) => ({
    default: m.PinnedShowcase,
  })),
);
const ServicesSection = lazy(() =>
  import("@/components/portfolio/Services/Services").then((m) => ({
    default: m.ServicesSection,
  })),
);
const AboutSection = lazy(() =>
  import("@/components/portfolio/About/About").then((m) => ({ default: m.AboutSection })),
);
const InvertOnEnter = lazy(() =>
  import("@/components/portfolio/InvertOnEnter/InvertOnEnter").then((m) => ({
    default: m.InvertOnEnter,
  })),
);
const Booking = lazy(() =>
  import("@/components/portfolio/Booking/Booking").then((m) => ({ default: m.Booking })),
);
const Footer = lazy(() =>
  import("@/components/portfolio/Footer/Footer").then((m) => ({ default: m.Footer })),
);
const CaseStudy = lazy(() =>
  import("@/components/portfolio/CaseStudy/CaseStudy").then((m) => ({ default: m.CaseStudy })),
);

type Theme = "light" | "dark" | "red";

const SectionFallback = ({ minHeight = 400 }: { minHeight?: number }) => (
  <div aria-hidden="true" style={{ minHeight, width: "100%" }} />
);

export default function HomeClient() {
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

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("portfolio_theme", t);
    } catch {}
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const scrollTo = useCallback((id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

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

    const observe = () => {
      document.querySelectorAll(".reveal-line, .reveal-fade").forEach((n) => {
        if (!n.classList.contains("in")) io.observe(n);
      });
    };
    observe();
    const interval = setInterval(observe, 800);
    return () => {
      clearInterval(interval);
      io.disconnect();
    };
  }, []);

  const handleClose = useCallback(() => setOpenCase(null), []);

  return (
    <>
      <ScrollProgress />
      <MagneticCursor />
      <Nav theme={theme} setTheme={setTheme} scrollTo={scrollTo} />

      <main id="home">
        <Hero variant="index" scrollTo={scrollTo} />

        <Divider tall />

        <Marquee />

        <Suspense fallback={<SectionFallback minHeight={600} />}>
          <WorkSection onOpen={setOpenCase} />
        </Suspense>

        <Divider />

        <Suspense fallback={<SectionFallback minHeight={800} />}>
          <PinnedShowcase />
        </Suspense>

        <Divider />

        <Suspense fallback={<SectionFallback minHeight={600} />}>
          <ServicesSection />
        </Suspense>

        <Divider />

        <Suspense fallback={<SectionFallback minHeight={600} />}>
          <InvertOnEnter theme="dark">
            <AboutSection />
          </InvertOnEnter>
        </Suspense>

        <Divider />

        <Suspense fallback={<SectionFallback minHeight={800} />}>
          <Booking />
        </Suspense>
      </main>

      <Suspense fallback={<SectionFallback minHeight={300} />}>
        <Footer />
      </Suspense>

      {openCase && (
        <Suspense fallback={null}>
          <CaseStudy project={openCase} onClose={handleClose} />
        </Suspense>
      )}
    </>
  );
}
