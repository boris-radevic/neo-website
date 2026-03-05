"use client";

import { useEffect, useRef } from "react";

export default function ScrollCompass({ fadeOut = false }: { fadeOut?: boolean } = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<SVGGElement>(null);
  const innerRef = useRef<SVGGElement>(null);
  const fadeOutRef = useRef(fadeOut);
  fadeOutRef.current = fadeOut;

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const section = container.closest("section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const vh = window.innerHeight;

      // progress 0→1 as section scrolls through viewport
      const scrolled = vh - rect.top;
      const total = sectionHeight + vh;
      const p = Math.max(0, Math.min(1, scrolled / total));

      // Outer: 2 full rotations over section scroll
      const rotation = p * 720;
      if (outerRef.current) {
        outerRef.current.style.transform = `rotate(${rotation}deg)`;
      }

      // Inner: breathe 3 cycles (scale 0.8–1.2, opacity 0.4–1)
      const breathe = Math.sin(p * Math.PI * 6);
      const scale = 1 + breathe * 0.2;
      const opacity = 0.5 + (1 + breathe) * 0.25;
      if (innerRef.current) {
        innerRef.current.style.transform = `scale(${scale})`;
        innerRef.current.style.opacity = String(opacity);
      }

      // Fade out the whole compass as section bottom approaches viewport bottom
      if (fadeOutRef.current) {
        const distToBottom = rect.bottom - vh;
        // Start fading 300px before section ends, fully gone when section bottom hits viewport
        const fadeOpacity = distToBottom > 300 ? 1 : distToBottom < 0 ? 0 : distToBottom / 300;
        container.style.opacity = String(fadeOpacity);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none sticky top-0 z-[1] -mb-[100vh] hidden h-screen items-center justify-center md:flex"
    >
      <svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        className="text-white/[0.08]"
      >
        {/* Outer ring + ticks — rotates on scroll */}
        <g ref={outerRef} style={{ transformOrigin: "300px 300px" }}>
          <circle cx="300" cy="300" r="257" stroke="currentColor" strokeWidth="2" />
          {Array.from({ length: 180 }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / 180;
            const isMajor = i % 15 === 0;
            const isMid = i % 5 === 0;
            const innerR = isMajor ? 220 : isMid ? 232 : 240;
            const x1 = Math.round(300 + innerR * Math.cos(angle));
            const y1 = Math.round(300 + innerR * Math.sin(angle));
            const x2 = Math.round(300 + 255 * Math.cos(angle));
            const y2 = Math.round(300 + 255 * Math.sin(angle));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth={isMajor ? "1.5" : isMid ? "1" : "0.5"}
              />
            );
          })}
        </g>

        {/* Inner circle — breathes on scroll */}
        <g ref={innerRef} style={{ transformOrigin: "300px 300px" }}>
          <circle cx="300" cy="300" r="113" stroke="currentColor" strokeWidth="2" />
        </g>

        {/* NEO logo — static */}
        <g transform="translate(300, 300) scale(2.2) translate(-144.5, -25.43)">
          <path
            opacity="0.8"
            d="M144.5 0.117188C140.921 0.117188 137.505 0.842771 134.414 2.173L141.287 11.6056C142.304 11.3637 143.402 11.2428 144.5 11.2428C152.39 11.2428 158.816 17.6118 158.816 25.4319C158.816 28.1327 158.043 30.6722 156.742 32.8087L163.615 42.2412C167.601 37.7668 170.041 31.8815 170.041 25.4319C170.041 11.4846 158.572 0.117188 144.5 0.117188Z"
            fill="white"
          />
          <path
            opacity="0.8"
            d="M144.502 39.6234C136.612 39.6234 130.186 33.2545 130.186 25.4343C130.186 22.7335 130.959 20.194 132.26 18.0576L125.387 8.625C121.401 13.0994 118.961 18.9847 118.961 25.4343C118.961 39.4219 130.389 50.749 144.502 50.749C148.081 50.749 151.497 50.0234 154.588 48.6932L147.715 39.2607C146.657 39.5025 145.6 39.6234 144.502 39.6234Z"
            fill="white"
          />
        </g>
      </svg>
    </div>
  );
}
