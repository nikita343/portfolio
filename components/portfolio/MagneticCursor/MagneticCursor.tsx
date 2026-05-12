"use client";

import { memo, useEffect, useRef, useState } from "react";
import styles from "./MagneticCursor.module.css";

const MagneticCursorImpl = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, hover: false, label: "" });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const s = stateRef.current;

    const onMove = (e: MouseEvent) => {
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (ref.current) ref.current.style.opacity = "1";
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest?.(
        "a, button, [data-cursor]",
      ) as HTMLElement | null;
      const label = interactive?.dataset?.cursor || "";
      if (!!interactive !== s.hover || label !== s.label) {
        s.hover = !!interactive;
        s.label = label;
        if (dotRef.current) {
          dotRef.current.style.transform = s.hover
            ? "translate(-50%, -50%) scale(2.4)"
            : "translate(-50%, -50%) scale(1)";
        }
        if (labelRef.current) {
          labelRef.current.textContent = label;
          labelRef.current.style.opacity = label ? "1" : "0";
        }
      }
    };
    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let raf: number;
    const tick = () => {
      s.x += (s.tx - s.x) * 0.18;
      s.y += (s.ty - s.y) * 0.18;
      if (ref.current) ref.current.style.transform = `translate(${s.x}px, ${s.y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} className={styles.cursor}>
      <div ref={dotRef} className={styles.dot} />
      <div ref={labelRef} className={styles.label} />
    </div>
  );
};

export const MagneticCursor = memo(MagneticCursorImpl);
