"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface InvertOnEnterProps {
  children: ReactNode;
  theme?: "dark" | "light";
}

export const InvertOnEnter = ({ children, theme = "dark" }: InvertOnEnterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.5) {
          el.dataset.localTheme = theme;
        } else {
          delete el.dataset.localTheme;
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [theme]);

  return (
    <div ref={ref} className="invert-zone">
      {children}
    </div>
  );
};
