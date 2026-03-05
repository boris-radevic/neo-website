"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function AnimatedGrid({ children, verticalLine = 46.15 }: { children?: ReactNode; verticalLine?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-y-0 inset-x-6 z-[1] border-x border-white/30"
    >
      {/* Vertical line — animates from right to position */}
      <div
        className="absolute top-0 h-full w-px bg-white/30 transition-[left] duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ left: animate ? `${verticalLine}%` : "100%" }}
      />
      {/* Horizontal line — animates from bottom to position */}
      <div
        className="absolute left-0 w-full h-px bg-white/30 transition-[top] duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ top: animate ? "33.33%" : "100%" }}
      />
      {/* + junction — fades in after lines arrive */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          left: `${verticalLine}%`,
          top: "33.33%",
          opacity: animate ? 1 : 0,
          transitionDelay: animate ? "1.8s" : "0s",
        }}
      >
        <line x1="0" y1="7" x2="14" y2="7" stroke="white" strokeWidth="1" />
        <line x1="7" y1="0" x2="7" y2="14" stroke="white" strokeWidth="1" />
      </svg>

      {/* Cell 1,1 content — fades in after lines finish */}
      {children && (
        <div
          className="pointer-events-auto absolute flex items-center justify-center p-6 md:p-8 transition-opacity duration-700"
          style={{
            left: 0,
            top: 0,
            width: `${verticalLine}%`,
            height: "33.33%",
            opacity: animate ? 1 : 0,
            transitionDelay: animate ? "1s" : "0s",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
