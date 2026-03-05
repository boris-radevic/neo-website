"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBorderLines() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    let raf: number;
    let phaseStart = performance.now();
    let fromOffset = 0;
    let toOffset = 0;
    let duration = 0;

    const randRange = (min: number, max: number) => min + Math.random() * (max - min);

    const pickNext = () => {
      fromOffset = toOffset;
      toOffset = randRange(-60, 60);
      const distance = Math.abs(toOffset - fromOffset);
      duration = randRange(800, 2000) * (distance / 60);
      duration = Math.max(500, Math.min(3000, duration));
      phaseStart = performance.now();
    };

    pickNext();

    const animate = (t: number) => {
      const elapsed = t - phaseStart;
      const p = Math.min(1, elapsed / duration);
      const ease = 0.5 - 0.5 * Math.cos(p * Math.PI);

      const offset = fromOffset + (toOffset - fromOffset) * ease;
      el.style.transform = `translateX(${offset}px)`;

      if (p >= 1) pickNext();

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      <div
        ref={stripRef}
        className="pointer-events-none flex"
        style={{ marginLeft: -70, marginRight: -70, justifyContent: "space-between" }}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          const isLong = i % 2 === 0;
          return (
            <div
              key={i}
              className={`w-px shrink-0 bg-white/10 ${!isLong ? "hidden md:block" : ""}`}
              style={{
                height: isLong ? 32 : 16,
                alignSelf: "flex-end",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
