"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import NeoLogo from "./NeoLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(-1);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Navbar");

  const navLinks = [
    { href: "/" as const, label: t("links.home") },
    { href: "/about" as const, label: t("links.about") },
    { href: "/projects" as const, label: t("links.projects") },
    { href: "/contact" as const, label: t("links.contact") },
  ];

  function switchLocale(newLocale: "en" | "fr" | "sr") {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  }

  useEffect(() => {
    const isMobile = () => window.innerWidth < 768;

    const handleScroll = () => {
      setNavVisible(true);
      setPastHero(window.scrollY > window.innerHeight * 0.8);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      if (!isMobile()) {
        scrollTimer.current = setTimeout(() => {
          if (window.scrollY > window.innerHeight * 0.5) setNavVisible(false);
        }, 1500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  return (
    <>
      {/* Fixed nav bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:p-10 transition-all duration-500 ${navVisible ? "opacity-100" : "opacity-0 pointer-events-none"} ${pastHero ? "bg-[#0a0a0a]/90 backdrop-blur-sm" : ""}`}>
        <Link href="/">
          <NeoLogo className="h-8 w-auto text-white" />
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="group flex cursor-pointer items-center gap-3 text-[20px] font-normal leading-[0.9] tracking-[-0.03em] text-white"
        >
          {t("menu")}
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="transition-transform duration-300 group-hover:rotate-45">
            <line x1="8.5" y1="0" x2="8.5" y2="6" stroke="currentColor" />
            <line x1="8.5" y1="11" x2="8.5" y2="17" stroke="currentColor" />
            <line x1="17" y1="8.5" x2="11" y2="8.5" stroke="currentColor" />
            <line x1="6" y1="8.5" x2="0" y2="8.5" stroke="currentColor" />
          </svg>
        </button>
      </nav>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 right-0 z-[100] md:inset-y-0 md:left-auto md:w-[700px] transition-all duration-500 ${
          isOpen
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-full opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#0a0a0a] md:rounded-tl-3xl md:border-l md:border-t md:border-white/10" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Top bar with close button */}
          <div className="flex h-[68px] shrink-0 items-center justify-end border-b border-white/10 md:h-[100px]">
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-[68px] w-[68px] cursor-pointer items-center justify-center border-l border-white/10 text-white transition-colors hover:text-white/70 md:h-[100px] md:w-[100px]"
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="rotate-45">
                <line x1="8.5" y1="0" x2="8.5" y2="6" stroke="currentColor" />
                <line x1="8.5" y1="11" x2="8.5" y2="17" stroke="currentColor" />
                <line x1="17" y1="8.5" x2="11" y2="8.5" stroke="currentColor" />
                <line x1="6" y1="8.5" x2="0" y2="8.5" stroke="currentColor" />
              </svg>
            </button>
          </div>
          {/* Links */}
          <div className="flex-1 flex flex-col justify-center px-10 md:px-16">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(-1)}
                  className="group flex items-center gap-3 text-4xl font-medium text-white transition-colors hover:text-white/70 md:text-5xl"
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="inline-block h-3 w-3 bg-white" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Social links */}
            <div className="mt-8 flex flex-col gap-1.5">
              <span className="text-sm font-light text-white/30">
                Instagram
              </span>
              <span className="text-sm font-light text-white/30">
                LinkedIn
              </span>
            </div>
          </div>

          {/* Decorative compass — half visible from right edge */}
          <div className="pointer-events-none absolute -right-[200px] top-1/2 -translate-y-1/2 md:-right-[300px]">
            <svg
              width="400"
              height="400"
              viewBox="0 0 600 600"
              fill="none"
              className="text-white/[0.08] md:h-[600px] md:w-[600px]"
            >
              {/* Outer ring + ticks — rotates on link hover */}
              <g
                style={{
                  transformOrigin: "300px 300px",
                  transform: `rotate(${hoveredLink >= 0 ? (hoveredLink + 1) * 45 : 0}deg)`,
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
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

              {/* Inner circle */}
              <circle cx="300" cy="300" r="113" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-10 pb-10 text-xs font-light text-white/40 md:px-16">
            <span>{t("copyright")}</span>
            <div className="flex gap-4">
              {(["en", "fr"] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`cursor-pointer transition-colors hover:text-white ${
                    locale === loc ? "text-white" : "text-white/40"
                  }`}
                >
                  {loc === "en" ? "En" : "Fr"}
                </button>
              ))}
            </div>
            <span>{t("location")}</span>
          </div>
        </div>
      </div>
    </>
  );
}
