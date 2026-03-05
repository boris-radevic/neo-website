"use client";

import { useState, useEffect, useRef } from "react";

const VIEWPORT_CENTER_THRESHOLD = 0.5;
const UNPIN_HYSTERESIS = 80;

export default function StickyCompass({ children }: { children: React.ReactNode }) {
  const [isPinned, setIsPinned] = useState(false);
  const pinScrollY = useRef(0);
  const lastScrollY = useRef(0);
  const compassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const goingDown = scrollY > lastScrollY.current;
      lastScrollY.current = scrollY;

      const el = compassRef.current;
      if (!el) return;

      if (isPinned) {
        if (scrollY < pinScrollY.current - UNPIN_HYSTERESIS) {
          setIsPinned(false);
        }
        return;
      }

      const rect = el.getBoundingClientRect();
      const compassCenterY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight * VIEWPORT_CENTER_THRESHOLD;

      if (goingDown && compassCenterY <= viewportCenter) {
        setIsPinned(true);
        pinScrollY.current = scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPinned]);

  return (
    <div
      ref={compassRef}
      className={
        isPinned
          ? "pointer-events-none fixed left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex"
          : "pointer-events-none absolute inset-0 hidden -translate-y-[520px] items-center justify-center md:flex"
      }
    >
      {children}
    </div>
  );
}
