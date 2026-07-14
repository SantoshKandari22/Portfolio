"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element with a fade/slide-up transition the first time
 * it enters the viewport. Respects prefers-reduced-motion via CSS
 * (see globals.css) rather than disabling the observer itself.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
