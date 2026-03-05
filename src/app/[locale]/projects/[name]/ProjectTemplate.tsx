import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import AnimatedGrid from "../../../components/AnimatedGrid";

export interface ProjectData {
  title: string;
  subtitle: string;
  heroImage: string;
  country: string;
  employer: string;
  contractDate: string;
  beneficiary: string;
  disciplines: string[];
  description: string;
  descriptionImage: string;
  /** Tekst na description slici (Kishinev1), gore levo; ako nije naveden, ništa se ne prikazuje */
  descriptionImageTitle?: string;
  aboutParagraphs: string[];
  galleryImages: string[]; // [half1, half2, full]
  /** Opciono: Scope of Project – stavke sa podnaslovom i paragrafom; prikazuje se između galerije i Next Project */
  scopeOfProject?: Array<{ subtitle: string; paragraph: string }>;
  /** Naslov sekcije scope; ako nije naveden, koristi se "Scope of Project" */
  scopeOfProjectTitle?: string;
  /** Ako true, umesto About Project prikazuje se Scope of Project na tom mestu (ispod opisa); Scope se ne prikazuje ponovo ispod galerije */
  scopeInsteadOfAbout?: boolean;
  /** Opciono: dodatna sekcija istog layouta (naslov levo, paragrafi desno) prikazuje se pre Next Project; naslov može sadržati \\n za prelom redova */
  scopeOfProjectSecondary?: { title: string; paragraphs: string[] };
  /** Opciono: 4 slike pre Next Project – gornji red 2/3 + 1/3 širine (manja visina), donji red dve 2:1; samo za projekte koji imaju ovaj layout */
  galleryBeforeNext?: [string, string, string, string];
  /** Opciono: drugi blok od 4 slike (isti layout kao galleryBeforeNext), npr. ispod prvog bloka na Tesli */
  galleryBeforeNext2?: [string, string, string, string];
  /** Opciono: jedna sekcija (naslov levo, tačkice + paragrafi desno) između prvog i drugog bloka od 4 slike, npr. [03] na Tesli */
  scopeSectionBeforeGallery2?: { title: string; paragraphs: string[] };
  /** Opciono: više sekcija (naslov levo, tačkice + paragrafi desno) neposredno iznad Next Project */
  scopeSectionsBeforeNext?: Array<{ title: string; paragraphs: string[] }>;
  /** Opciono: umesto About Project prikazuju se samo blokovi (naslov levo, tačkice + paragrafi desno), bez natpisa "Scope of Project" */
  scopeBlocksInsteadOfAbout?: Array<{ title: string; paragraphs: string[] }>;
}

export interface NextProjectInfo {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
}

export default async function ProjectTemplate({
  project,
  nextProject,
}: {
  project: ProjectData;
  nextProject: NextProjectInfo;
}) {
  const t = await getTranslations("ProjectTemplate");
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Monotone noise filter (Size 0.5, Density 100%, #0E0E0E, 35%) – koristi se na svim slikama */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="projectPageNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="gray" />
            <feComponentTransfer in="gray" result="alpha">
              <feFuncA type="linear" slope="0.35" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="alpha" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Hero */}
      <section className="relative h-screen">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
          <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
        </svg>

        {/* Naslov + subtitle gore levo (prva slika iz airports) */}
        <div
          className="absolute left-8 top-28 z-10 flex flex-col gap-2 md:left-12 md:top-24"
        >
          <h1
            className="whitespace-pre-line font-inter text-[40px] text-white md:text-[68px]"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              lineHeight: "100%",
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h1>
          <p
            className="font-inter text-white"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              fontStyle: "normal",
              fontSize: "24px",
              lineHeight: "110%",
              letterSpacing: "-0.02em",
            }}
          >
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Info bar */}
      <section className="px-6 py-8 md:px-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-4">
          {[
            { key: "country", label: t("country"), value: project.country },
            { key: "employer", label: t("employer"), value: project.employer },
            { key: "contractDate", label: t("contractDate"), value: project.contractDate },
            { key: "beneficiary", label: t("beneficiary"), value: project.beneficiary },
            {
              key: "disciplines",
              label: t("disciplines"),
              value: project.disciplines.join("\n"),
            },
          ].map((item) => (
            <div key={item.key}>
              <span
                className="mb-1 block font-inter text-white/40"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                  fontSize: "20px",
                  lineHeight: "110%",
                  letterSpacing: "-0.02em",
                }}
              >
                {item.label}
              </span>
              {item.key === "disciplines" ? (
                <span
                  className="font-inter text-white/80"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    fontSize: "20px",
                    lineHeight: "110%",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.disciplines.map((d, i) => (
                    <span key={i} className="mb-0.5 block last:mb-0">
                      <span className="inline-flex items-baseline gap-2">
                        <span className="text-white/50 shrink-0" aria-hidden>•</span>
                        <span>{d}</span>
                      </span>
                    </span>
                  ))}
                </span>
              ) : (
                <span
                  className="whitespace-pre-line font-inter text-white/80"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    fontSize: "20px",
                    lineHeight: "110%",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Linija ispod info bara – SVG grid */}
        <div className="mt-8 w-full" aria-hidden>
          <svg
            width="100%"
            height="32"
            viewBox="0 0 1440 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block"
          >
            <line opacity="0.3" x1="0" y1="31.5" x2="1440" y2="31.5" stroke="white" />
            <line opacity="0.3" x1="720.5" y1="0" x2="720.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="1064.5" y1="0" x2="1064.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="1408.5" y1="0" x2="1408.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="32.5" y1="0" x2="32.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="376.5" y1="0" x2="376.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="205.5" y1="0" x2="205.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="548.5" y1="0" x2="548.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="892.5" y1="0" x2="892.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="1235.5" y1="0" x2="1235.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="118.5" y1="16" x2="118.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="461.5" y1="16" x2="461.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="806.5" y1="16" x2="806.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="1149.5" y1="16" x2="1149.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="291.5" y1="16" x2="291.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="634.5" y1="16" x2="634.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="979.5" y1="16" x2="979.5" y2="32" stroke="white" />
            <line opacity="0.3" x1="1322.5" y1="16" x2="1322.5" y2="32" stroke="white" />
          </svg>
        </div>
      </section>

      {/* Description image */}
      <section className="relative px-4 py-16 md:px-6">
        <div className="relative h-[70vh] w-full overflow-hidden rounded-[2rem]">
          <Image
            src={project.descriptionImage}
            alt={project.description}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <AnimatedGrid verticalLine={33}>
            {project.descriptionImageTitle != null && project.descriptionImageTitle !== "" && (
              <p className="whitespace-pre-line text-lg font-normal uppercase leading-snug tracking-wide text-white md:text-xl lg:text-2xl">
                {project.descriptionImageTitle}
              </p>
            )}
          </AnimatedGrid>
        </div>
      </section>

      {/* About Project, Scope of Project, ili blokovi bez natpisa (scopeBlocksInsteadOfAbout) */}
      <section className="px-6 pb-20 md:px-10">
        <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-10 w-full" preserveAspectRatio="none" aria-hidden>
          <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
        </svg>

        {project.scopeBlocksInsteadOfAbout != null && project.scopeBlocksInsteadOfAbout.length > 0 ? (
          <>
            {project.scopeBlocksInsteadOfAbout.map((block, blockIdx) => (
              <div key={blockIdx}>
                <div className="flex flex-col gap-10 md:flex-row md:gap-20">
                  <div className="shrink-0 md:w-1/3">
                    <span
                      className="font-inter uppercase text-white/60 whitespace-pre-line"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 300,
                        fontSize: "32px",
                        lineHeight: "110%",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {block.title}
                    </span>
                  </div>
                  <div className="flex-1 border-t border-b border-l border-white/10">
                    {block.paragraphs.map((paragraph, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2 px-6 py-6 ${i > 0 ? "border-t border-white/10" : ""}`}
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-white/70" aria-hidden />
                        <p
                          className="font-inter text-white/70"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 300,
                            fontSize: "16px",
                            lineHeight: "120%",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {blockIdx < project.scopeBlocksInsteadOfAbout!.length - 1 ? (
                  <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-10 w-full" preserveAspectRatio="none" aria-hidden>
                    <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
                  </svg>
                ) : null}
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-10 md:flex-row md:gap-20">
            <div className="shrink-0 md:w-1/3">
              <span
                className="font-inter uppercase text-white/60 whitespace-pre-line"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                  fontSize: "32px",
                  lineHeight: "110%",
                  letterSpacing: "-0.02em",
                }}
              >
                {project.scopeInsteadOfAbout && project.scopeOfProject?.length
                  ? (project.scopeOfProjectTitle ?? t("scopeOfProject"))
                  : t("aboutProject")}
              </span>
            </div>

            {project.scopeInsteadOfAbout && project.scopeOfProject?.length ? (
              <div className="flex-1 border-t border-b border-l border-white/10">
                {project.scopeOfProject.map((item, i) => (
                  <div
                    key={i}
                    className={`px-6 py-6 ${i > 0 ? "border-t border-white/10" : ""}`}
                  >
                    {item.subtitle ? (
                      <p
                        className="mb-3 font-inter text-white/60"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 300,
                          fontSize: "14px",
                          lineHeight: "110%",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {item.subtitle}
                      </p>
                    ) : null}
                    {item.paragraph.split(/\n\n+/).map((p, j) => (
                      <p
                        key={j}
                        className={`font-inter text-white/70 ${j > 0 ? "mt-4" : ""}`}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 300,
                          fontSize: "16px",
                          lineHeight: "120%",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 border-t border-b border-l border-white/10">
                {project.aboutParagraphs.map((paragraph, i) => (
                  <div
                    key={i}
                    className={`px-6 py-6 ${i > 0 ? "border-t border-white/10" : ""}`}
                  >
                    <p
                      className="font-inter text-white/70"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 300,
                        fontSize: "16px",
                        lineHeight: "120%",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-10 w-full" preserveAspectRatio="none" aria-hidden>
          <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
        </svg>
      </section>

      {/* Image gallery */}
      {project.galleryImages.length > 0 && (
        <section className="px-6 pb-24 md:px-10">
          {/* Two half-width images */}
          {project.galleryImages.length >= 2 && (
            <div className="mb-4 flex flex-col gap-4 md:flex-row">
              <div
                className="relative h-[300px] w-full overflow-hidden rounded-2xl md:h-[400px] md:w-1/2"
                style={{
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryImages[0]}
                  alt={`${project.title} gallery 1`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
              <div
                className="relative h-[300px] w-full overflow-hidden rounded-2xl md:h-[400px] md:w-1/2"
                style={{
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryImages[1]}
                  alt={`${project.title} gallery 2`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
            </div>
          )}

          {/* One large image */}
          {project.galleryImages.length >= 3 && (
            <div
              className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[560px]"
              style={{
                clipPath:
                  "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
              }}
            >
              <Image
                src={project.galleryImages[2]}
                alt={`${project.title} gallery 3`}
                fill
                className="object-cover"
              />
              <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
              </svg>
            </div>
          )}
        </section>
      )}

      {/* Scope of Project (opciono; ne prikazuje se ako je već prikazan umesto About - scopeInsteadOfAbout) */}
      {project.scopeOfProject != null && project.scopeOfProject.length > 0 && !project.scopeInsteadOfAbout && (
        <>
          <section className="px-6 pb-20 md:px-10">
            <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-10 w-full" preserveAspectRatio="none" aria-hidden>
              <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
            </svg>
            <div className="flex flex-col gap-10 md:flex-row md:gap-20">
              <div className="shrink-0 md:w-1/3">
                <span
                  className="font-inter uppercase text-white/60 whitespace-pre-line"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    fontSize: "32px",
                    lineHeight: "110%",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.scopeOfProjectTitle ?? t("scopeOfProject")}
                </span>
              </div>
              <div className="flex-1 border-t border-b border-l border-white/10">
                {project.scopeOfProject.map((item, i) => (
                  <div
                    key={i}
                    className={`px-6 py-6 ${i > 0 ? "border-t border-white/10" : ""}`}
                  >
                    {item.subtitle ? (
                      <p
                        className="mb-3 font-inter text-white/60"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 300,
                          fontSize: "14px",
                          lineHeight: "110%",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {item.subtitle}
                      </p>
                    ) : null}
                    {item.paragraph.split(/\n\n+/).map((p, j) => (
                      <p
                        key={j}
                        className={`font-inter text-white/70 ${j > 0 ? "mt-4" : ""}`}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 300,
                          fontSize: "16px",
                          lineHeight: "120%",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-10 w-full" preserveAspectRatio="none" aria-hidden>
              <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
            </svg>
          </section>
        </>
      )}

      {/* Scope of Project Secondary (opciono, pre Next Project) */}
      {project.scopeOfProjectSecondary != null && (
        <section className="px-6 pb-20 md:px-10">
          <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-10 w-full" preserveAspectRatio="none" aria-hidden>
            <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
          </svg>
          <div className="flex flex-col gap-10 md:flex-row md:gap-20">
            <div className="shrink-0 md:w-1/3">
              <span
                className="font-inter uppercase text-white/60 whitespace-pre-line"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                  fontSize: "32px",
                  lineHeight: "110%",
                  letterSpacing: "-0.02em",
                }}
              >
                {project.scopeOfProjectSecondary.title}
              </span>
            </div>
            <div className="flex-1 border-t border-b border-l border-white/10">
              {project.scopeOfProjectSecondary.paragraphs.map((paragraph, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 px-6 py-6 ${i > 0 ? "border-t border-white/10" : ""}`}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-white/70" aria-hidden />
                  <p
                    className="font-inter text-white/70"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "120%",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-10 w-full" preserveAspectRatio="none" aria-hidden>
            <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
          </svg>
        </section>
      )}

      {/* 4 slike pre Next Project – gore veće dve (2:1), dole manje dve (2/3 + 1/3) */}
      {project.galleryBeforeNext != null && project.galleryBeforeNext.length === 4 && (
        <section className="px-6 pb-24 md:px-10">
          <div className="flex flex-col gap-4">
            {/* Prvi red: veće dve slike 2:1 */}
            <div className="flex flex-col gap-4 md:flex-row md:gap-4">
              <div
                className="relative w-full overflow-hidden rounded-2xl md:w-[calc(50%-8px)]"
                style={{
                  aspectRatio: "2/1",
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryBeforeNext[0]}
                  alt={`${project.title} gallery 4`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
              <div
                className="relative w-full overflow-hidden rounded-2xl md:w-[calc(50%-8px)]"
                style={{
                  aspectRatio: "2/1",
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryBeforeNext[1]}
                  alt={`${project.title} gallery 5`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
            </div>
            {/* Drugi red: manje dve (2/3 + 1/3 širine) */}
            <div className="flex flex-col gap-4 md:flex-row md:gap-4">
              <div
                className="relative w-full overflow-hidden rounded-2xl md:w-2/3"
                style={{
                  aspectRatio: "3/2",
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryBeforeNext[2]}
                  alt={`${project.title} gallery 6`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
              <div
                className="relative w-full overflow-hidden rounded-2xl md:w-1/3"
                style={{
                  aspectRatio: "3/4",
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryBeforeNext[3]}
                  alt={`${project.title} gallery 7`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Jedna scope sekcija između prvog i drugog bloka od 4 slike (npr. [03] na Tesli) */}
      {project.scopeSectionBeforeGallery2 != null && (
        <section className="px-6 pb-20 md:px-10">
          <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-10 w-full" preserveAspectRatio="none" aria-hidden>
            <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
          </svg>
          <div className="flex flex-col gap-10 md:flex-row md:gap-20">
            <div className="shrink-0 md:w-1/3">
              <span
                className="font-inter uppercase text-white/60 whitespace-pre-line"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                  fontSize: "32px",
                  lineHeight: "110%",
                  letterSpacing: "-0.02em",
                }}
              >
                {project.scopeSectionBeforeGallery2.title}
              </span>
            </div>
            <div className="flex-1 border-t border-b border-l border-white/10">
              {project.scopeSectionBeforeGallery2.paragraphs.map((paragraph, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 px-6 py-6 ${i > 0 ? "border-t border-white/10" : ""}`}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-white/70" aria-hidden />
                  <p
                    className="font-inter text-white/70"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "120%",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-10 w-full" preserveAspectRatio="none" aria-hidden>
            <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
          </svg>
        </section>
      )}

      {/* Drugi blok od 4 slike (isti layout), npr. Nikola Tesla ispod [03] */}
      {project.galleryBeforeNext2 != null && project.galleryBeforeNext2.length === 4 && (
        <section className="px-6 pb-24 md:px-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:gap-4">
              <div
                className="relative w-full overflow-hidden rounded-2xl md:w-[calc(50%-8px)]"
                style={{
                  aspectRatio: "2/1",
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryBeforeNext2[0]}
                  alt={`${project.title} gallery 8`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
              <div
                className="relative w-full overflow-hidden rounded-2xl md:w-[calc(50%-8px)]"
                style={{
                  aspectRatio: "2/1",
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryBeforeNext2[1]}
                  alt={`${project.title} gallery 9`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:gap-4">
              <div
                className="relative w-full overflow-hidden rounded-2xl md:w-2/3"
                style={{
                  aspectRatio: "3/2",
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryBeforeNext2[2]}
                  alt={`${project.title} gallery 10`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
              <div
                className="relative w-full overflow-hidden rounded-2xl md:w-1/3"
                style={{
                  aspectRatio: "3/4",
                  clipPath:
                    "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <Image
                  src={project.galleryBeforeNext2[3]}
                  alt={`${project.title} gallery 11`}
                  fill
                  className="object-cover"
                />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
                  <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dodatne scope sekcije iznad Next Project (npr. [02]/[03], [04]/[05]) – jedna linija između stavki */}
      {project.scopeSectionsBeforeNext != null && project.scopeSectionsBeforeNext.length > 0 && (
        <section className="px-6 pb-20 md:px-10">
          <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-10 w-full" preserveAspectRatio="none" aria-hidden>
            <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
          </svg>
          {project.scopeSectionsBeforeNext.map((block, blockIdx) => (
            <div key={blockIdx}>
              <div className="flex flex-col gap-10 md:flex-row md:gap-20">
                <div className="shrink-0 md:w-1/3">
                  <span
                    className="font-inter uppercase text-white/60 whitespace-pre-line"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 300,
                      fontSize: "32px",
                      lineHeight: "110%",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {block.title}
                  </span>
                </div>
                <div className="flex-1 border-t border-b border-l border-white/10">
                  {block.paragraphs.map((paragraph, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 px-6 py-6 ${i > 0 ? "border-t border-white/10" : ""}`}
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-white/70" aria-hidden />
                      <p
                        className="font-inter text-white/70"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 300,
                          fontSize: "16px",
                          lineHeight: "120%",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {blockIdx < project.scopeSectionsBeforeNext!.length - 1 ? (
                <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-10 w-full" preserveAspectRatio="none" aria-hidden>
                  <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
                </svg>
              ) : null}
            </div>
          ))}
          <svg width="100%" height="1" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-10 w-full" preserveAspectRatio="none" aria-hidden>
            <line opacity="0.4" x1="0" y1="0.5" x2="1440" y2="0.5" stroke="white" />
          </svg>
        </section>
      )}

      {/* Next Project */}
      <section className="px-6 pb-24 md:px-10">
        {/* Header row */}
        <div className="mb-8 flex items-center justify-between">
          <span
            className="text-white"
            style={{
              fontFamily: "Alliance No.2, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "20px",
              lineHeight: "90%",
              letterSpacing: "-0.03em",
            }}
          >
            {t("nextProject")}
          </span>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="text-white/60 transition-colors hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="13" y="24" width="2" height="24" transform="rotate(-180 13 24)" fill="currentColor" />
              <rect y="13" width="2" height="24" transform="rotate(-90 0 13)" fill="currentColor" />
            </svg>
          </Link>
        </div>

        {/* Title + subtitle */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="font-inter text-white transition-colors hover:text-white/70"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              fontSize: "40px",
              lineHeight: "110%",
              letterSpacing: "-0.02em",
            }}
          >
            {nextProject.title}
          </Link>
          <p className="text-sm font-light uppercase tracking-widest text-white">
            {nextProject.subtitle}
          </p>
        </div>

        {/* Next project image */}
        <Link href={`/projects/${nextProject.slug}`} className="group block">
          <div
            className="relative h-[50vh] w-full overflow-hidden rounded-2xl"
            style={{
              clipPath:
                "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
            }}
          >
            <Image
              src={nextProject.heroImage}
              alt={nextProject.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20" />
            <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }} aria-hidden>
              <rect width="100%" height="100%" fill="#0E0E0E" filter="url(#projectPageNoise)" />
            </svg>

            {/* Strelica gore desno: desno (default) → expand (hover), kao na karticama */}
            <div className="absolute top-5 right-5 z-[5]">
              <span className="relative flex h-12 w-12 items-center justify-center">
                <span className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                  <svg width="32" height="33" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <g opacity="0.85">
                      <mask id="next-project-arrow-right" fill="white">
                        <path d="M0 0H48V50H0V0Z" />
                      </mask>
                      <path d="M0 0V1H48V0V-1H0V0ZM48 50V49H0V50V51H48V50Z" fill="white" mask="url(#next-project-arrow-right)" />
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
                      <mask id="next-project-arrow-expand" fill="white">
                        <path d="M0 0H48V50H0V0Z" />
                      </mask>
                      <path d="M0 0V1H48V0V-1H0V0ZM48 50V49H0V50V51H48V50Z" fill="white" mask="url(#next-project-arrow-expand)" />
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
          </div>
        </Link>
      </section>
    </main>
  );
}
