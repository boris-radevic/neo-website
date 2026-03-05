"use client";

import { useState, useEffect } from "react";

const CLIP_PATH = "polygon(80px 0, 100% 0, 100% calc(100% - 80px), calc(100% - 80px) 100%, 0 100%, 0 80px)";

type Props = {
  title: string;
  description: string;
  cardId: number;
  expanded?: boolean;
  onToggle?: () => void;
};

export default function ExpandableServiceCard({ title, description, cardId, expanded, onToggle }: Props) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const maskRight = `expandable-card-${cardId}-arrow-right-mask`;
  const maskExpand = `expandable-card-${cardId}-arrow-expand-mask`;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isOpen = isMobile ? (expanded ?? false) : hovered;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => isMobile && onToggle?.()}
    >
      {/* Diagonale u uglovima */}
      <svg className="pointer-events-none absolute left-0 top-0 z-20" width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden>
        <line
          x1="0"
          y1="80"
          x2="80"
          y2="0"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          className="transition-colors duration-300 group-hover:stroke-white/20"
        />
      </svg>
      <svg className="pointer-events-none absolute bottom-0 right-0 z-20" width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden>
        <line
          x1="80"
          y1="0"
          x2="0"
          y2="80"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          className="transition-colors duration-300 group-hover:stroke-white/20"
        />
      </svg>

      <div
        className="relative flex min-h-[180px] flex-col justify-between overflow-hidden bg-black/[0.12] p-8 backdrop-blur-md transition-[min-height] duration-500 ease-out lg:min-h-[200px]"
        style={{
          clipPath: CLIP_PATH,
          minHeight: isOpen ? 280 : undefined,
          transition: "min-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className="absolute inset-0 transition-shadow duration-400 ease-out"
          style={{
            boxShadow: isOpen ? "inset 0 0 0 1px rgba(255,255,255,0.3)" : "inset 0 0 0 1px rgba(255,255,255,0.2)",
          }}
        />
        <div className="absolute inset-0 p-8 pt-8">
          <div className="flex justify-end">
            <span
              className="relative flex h-14 w-14 shrink-0 items-center justify-center text-white/50 transition-colors duration-300 group-hover:text-white/95"
              aria-hidden
            >
              {/* Strelica desno (default) */}
              <span
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: isOpen ? 0 : 1 }}
              >
                <svg width="32" height="33" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <g opacity="0.3">
                    <mask id={maskRight} fill="white">
                      <path d="M0 0H48V50H0V0Z" />
                    </mask>
                    <path d="M0 0V1H48V0V-1H0V0ZM48 50V49H0V50V51H48V50Z" fill="white" mask={`url(#${maskRight})`} />
                    <line x1="0.5" y1="41" x2="0.5" y2="49" stroke="white" />
                    <line x1="0.5" y1="1" x2="0.5" y2="9" stroke="white" />
                    <line y1="-0.5" x2="8" y2="-0.5" transform="matrix(0 1 -0.999922 0.012499 47 41)" stroke="white" />
                    <line y1="-0.5" x2="8" y2="-0.5" transform="matrix(0 1 -0.999922 0.012499 47 1)" stroke="white" />
                    <path d="M17 25H31" stroke="white" strokeLinecap="square" strokeLinejoin="round" />
                    <path d="M25 18L32 25L25 32" stroke="white" strokeLinecap="square" strokeLinejoin="round" />
                  </g>
                </svg>
              </span>
              {/* Strelica gore-desno (hover) – svetlija */}
              <span
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: isOpen ? 1 : 0 }}
              >
                <svg width="32" height="33" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <g opacity="0.6">
                    <mask id={maskExpand} fill="white">
                      <path d="M0 0H48V50H0V0Z" />
                    </mask>
                    <path d="M0 0V1H48V0V-1H0V0ZM48 50V49H0V50V51H48V50Z" fill="white" mask={`url(#${maskExpand})`} />
                    <line x1="0.5" y1="41" x2="0.5" y2="49" stroke="white" />
                    <line x1="0.5" y1="1" x2="0.5" y2="9" stroke="white" />
                    <line y1="-0.5" x2="8" y2="-0.5" transform="matrix(0 1 -0.999922 0.012499 47 41)" stroke="white" />
                    <line y1="-0.5" x2="8" y2="-0.5" transform="matrix(0 1 -0.999922 0.012499 47 1)" stroke="white" />
                    <line x1="24.5" y1="42" x2="24.5" y2="50" stroke="white" />
                    <line x1="24.5" y1="-2.18557e-08" x2="24.5" y2="8" stroke="white" />
                    <line y1="-0.5" x2="8" y2="-0.5" transform="matrix(0 1 -0.999922 0.012499 24 41)" stroke="white" />
                    <line y1="-0.5" x2="8" y2="-0.5" transform="matrix(0 1 -0.999922 0.012499 24 1)" stroke="white" />
                    <path d="M19.0498 29.9531L28.9493 20.0536" stroke="white" strokeLinecap="square" strokeLinejoin="round" />
                    <path d="M19.7568 19.3438H29.6563V29.2432" stroke="white" strokeLinecap="square" strokeLinejoin="round" />
                  </g>
                </svg>
              </span>
            </span>
          </div>

          <div className="relative mt-4 min-h-[120px]">
            <p
              className="max-w-[480px] font-inter text-[16px] font-light leading-[0.9] tracking-[-0.02em] text-white/90 transition-opacity duration-300 md:text-[20px]"
              style={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? "none" : "auto" }}
            >
              {title}
            </p>
            <p
              className="font-inter absolute left-0 top-0 max-w-[480px] text-[14px] font-light leading-[1.2] tracking-[-0.02em] text-white/80 transition-opacity duration-300 md:text-[16px]"
              style={{
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
