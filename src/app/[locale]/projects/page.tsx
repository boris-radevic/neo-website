import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";

const finishedProjects = [
  { name: "Kishinev\nInternational Airport", slug: "kishinev" },
  { name: "Goma Int'l\nAirport", slug: "goma", titleTop: true },
  { name: "Ouro\nSogui\nAirport", slug: "ouro-sogui", titleTop: true },
  { name: "Saint-Louis\nAirport", slug: "saint-louis", image: "Saint Louis Airport.jpg" },
  { name: "'Constantine the Great'\nAirport", slug: "nis", image: "konstantin.jpg" },
  { name: "'Nikola Tesla'\nAirport", slug: "belgrade", image: "tesla.jpg", titleTop: true },
  { name: "Pančevo Airport\nMaster Plan", slug: "pancevo", titleTop: true },
  { name: "Lisičji Jarak Airport\nMaster Plan", slug: "lisiciji-jarak", image: "lisiciji.jpg" },
  { name: "Vršac Airport,\nSerbia", slug: "vrsac", image: "vrsac.jpg" },
  { name: "Rosulje Airport\nKruševac, Serbia", slug: "krusevac-rosulje", image: "rosulje.jpg", titleTop: true },
  { name: "Heliport Kopaonik,\nSerbia", slug: "kopaonik", image: "kopaonik.jpg", titleTop: true },
  { name: "Heliport\nMUP, Serbia", slug: "mup", image: "mup.jpg" },
  { name: "Morava Airport\nKraljevo, Serbia", slug: "morava", image: "morava.jpg" },
];


// Row layouts: [left fraction, right fraction]
const rowLayouts = [
  [2, 1], // 2/3 + 1/3
  [1, 2], // 1/3 + 2/3
  [1, 1], // 1/2 + 1/2
  [1, 1], // 1/2 + 1/2
  [2, 1], // 2/3 + 1/3
  [1, 2], // 1/3 + 2/3
];

function ProjectCard({ project }: { project: (typeof finishedProjects)[number] }) {
  const imageSrc =
    "image" in project && project.image
      ? `/airports/${encodeURIComponent(project.image)}`
      : `/airports/${project.slug}.jpg`;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block h-full"
    >
      <div
        className="relative h-full overflow-hidden rounded-2xl"
        style={{
          clipPath:
            "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
        }}
      >
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
        {/* Monotone noise (#0E0E0E, 35%, size 0.5) */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
          <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectsCardNoise)" />
        </svg>

        {/* Edge lines levo, na sredini, okrenute ka sredini (kao HeroEdgeLines) */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 z-[5] hidden -translate-y-1/2 md:block"
          aria-hidden
        >
          <svg width="24" height="246" viewBox="0 0 24 246" fill="none">
            <g opacity="0.4">
              <line x1="0" y1="157.5" x2="24" y2="157.5" stroke="white" />
              <line x1="0" y1="147.5" x2="12" y2="147.5" stroke="white" />
              <line x1="0" y1="137.5" x2="24" y2="137.5" stroke="white" />
              <line x1="0" y1="127.5" x2="12" y2="127.5" stroke="white" />
              <line x1="0" y1="117.5" x2="24" y2="117.5" stroke="white" />
              <line x1="0" y1="97.5" x2="24" y2="97.5" stroke="white" />
              <line x1="0" y1="107.5" x2="12" y2="107.5" stroke="white" />
            </g>
          </svg>
        </div>

        {/* Arrow ikona gore desno: strelica desno (default) → strelica expand (hover), kao na About */}
        <div className="absolute top-5 right-5">
          <span className="relative flex h-12 w-12 items-center justify-center">
            <span className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
              <svg width="32" height="33" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <g opacity="0.85">
                  <mask id={`project-${project.slug}-arrow-right`} fill="white">
                    <path d="M0 0H48V50H0V0Z" />
                  </mask>
                  <path d="M0 0V1H48V0V-1H0V0ZM48 50V49H0V50V51H48V50Z" fill="white" mask={`url(#project-${project.slug}-arrow-right)`} />
                  <line x1="0.5" y1="41" x2="0.5" y2="49" stroke="white" />
                  <line x1="0.5" y1="1" x2="0.5" y2="9" stroke="white" />
                  <line y1="-0.5" x2="8" y2="-0.5" transform="matrix(0 1 -0.999922 0.012499 47 41)" stroke="white" />
                  <line y1="-0.5" x2="8" y2="-0.5" transform="matrix(0 1 -0.999922 0.012499 47 1)" stroke="white" />
                  <path d="M17 25H31" stroke="white" strokeLinecap="square" strokeLinejoin="round" />
                  <path d="M25 18L32 25L25 32" stroke="white" strokeLinecap="square" strokeLinejoin="round" />
                </g>
              </svg>
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <svg width="32" height="33" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <g opacity="0.95">
                  <mask id={`project-${project.slug}-arrow-expand`} fill="white">
                    <path d="M0 0H48V50H0V0Z" />
                  </mask>
                  <path d="M0 0V1H48V0V-1H0V0ZM48 50V49H0V50V51H48V50Z" fill="white" mask={`url(#project-${project.slug}-arrow-expand)`} />
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

        {/* Project name: gore levo (titleTop) ili dole levo */}
        <div
          className={`absolute left-6 ${"titleTop" in project && project.titleTop ? "top-5" : "bottom-5"}`}
        >
          <h3 className="whitespace-pre-line font-inter text-[24px] font-light leading-[1.1] tracking-[-0.02em] text-white">
            {project.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default async function Projects({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProjectsPage");
  const tOngoing = await getTranslations();
  // Group projects into pairs for rows
  const rows: (typeof finishedProjects)[] = [];
  for (let i = 0; i < finishedProjects.length; i += 2) {
    rows.push(finishedProjects.slice(i, i + 2));
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative flex flex-col px-6 pb-12 pt-32 md:px-10 md:pt-40">
        {/* Grid pattern overlay */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <pattern id="projectsGrid" width="160" height="160" patternUnits="userSpaceOnUse">
              {/* Major grid lines (solid) */}
              <line x1="0" y1="0" x2="0" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="160" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              {/* Minor grid lines (dashed) */}
              <line x1="40" y1="0" x2="40" y2="160" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="80" y1="0" x2="80" y2="160" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="120" y1="0" x2="120" y2="160" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="0" y1="40" x2="160" y2="40" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="160" y2="80" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="160" y2="120" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeDasharray="4 4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#projectsGrid)" />
        </svg>

        <div className="relative z-10">
          {/* Main heading + description row */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h1 className="font-inter text-[40px] font-normal leading-[1] tracking-[-0.03em] text-white md:text-[64px]">
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
              <sup className="ml-2 text-lg font-light text-white/50 md:text-xl">
                {t("hero.count")}
              </sup>
            </h1>
            <p className="max-w-xs font-inter text-[16px] font-light uppercase leading-[1.2] tracking-[-0.02em] text-white/50 md:text-right">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Finished projects label */}
          <div className="mt-16 md:mt-20">
            <span className="font-inter text-[40px] font-light uppercase leading-[1.1] tracking-[-0.02em] text-white/50">
              {t("finishedLabel")}
              <sup className="ml-1 text-[10px] text-white/30">{t("finishedCount")}</sup>
            </span>
          </div>
        </div>
      </section>

      {/* Project cards gallery */}
      <section className="relative px-6 pb-24 md:px-10">
        {/* Filter za monotone noise na karticama (definisan jednom) */}
        <svg width="0" height="0" className="absolute" aria-hidden>
          <defs>
            <filter id="projectsCardNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0" result="gray" />
              <feComponentTransfer in="gray" result="alpha">
                <feFuncA type="linear" slope="0.35" />
              </feComponentTransfer>
              <feComposite in="SourceGraphic" in2="alpha" operator="in" />
            </filter>
          </defs>
        </svg>
        <div className="flex flex-col gap-4">
          {rows.map((row, rowIndex) => {
            const layout = rowLayouts[rowIndex % rowLayouts.length];
            const totalParts = layout[0] + layout[1];

            return (
              <div key={rowIndex} className="space-y-4 md:flex md:h-[420px] md:flex-row md:gap-4 md:space-y-0">
                {row.map((project, colIndex) => (
                  <div
                    key={project.slug}
                    className="h-[300px] w-full md:h-auto"
                    style={{
                      flex: row.length === 1 ? "1 1 100%" : `${layout[colIndex] || 1} 1 0%`,
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>
      {/* Ongoing projects */}
      <section className="relative z-[2] bg-[#0a0a0a] px-8">
        <div className="py-16 md:py-20">
          <h2 className="mb-16 font-inter text-[26px] font-light uppercase leading-[1.1] tracking-[-0.02em] text-white md:text-[40px]">
            {t("ongoingTitle")}
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
    </main>
  );
}
