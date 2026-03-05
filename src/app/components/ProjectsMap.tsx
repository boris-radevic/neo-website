"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Project {
  name: string;
  country: string;
  // ISO 3166-1 numeric id used by world-atlas topojson
  countryId: string;
}

const projects: Project[] = [
  // Serbia
  { name: "Belgrade Nikola Tesla Airport", country: "Serbia", countryId: "688" },
  { name: "Niš Constantine the Great Airport", country: "Serbia", countryId: "688" },
  { name: "Vršac Airport", country: "Serbia", countryId: "688" },
  { name: "Kruševac-Rosulje Airfield", country: "Serbia", countryId: "688" },
  { name: "Pančevo Airport Master Plan", country: "Serbia", countryId: "688" },
  { name: "Lisičji Jarak Airport Master Plan", country: "Serbia", countryId: "688" },
  { name: "Morava Airport Kraljevo", country: "Serbia", countryId: "688" },
  { name: "Heliport Kopaonik", country: "Serbia", countryId: "688" },
  { name: "Heliport MUP", country: "Serbia", countryId: "688" },
  { name: "EXPO 2027 Belgrade", country: "Serbia", countryId: "688" },
  // Moldova
  { name: "Kishinev International Airport", country: "Moldova", countryId: "498" },
  // DR Congo
  { name: "Goma International Airport", country: "DR Congo", countryId: "180" },
  { name: "Bukavu Airport", country: "DR Congo", countryId: "180" },
  { name: "Lubumbashi Airport", country: "DR Congo", countryId: "180" },
  // Senegal
  { name: "Matam Airport", country: "Senegal", countryId: "686" },
  { name: "Saint-Louis Airport", country: "Senegal", countryId: "686" },
  { name: "Ouro Sogui Airport", country: "Senegal", countryId: "686" },
  // Tanzania
  { name: "Serengeti International Airport", country: "Tanzania", countryId: "834" },
  // Pakistan
  { name: "Skardu Airport", country: "Pakistan", countryId: "586" },
];

const SERBIA_ID = "688";

// Group projects by country id
const projectsByCountry: Record<string, Project[]> = {};
for (const p of projects) {
  if (!projectsByCountry[p.countryId]) projectsByCountry[p.countryId] = [];
  projectsByCountry[p.countryId].push(p);
}

// Kosovo is part of Serbia — detect by id or name
function isKosovo(geo: { id: string; properties: { name?: string } }): boolean {
  const name = (geo.properties.name ?? "").toLowerCase();
  return name.includes("kosovo") || geo.id === "-99" || geo.id === "0";
}

export default function ProjectsMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const t = useTranslations("MapSection");

  const selectedProjects = selectedCountry ? projectsByCountry[selectedCountry] : null;

  return (
    <section className="flex h-screen flex-col bg-[#0a0a0a] py-12">
      {/* Header — outside grid */}
      <div className="mb-8 flex flex-col gap-6 px-6 pt-4 pb-6 md:flex-row md:gap-4 md:items-start md:justify-between md:px-10">
        <h2 className="text-xl font-light uppercase leading-snug tracking-wide text-white md:text-[36px]">
          {t("title")}
        </h2>
        <Link
          href="/projects"
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
            {t("seeAll")}
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

      {/* Map + Card area — grid only here */}
      <div
        className="relative flex-1 min-h-0 overflow-hidden"
        onClick={() => setSelectedCountry(null)}
        style={{
          backgroundImage: [
            "linear-gradient(to right, rgba(255,255,255,0.12) 0.5px, transparent 0.5px)",
            "linear-gradient(to bottom, rgba(255,255,255,0.12) 0.5px, transparent 0.5px)",
            "linear-gradient(to right, rgba(255,255,255,0.05) 0.5px, transparent 0.5px)",
            "linear-gradient(to bottom, rgba(255,255,255,0.05) 0.5px, transparent 0.5px)",
          ].join(", "),
          backgroundSize: "160px 160px, 160px 160px, 40px 40px, 40px 40px",
          backgroundPosition: "-0.5px -0.5px",
        }}
      >
          {/* Top fade gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24" style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent)" }} />
          {/* Bottom fade gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24" style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }} />

          {/* Map — right 70% */}
          <div className="absolute right-0 top-0 h-full w-full md:w-[70%]">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [30.4, 22.7],
                scale: 428,
              }}
              style={{ width: "100%", height: "100%" }}
            >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const kosovo = isKosovo(geo);
                      const id = kosovo ? SERBIA_ID : geo.id;
                      const isHighlighted = id in projectsByCountry;
                      const isSelected = selectedCountry === id;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={
                            isSelected
                              ? "#3b82f6"
                              : isHighlighted
                                ? "#2563eb"
                                : "#0a0a0a"
                          }
                          stroke={kosovo ? "transparent" : "rgba(255,255,255,0.35)"}
                          strokeWidth={kosovo ? 0 : 0.5}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isHighlighted) {
                              setSelectedCountry(selectedCountry === id ? null : id);
                            } else {
                              setSelectedCountry(null);
                            }
                          }}
                          style={{
                            default: { outline: "none", cursor: isHighlighted ? "pointer" : "default" },
                            hover: { outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
            </ComposableMap>
          </div>

          {/* Desktop Folder Card — centered in left 30%, fixed 431 wide */}
          {selectedProjects && (
            <div className="absolute left-0 top-0 z-20 hidden h-full w-[35%] items-center justify-center md:flex" style={{ paddingLeft: 40, paddingTop: 80 }}>
              <div className="relative" style={{ width: 431 }}>
                {/* Folder tab — top left */}
                <div
                  className="relative z-10 flex items-center justify-center rounded-t-lg border-x border-t border-white/15 bg-white/[0.03] backdrop-blur-[3px]"
                  style={{ width: 120, height: 56 }}
                >
                  <Link href="/projects">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 hover:-rotate-45">
                      <path d="M5 12H19" stroke="white" strokeLinecap="square" strokeLinejoin="round"/>
                      <path d="M13 5L20 12L13 19" stroke="white" strokeLinecap="square" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
                {/* Folder body */}
                <div
                  className="relative -mt-px rounded-lg rounded-tl-none border border-white/15 bg-white/[0.03] p-6 backdrop-blur-[3px]"
                  style={{ height: 517 }}
                >
                  <h3 className="mb-5 text-xs font-medium uppercase tracking-widest text-white/50">
                    [{selectedProjects[0].country}]
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {selectedProjects.map((project, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 bg-blue-500" />
                        <span className="text-sm font-light leading-snug text-white">
                          {project.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Bottom Sheet */}
          {selectedProjects && (
            <div
              className="absolute inset-x-0 bottom-0 z-30 rounded-t-2xl border-t border-white/15 bg-[#0a0a0a]/95 p-6 backdrop-blur-md md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
              <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/50">
                [{selectedProjects[0].country}]
              </h3>
              <ul className="flex flex-col gap-3">
                {selectedProjects.map((project, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 bg-blue-500" />
                    <span className="text-sm font-light leading-snug text-white">
                      {project.name}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/projects"
                className="mt-5 flex items-center gap-2 text-sm font-light text-white/60"
              >
                {t("seeAll")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="currentColor" strokeLinecap="square" />
                  <path d="M13 5L20 12L13 19" stroke="currentColor" strokeLinecap="square" />
                </svg>
              </Link>
            </div>
          )}
        </div>
    </section>
  );
}
