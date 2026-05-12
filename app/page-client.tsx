"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/portfolio/Nav/Nav";
import { Hero } from "@/components/portfolio/Hero/Hero";
import { WorkSection } from "@/components/portfolio/Work/Work";
import { ServicesSection } from "@/components/portfolio/Services/Services";
import { Marquee } from "@/components/portfolio/Marquee/Marquee";
import { AboutSection } from "@/components/portfolio/About/About";
import { Booking } from "@/components/portfolio/Booking/Booking";
import { Footer } from "@/components/portfolio/Footer/Footer";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress/ScrollProgress";
import { MagneticCursor } from "@/components/portfolio/MagneticCursor/MagneticCursor";
import { PinnedShowcase } from "@/components/portfolio/PinnedShowcase/PinnedShowcase";
import { InvertOnEnter } from "@/components/portfolio/InvertOnEnter/InvertOnEnter";
import { CaseStudy } from "@/components/portfolio/CaseStudy/CaseStudy";
import { Divider } from "@/components/portfolio/Divider/Divider";
import type { FeaturedProject } from "@/lib/projects";

type Theme = "light" | "dark" | "red";

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

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("portfolio_theme", t);
    } catch {}
    document.documentElement.setAttribute("data-theme", t);
  };

  const scrollTo = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <>
      <ScrollProgress />
      <MagneticCursor />
      <Nav theme={theme} setTheme={setTheme} scrollTo={scrollTo} />

      <main id="home">
        <Hero variant="index" scrollTo={scrollTo} />

        <Divider tall />

        <Marquee />

        <WorkSection onOpen={setOpenCase} />

        <Divider />

        <PinnedShowcase />

        <Divider />

        <ServicesSection />

        <Divider />

        <InvertOnEnter theme="dark">
          <AboutSection />
        </InvertOnEnter>

        <Divider />

        <Booking />
      </main>

      <Footer />

      {openCase && <CaseStudy project={openCase} onClose={() => setOpenCase(null)} />}
    </>
  );
}
