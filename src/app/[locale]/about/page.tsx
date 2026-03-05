import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Component1 from "./components/Component1";
import HeroEdgeLines from "./components/HeroEdgeLines";
import VectorComponent from "./components/VectorComponent";
import ScrollCompass from "../../components/ScrollCompass";
import ServiceCardAccordion from "../../components/ServiceCardAccordion";
import FadeInOnScroll from "../../components/FadeInOnScroll";
import AnimatedBorderLines from "../../components/AnimatedBorderLines";

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");
  const tServices = await getTranslations("Services");
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image */}
        <Image
          src="/about.jpg"
          alt="Airport runway"
          fill
          className="object-cover object-[center_60%]"
          priority
        />
        {/* Gradient overlay: dark top + dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-transparent via-30% to-[#0a0a0a] to-[85%]" />

        <HeroEdgeLines />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-8 pb-12 md:p-16 md:pb-20">
          <div className="flex flex-col justify-end gap-8 md:flex-row md:items-end md:justify-between">
            {/* Heading */}
            <h1 className="max-w-2xl text-5xl font-normal leading-none tracking-[-0.03em] text-white md:text-7xl lg:text-[96px] animate-fade-in-up" style={{ opacity: 0, animationDuration: "1.6s" }}>
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p className="max-w-xs text-base font-normal uppercase leading-[1.2] tracking-[-0.02em] text-white animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.3s" }}>
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="relative flex h-[35vh] items-center px-6 md:h-[50vh] md:px-10">
        <FadeInOnScroll>
          <p className="max-w-4xl text-lg font-light uppercase leading-snug tracking-wide md:text-2xl lg:text-3xl">
            <span className="text-white">
              {t("mission.highlight")}
            </span>{" "}
            <span className="text-white/30">
              {t("mission.rest")}
            </span>
          </p>
        </FadeInOnScroll>

        <Component1 />
      </section>

      {/* Image + About text */}
      <section className="px-8 py-16 md:px-14 md:py-20">
        {/* Wrapper: image + shape that viri (positioned by image) */}
        <div className="relative mb-20 h-[80vh] w-full">
          <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl">
            <Image
              src="/AboutUsAirport.jpg"
              alt="Airport aerial view"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover"
            />
          </div>
          {/* Shape: tačno pola u slici, srazmerna slici (60vh) */}
          <VectorComponent />
        </div>

        {/* Text content with decorative element */}
        <div className="relative">
          {/* Square bullet */}
          <div className="mb-6 h-3 w-3 bg-white" />

          {/* Paragraphs – Inter Light 16px, 110% line-height, -2% letter-spacing */}
          <div className="max-w-2xl space-y-6 font-inter text-base font-light leading-[1.1] tracking-[-0.02em] text-white/70">
            <p>{t("description.p1")}</p>
            <p>{t("description.p2")}</p>
            <p>{t("description.p3")}</p>
            <p>{t("description.p4")}</p>
          </div>

        </div>
      </section>
      {/* Services Section */}
      <section className="relative z-[1] bg-[#0a0a0a] px-6 pt-20 pb-20 md:px-10 md:pb-32">
        <ScrollCompass fadeOut />

        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:gap-20">
          {/* Left - Sticky title */}
          <div className="h-fit w-full self-start pt-16 md:sticky md:top-0 md:w-1/2 md:pt-32">
            <h2 className="font-inter text-[26px] font-light uppercase leading-[1.1] tracking-[-0.02em] text-white md:text-[40px]">
              {t("services.title1")}
              <br />
              {t("services.title2")}
            </h2>
          </div>

          {/* Right - Scrollable expandable cards */}
          <div className="flex flex-col gap-6 md:w-1/2 md:pt-40 md:pb-20">
            <ServiceCardAccordion
              cardIdOffset={200}
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
    </main>
  );
}
