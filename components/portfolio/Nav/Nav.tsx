"use client";

import { useState, useEffect } from "react";
import { getLenis } from "@/lib/smooth-scroll";
import styles from "./Nav.module.css";

type Theme = "light" | "dark" | "red";

interface ThemeMenuProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  scrollTo: (id: string) => void;
}

const MENU_ITEMS = [
  ["01", "Index", { type: "scroll", id: "home" }],
  ["02", "Selected work", { type: "href", href: "/work" }],
  ["03", "Services", { type: "scroll", id: "services" }],
  ["04", "About", { type: "scroll", id: "about" }],
  ["05", "Booking", { type: "scroll", id: "book" }],
] as const;

const THEME_SWATCHES = [
  { key: "light", label: "Light", sw: "#F1F1F3", text: "#161D25" },
  { key: "dark", label: "Dark", sw: "#161D25", text: "#F1F1F3" },
  { key: "red", label: "Signal", sw: "#FF003D", text: "#F1F1F3" },
] as const;

const ThemeMenu = ({ open, onClose, theme, setTheme, scrollTo }: ThemeMenuProps) => {
  return (
    <div className={styles.overlay} style={{ pointerEvents: open ? "auto" : "none" }}>
      <div
        onClick={onClose}
        className={styles.overlayBackdrop}
        style={{ opacity: open ? 0.96 : 0 }}
      />
      <div
        className={styles.overlayInner}
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        <div className={styles.overlayHeader}>
          <div className="eyebrow">
            <span className="num">[ MENU ]</span> NAVIGATION + APPEARANCE
          </div>
          <button onClick={onClose} className={`eyebrow ${styles.overlayClose}`}>
            CLOSE <span className={styles.overlayCloseX}>×</span>
          </button>
        </div>

        <div className={styles.cols}>
          <nav className={styles.menuList}>
            {MENU_ITEMS.map(([n, label, target]) => {
              const handleClick = () => {
                if (target.type === "href") {
                  window.location.href = target.href!;
                  return;
                }
                onClose();
                setTimeout(() => scrollTo(target.id!), 350);
              };
              return (
                <button key={n} onClick={handleClick} className={styles.menuItem}>
                  <span className={styles.menuItemNum}>[{n}]</span>
                  <span>
                    {label}
                    {target.type === "href" && <span className={styles.menuItemArr}>↗</span>}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className={styles.appearance}>
            <div className={`eyebrow ${styles.appearanceLabel}`}>
              <span className="num">[A]</span> APPEARANCE
            </div>
            <div className={styles.themeList}>
              {THEME_SWATCHES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTheme(t.key)}
                  className={`${styles.themeBtn} ${theme === t.key ? styles.themeBtnActive : ""}`}
                >
                  <span className={styles.themeSwatch} style={{ background: t.sw }}>
                    {theme === t.key && (
                      <span className={styles.themeSwatchDot} style={{ color: t.text }}>
                        ●
                      </span>
                    )}
                  </span>
                  <span className={styles.themeName}>{t.label}</span>
                  <span className="eyebrow">{t.key === theme ? "ACTIVE" : ""}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <span>Available — Q3 2026</span>
          <span>v.4.0 · Released May 2026</span>
        </div>
      </div>
    </div>
  );
};

interface NavProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  scrollTo: (id: string) => void;
}

export const Nav = ({ theme, setTheme, scrollTo }: NavProps) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const lenis = getLenis();
    if (lenis) {
      lenis.stop();
      return () => {
        window.removeEventListener("keydown", onKey);
        lenis.start();
      };
    }

    const { overflow, paddingRight } = document.body.style;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Warsaw",
      };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.logo}>
          <span className={styles.logoDot} />
          <span>
            MYKYTA&nbsp;K. <span style={{ opacity: 0.5 }}>· FE/REACT</span>
          </span>
        </div>
        <div className={styles.right}>
          <span className={styles.waw}>
            <span className={styles.wawDot} />
            WAW · {time}
          </span>
          <button className={styles.menuBtn} onClick={() => setOpen(true)}>
            <span className={styles.menuBtnBars}>
              <span />
              <span />
            </span>
            Menu
          </button>
        </div>
      </header>
      <ThemeMenu
        open={open}
        onClose={() => setOpen(false)}
        theme={theme}
        setTheme={setTheme}
        scrollTo={scrollTo}
      />
    </>
  );
};
