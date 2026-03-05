import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ProjectsMapLoader from "../components/ProjectsMapLoader";
import AnimatedGrid from "../components/AnimatedGrid";
import ScrollCompass from "../components/ScrollCompass";
import ServiceCardAccordion from "../components/ServiceCardAccordion";
import AnimatedBorderLines from "../components/AnimatedBorderLines";
import FadeInOnScroll from "../components/FadeInOnScroll";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");
  const tServices = await getTranslations("Services");
  const tOngoing = await getTranslations();
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/neo-hero.jpg"
          alt="Airport runway"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient overlay: dark top + dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-transparent via-30% to-[#0a0a0a] to-[85%]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-8 pb-12 md:p-16 md:pb-20">
          {/* Bottom content */}
          <div className="flex flex-col justify-end gap-8 md:flex-row md:items-end md:justify-between">
            {/* Heading */}
            <h1 className="max-w-2xl text-5xl font-normal leading-none tracking-[-0.03em] text-white md:text-7xl lg:text-[96px] animate-fade-in-up" style={{ opacity: 0, animationDuration: "1.6s" }}>
              {t("hero.line1")}
              <br />
              {t("hero.line2")}
            </h1>

            {/* Subtitle */}
            <p className="max-w-xs text-base font-normal uppercase leading-[1.2] tracking-[-0.02em] text-white animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.3s" }}>
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative flex flex-col justify-between bg-[#0a0a0a] px-6 pt-24 pb-20 md:px-10 md:pt-32 md:pb-16">
        <FadeInOnScroll>
          <p className="max-w-4xl text-lg font-light uppercase leading-snug tracking-wide md:text-2xl lg:text-3xl">
            <span className="text-white">
              {t("about.highlight")}
            </span>{" "}
            <span className="text-white/40">
              {t("about.rest")}
            </span>
          </p>
        </FadeInOnScroll>

        <div className="mt-10 flex justify-end">
          <Link
            href="/about"
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
            <span className="flex items-center px-6 text-sm font-light text-white">
              {t("about.readMore")}
            </span>
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
          </Link>
        </div>

        {/* Bottom border with animated vertical lines */}
        <AnimatedBorderLines />
      </section>

      {/* Services Section – identično kao na About */}
      <section className="relative z-[1] min-h-screen bg-[#0a0a0a] px-6 pt-20 pb-[100vh] md:px-10">
        {/* Background compass — scroll-driven animation */}
        <ScrollCompass />

        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:gap-20">
          {/* Left - Sticky title */}
          <div className="h-fit w-full self-start pt-8 md:sticky md:top-0 md:w-1/2 md:pt-32">
            <h2 className="font-inter text-[26px] font-light uppercase leading-[1.1] tracking-[-0.02em] text-white md:text-[40px]">
              {t("services.title1")}
              <br />
              {t("services.title2")}
            </h2>
          </div>

          {/* Right - Scrollable expandable cards */}
          <div className="flex flex-col gap-6 md:w-1/2 md:pt-40 md:pb-20">
            <ServiceCardAccordion
              cardIdOffset={100}
              services={[
                { title: tServices("masterPlans.title"), description: tServices("masterPlans.description") },
                { title: tServices("conops.title"), description: tServices("conops.description") },
                { title: tServices("runways.title"), description: tServices("runways.description") },
                { title: tServices("heliport.title"), description: tServices("heliport.description") },
                { title: tServices("controlTower.title"), description: tServices("controlTower.description") },
                { title: tServices("highways.title"), description: tServices("highways.description") },
                { title: tServices("supervision.title"), description: tServices("supervision.description") },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Image Section */}
      <section className="relative z-[2] -mt-[100vh] h-screen bg-[#0a0a0a] px-4 py-24 md:px-6">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
          {/* Background Image */}
          <Image
            src="/home-3-png.png"
            alt="Aerial view of airplane on runway"
            width={1920}
            height={1080}
            className="pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 min-h-full min-w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Animated grid lines + cell 1,1 text */}
          <AnimatedGrid>
            <p className="text-base font-light uppercase leading-snug tracking-wide text-white/90 md:text-lg lg:text-xl">
              {t("cta.text")}
            </p>
          </AnimatedGrid>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
            {/* Contact button bottom-right */}
            <div className="flex justify-end">
              <Link
                href="/about"
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
                <span className="flex items-center px-6 text-sm font-light text-white">
                  {t("cta.button")}
                </span>
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Map Section */}
      <ProjectsMapLoader />

      {/* Current Projects Section */}
      <section className="relative z-[2] bg-[#0a0a0a] px-8">
        <div className="py-16 md:py-20">
          <h2 className="mb-16 font-inter text-[26px] font-light uppercase leading-[1.1] tracking-[-0.02em] text-white md:text-[40px]">
            {t("currentProjects.title")}
          </h2>

          <div className="flex flex-col">
            {(tOngoing.raw("OngoingProjects") as Array<{ name: string; location: string; tags: string[] }>).map((project, i, arr) => (
              <div
                key={i}
                className={`grid grid-cols-1 items-center gap-4 border-white/40 py-6 md:grid-cols-[1fr_auto_1fr] ${i > 0 ? "border-t" : ""} ${i === arr.length - 1 ? "border-b" : ""}`}
              >
                <span className="text-lg font-light text-white md:text-base">
                  {project.name}
                </span>
                <span className="text-lg font-light text-white md:text-base">
                  [{project.location}]
                </span>
                <div className="flex flex-wrap justify-end gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="rounded-full border border-white px-4 py-1.5 text-base font-light text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
