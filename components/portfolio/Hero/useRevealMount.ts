"use client";

import { useEffect, useState } from "react";

/** Returns true after the next animation frame — used to trigger reveal CSS transforms. */
export function useRevealMount() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);
  return mounted;
}

/** Inline transform helper for reveal-line spans. */
export const revealStyle = (delay: string, mounted: boolean) => ({
  transitionDelay: delay,
  transform: mounted ? "translateY(0)" : "translateY(105%)",
});
