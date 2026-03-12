import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import NeoLogo from "./NeoLogo";
import NeoWordmark from "./NeoWordmark";

type JunctionVariant = "top" | "middle" | "bottom";

function Junction({
  variant,
  className,
}: {
  variant: JunctionVariant;
  className?: string;
}) {
  const size = 14;
  const half = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`absolute z-10 hidden md:block ${className ?? ""}`}
    >
      {/* Horizontal line — always full */}
      <line x1="0" y1={half} x2={size} y2={half} stroke="white" strokeOpacity="1" strokeWidth="1" />
      {/* Vertical top arm — hidden for "top" variant */}
      {variant !== "top" && (
        <line x1={half} y1="0" x2={half} y2={half} stroke="white" strokeOpacity="1" strokeWidth="1" />
      )}
      {/* Vertical bottom arm — hidden for "bottom" variant */}
      {variant !== "bottom" && (
        <line x1={half} y1={half} x2={half} y2={size} stroke="white" strokeOpacity="1" strokeWidth="1" />
      )}
    </svg>
  );
}

export default async function Footer() {
  const t = await getTranslations("Footer");
  return (
    <footer className="relative z-[2] bg-[#0a0a0a] pb-10 md:pb-16">
      {/* 2x3 Grid */}
      <div className="relative grid grid-cols-1 border-y border-white/30 md:grid-cols-3 md:grid-rows-[1fr_1fr]">
        {/* Top junctions (T shape — no top arm) */}
        <Junction variant="top" className="left-1/3 top-0 -translate-x-1/2 -translate-y-1/2" />
        <Junction variant="top" className="left-2/3 top-0 -translate-x-1/2 -translate-y-1/2" />
        {/* Middle junctions (full +) */}
        <Junction variant="middle" className="left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Junction variant="middle" className="left-2/3 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        {/* Bottom junctions (inverted T — no bottom arm) */}
        <Junction variant="bottom" className="left-1/3 bottom-0 -translate-x-1/2 translate-y-1/2" />
        <Junction variant="bottom" className="left-2/3 bottom-0 -translate-x-1/2 translate-y-1/2" />

        {/* Row 1, Cell 1 — Logo */}
        <div className="flex flex-col items-center justify-center gap-3 border-b border-white/30 p-8 md:items-start md:border-r md:border-white/30 md:p-10">
          <NeoLogo className="w-[170px] text-white" />
          <NeoWordmark className="w-[170px] text-white" />
        </div>

        {/* Row 1, Cell 2 — Empty / decorative */}
        <div className="hidden border-b border-white/30 md:flex md:items-start md:justify-center md:border-r md:pt-0 md:px-10 md:pb-10">
          {/* Decorative vertical lines */}
          <div className="flex gap-[10px]">
            {[24, 12, 24, 12, 24, 12, 24].map((h, i) => (
              <div
                key={i}
                className="w-px bg-white/30"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

        {/* Row 1, Cell 3 — Email button */}
        <div className="hidden items-center justify-end border-b border-white/30 p-8 md:flex md:p-10">
          <a
            href="mailto:office@neo.co.rs"
            className="group relative flex h-[50px] w-[200px] items-stretch"
          >
            {/* Button frame: solid horizontal, split vertical (corner brackets) */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >
              {/* Top line — solid */}
              <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1" />
              {/* Bottom line — solid */}
              <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="1" />
              {/* Left line — top segment */}
              <line x1="0" y1="0" x2="0" y2="25%" stroke="white" strokeWidth="1" />
              {/* Left line — bottom segment */}
              <line x1="0" y1="75%" x2="0" y2="100%" stroke="white" strokeWidth="1" />
              {/* Right line — top segment */}
              <line x1="100%" y1="0" x2="100%" y2="25%" stroke="white" strokeWidth="1" />
              {/* Right line — bottom segment */}
              <line x1="100%" y1="75%" x2="100%" y2="100%" stroke="white" strokeWidth="1" />
            </svg>

            <span className="flex flex-1 items-center px-5 text-sm font-light text-white">
              office@neo.co.rs
            </span>
            {/* Divider — same split pattern */}
            <span className="relative flex w-px items-stretch">
              <svg className="h-full w-px" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="0" y2="25%" stroke="white" strokeWidth="1" />
                <line x1="0" y1="75%" x2="0" y2="100%" stroke="white" strokeWidth="1" />
              </svg>
            </span>
            <span className="flex w-10 items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:-rotate-45">
                <path d="M5 12H19" stroke="white" strokeLinecap="square" strokeLinejoin="round"/>
                <path d="M13 5L20 12L13 19" stroke="white" strokeLinecap="square" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>

        {/* Row 2, Cell 1 — Site Map */}
        <div className="border-b border-white/30 p-8 md:border-b-0 md:border-r md:border-white/30 md:p-10">
          <div className="flex items-start justify-between md:block">
            <nav className="flex flex-col gap-2.5">
              <Link
                href="/"
                className="text-base font-light text-white transition-colors hover:text-white md:text-sm"
              >
                {t("links.home")}
              </Link>
              <Link
                href="/about"
                className="text-base font-light text-white transition-colors hover:text-white md:text-sm"
              >
                {t("links.about")}
              </Link>
              <Link
                href="/projects"
                className="text-base font-light text-white transition-colors hover:text-white md:text-sm"
              >
                {t("links.projects")}
              </Link>
              <Link
                href="/contact"
                className="text-base font-light text-white transition-colors hover:text-white md:text-sm"
              >
                {t("links.contact")}
              </Link>
            </nav>
            <h3 className="text-lg font-light uppercase leading-[1.1] tracking-tight text-white/40 md:mb-6 md:text-2xl md:order-first">
              {t("siteMap")}
            </h3>
          </div>
        </div>

        {/* Row 2, Cell 2 — Contact */}
        <div className="border-b border-white/30 p-8 md:border-b-0 md:border-r md:border-white/30 md:p-10">
          <div className="flex items-start justify-between md:block">
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:+381643344933"
                className="text-sm font-light text-white transition-colors hover:text-white"
              >
                +38164 3344933
              </a>
              <a
                href="tel:+381117357151"
                className="text-sm font-light text-white transition-colors hover:text-white"
              >
                +381 117357151
              </a>
              <a
                href="mailto:office@neo.co.rs"
                className="text-sm font-light text-white transition-colors hover:text-white"
              >
                office@neo.co.rs
              </a>
            </div>
            <h3 className="text-lg font-light uppercase leading-[1.1] tracking-tight text-white/40 md:mb-6 md:text-2xl md:order-first">
              {t("contact")}
            </h3>
          </div>
        </div>

        {/* Row 2, Cell 3 — Address */}
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between md:block">
            <div className="flex flex-col gap-2.5 text-sm font-light text-white">
              <span>{t("addressLines.street")}</span>
              <span>{t("addressLines.city")}</span>
              <span>{t("addressLines.country")}</span>
            </div>
            <h3 className="text-lg font-light uppercase leading-[1.1] tracking-tight text-white/40 md:mb-6 md:text-2xl md:order-first">
              {t("address")}
            </h3>
          </div>
        </div>
      </div>
    </footer>
  );
}
