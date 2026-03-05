import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";

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
      <line x1="0" y1={half} x2={size} y2={half} stroke="white" strokeOpacity="1" strokeWidth="1" />
      {variant !== "top" && (
        <line x1={half} y1="0" x2={half} y2={half} stroke="white" strokeOpacity="1" strokeWidth="1" />
      )}
      {variant !== "bottom" && (
        <line x1={half} y1={half} x2={half} y2={size} stroke="white" strokeOpacity="1" strokeWidth="1" />
      )}
    </svg>
  );
}

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");
  const tFooter = await getTranslations("Footer");

  return (
    <main className="contact-page min-h-screen bg-[#0a0a0a]">
      {/* Info Section — footer-style grid */}
      <section className="pt-28 md:pt-36">
        <div className="relative grid grid-cols-1 border-y border-white/30 md:grid-cols-2">
          {/* Top junctions */}
          <Junction variant="top" className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
          {/* Bottom junctions */}
          <Junction variant="bottom" className="left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2" />

          {/* Left Cell — Title + Email button */}
          <div className="flex flex-col gap-10 border-b border-white/30 p-8 md:border-b-0 md:border-r md:border-white/30 md:p-10">
            <h1
              className="whitespace-pre-line text-5xl font-light tracking-[-0.03em] text-white md:text-7xl lg:text-[80px]"
              style={{ lineHeight: "100%" }}
            >
              {t("title")}
            </h1>

            {/* Email bracket-button */}
            <a
              href="mailto:office@neo.co.rs"
              className="group relative flex h-[40px] w-fit shrink-0 items-stretch md:h-[50px]"
            >
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="25%" stroke="white" strokeWidth="1" />
                <line x1="0" y1="75%" x2="0" y2="100%" stroke="white" strokeWidth="1" />
                <line x1="100%" y1="0" x2="100%" y2="25%" stroke="white" strokeWidth="1" />
                <line x1="100%" y1="75%" x2="100%" y2="100%" stroke="white" strokeWidth="1" />
              </svg>
              <span className="flex items-center px-5 text-sm font-light text-white">
                office@neo.co.rs
              </span>
              <span className="relative flex w-px items-stretch">
                <svg className="h-full w-px" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="0" y2="25%" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="75%" x2="0" y2="100%" stroke="white" strokeWidth="1" />
                </svg>
              </span>
              <span className="flex w-10 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:-rotate-45">
                  <path d="M5 12H19" stroke="white" strokeLinecap="square" strokeLinejoin="round" />
                  <path d="M13 5L20 12L13 19" stroke="white" strokeLinecap="square" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>

          {/* Right Cell — Address, Socials, Contact */}
          <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
            {/* Address */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="block h-3 w-3 bg-white" />
                <span className="text-2xl font-light uppercase leading-[1.1] tracking-tight text-white/40">
                  {t("address")}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1.5 text-[20px] font-light text-white">
                <span>{tFooter("addressLines.street")}</span>
                <span>{tFooter("addressLines.city")}</span>
                <span>{tFooter("addressLines.country")}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="block h-3 w-3 bg-white" />
                <span className="text-2xl font-light uppercase leading-[1.1] tracking-tight text-white/40">
                  {t("socials")}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1.5 text-[20px] font-light text-white">
                <span className="text-white/30">{t("socialLinks.instagram")}</span>
                <span className="text-white/30">{t("socialLinks.linkedin")}</span>
                <span className="text-white/30">{t("socialLinks.x")}</span>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="block h-3 w-3 bg-white" />
                <span className="text-2xl font-light uppercase leading-[1.1] tracking-tight text-white/40">
                  {t("contact")}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1.5 text-[20px] font-light text-white">
                <a href="tel:+381643344933" className="transition-colors hover:text-white/60">
                  +38164 3344933
                </a>
                <a href="tel:+381117357151" className="transition-colors hover:text-white/60">
                  +381 117357151
                </a>
                <a href="mailto:office@neo.co.rs" className="transition-colors hover:text-white/60">
                  office@neo.co.rs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="px-4 py-10 md:px-6 md:py-16">
        <div
          className="relative h-[50vh] w-full overflow-hidden md:h-[60vh]"
          style={{
            clipPath:
              "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
          }}
        >
          <Image
            src="/contact.jpg"
            alt="Airport"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />

          {/* Decorative vertical bars — top center */}
          <div className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-[10px] pt-4">
            {[24, 12, 24, 12, 24, 12, 24].map((h, i) => (
              <div
                key={i}
                className="w-px bg-white/30"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          {/* Decorative vertical bars — bottom center */}
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 rotate-180 gap-[10px] pt-4">
            {[24, 12, 24, 12, 24, 12, 24].map((h, i) => (
              <div
                key={i}
                className="w-px bg-white/30"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
