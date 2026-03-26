import type { ProjectData as TemplateProjectData } from "./ProjectTemplate";

// `projectData` still contains legacy fields used by the previous multi-image template.
// The current template ignores them, but we keep them here without breaking typing.
type ProjectData = TemplateProjectData & {
  descriptionImage?: string;
  descriptionImageTitle?: string;
  galleryImages?: string[];
};

/** Putanje podslike za projekat: description + galerija. Slike stavi u public/airports/{slug}/ */
function projectImages(slug: string) {
  return {
    descriptionImage: `/airports/${slug}/description.jpg`,
    galleryImages: [
      `/airports/${slug}/gallery-1.jpg`,
      `/airports/${slug}/gallery-2.jpg`,
      `/airports/${slug}/gallery-3.jpg`,
    ],
  };
}

const projects: Record<string, ProjectData> = {
  goma: {
    title: "Goma Int'l Airport",
    subtitle: "[ICAO – FZNA, IATA – GOM]",
    heroImage: "/airports/goma.jpg",
    country: "Dr Congo",
    employer: "World Bank",
    contractDate: "2016 – 2018",
    beneficiary: "Ministry of Transportation of the Democratic Republic of the Congo",
    disciplines: [
      "Civil design",
      "Pavement structure design",
      "Stormwater drainage design",
      "Stormwater analysis",
      "Synthesis plan of installations",
      "Vertical signalization design",
      "Horizontal marking design",
    ],
    description:
      "REHABILITATION AND EXPANSION OF THE MAIN APRON AT GOMA INTERNATIONAL AIRPORT",
    descriptionImage: "/airports/goma/description.png",
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    galleryImages: [
      "/airports/goma/gallery-1.png",
      "/airports/goma/gallery-2.png",
      "/airports/goma/gallery-3.png",
    ],
    aboutParagraphs: [
      "Rehabilitation and Expansion of the Main Apron: The project involves the detailed design for the rehabilitation of the existing main apron, covering an area of approximately 16,000 m², as well as its expansion northward by an additional 8,000 m². The scope includes reconstruction of pavement surfaces and the design of a complete drainage system, ensuring full integration with the existing stormwater network.",
      "Design of the New Air Traffic Control Tower Complex with Technical Block: The scope includes the development of a comprehensive design for the new control tower complex, beginning with a site selection study, orientation analysis, and determination of the optimal tower height.",
      "Architectural and structural design concepts are explored through multiple variants, followed by a preliminary design phase. The final design includes a 26-meter-high air traffic control tower and an integrated technical block of 900 m², with a functional capacity for up to 50 personnel.",
    ],
    scopeOfProjectTitle: "A 435m runway extension design comprised the following:",
    scopeOfProject: [
      { subtitle: "", paragraph: "The runway extension 435m to achieve the initial length of 3000m before volcano eruption." },
      { subtitle: "", paragraph: "Adjusting the runway and taxiway strips." },
      { subtitle: "", paragraph: "The application of designation marking on all pavements." },
      { subtitle: "", paragraph: "The setting up of security areas at the thresholds of runway RESAs and SWYs." },
      { subtitle: "", paragraph: "The construction of the service road surrounding the runway." },
      { subtitle: "", paragraph: "The construction of fence-wall of the airport." },
      { subtitle: "", paragraph: "The construction of the pipe culverts for airfield lighting system." },
    ],
  },
  kishinev: {
    title: "Kishinev\nInternational Airport",
    subtitle: "[ICAO – LUKK, IATA – KIV]",
    heroImage: "/airports/kishinev/Hero.jpg",
    country: "Moldova",
    employer: "Compania Aeroportul\nInternational Chisinau",
    contractDate: "2015 - 2016",
    beneficiary: "/",
    disciplines: [
      "Civil design",
      "Pavement structure design",
      "Vertical signalization design",
      "Horizontal marking design",
    ],
    description:
      "REHABILITATION OF RUNWAY AND TAXIWAY SYSTEM AT KISHINEV INTERNATIONAL AIRPORT",
    descriptionImage: "/airports/kishinev/description.jpg",
    descriptionImageTitle:
      "The Project for\nModernisation of\nInternational\nAirport of Kishinev",
    galleryImages: [
      "/airports/kishinev/gallery-1.png",
      "/airports/kishinev/gallery-2.jpg",
      "/airports/kishinev/gallery-3.jpg",
    ],
    aboutParagraphs: [
      "The Project for Modernisation of International Airport of Kishinev includes a substantial increase of bearing capacity index of runway (PCN) in its entire length of 3590 metres, with an area of 167000m² of taxiways and aprons, including six positions for the aircrafts with code letter C (from the existing value PCN = 51 up to PCN = 70).",
      "Increasing the bearing capacity will allow Kishinev International Airport to serve all types of aircrafts, without any restriction. Also, the runway has been widened from 45m to 60m. In order to handle the traffic of 21 aircrafts per hour, the new taxiways have undergone construction and the existing taxiways have undergone rehabilitation. Today, the old runway serves as a taxiway to the main (new) runway.",
    ],
  },
  "saint-louis": {
    title: "Saint-Louis Airport",
    subtitle: "[ICAO – GOSS, IATA – XLS]",
    heroImage: "/airports/Saint Louis Airport.jpg",
    country: "Senegal",
    employer: "Transcon Electronic Systems S.R.O. Prague, Czech Republic",
    contractDate: "2018 – 2024",
    beneficiary: "Ministry of Transportation of the Republic of Senegal",
    disciplines: [
      "Master planning",
      "Quality control and safety standards compliance",
      "Constructability reviews",
      "Comprehensive construction management consulting, guiding projects with expert oversight.",
    ],
    description: "DESIGN OF SAINT-LOUIS REGIONAL AIRPORT",
    descriptionImage: "/airports/saint-louis/description.png",
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    galleryImages: [
      "/airports/saint-louis/gallery-1.png",
      "/airports/saint-louis/gallery-2.png",
      "/airports/saint-louis/gallery-3.png",
    ],
    aboutParagraphs: [
      "Saint-Louis Airport project encompassed the design of a new regional airport to serve the historic city of Saint-Louis and its surrounding tourism and economic areas.",
      "NEO provided comprehensive engineering design services covering all airside infrastructure including runway, taxiway, apron areas, drainage, and airfield ground lighting systems.",
    ],
    scopeInsteadOfAbout: true,
    scopeOfProject: [
      {
        subtitle: "Runway",
        paragraph:
          "The newly constructed runway retains its threshold orientations at headings 18 and 36, with revised dimensions adjusted to meet current operational requirements. The final geometry of the runway is 2,450 meters in length and 45 meters in width, supporting aircraft operations in accordance with ICAO Code 4C specifications.",
      },
      {
        subtitle: "Taxiway",
        paragraph:
          "The runway is connected to a taxiway measuring 150 meters in length and 15 meters in width, specifically designed to accommodate aircraft with a code number and letter classification of 4C. The design ensures safe and efficient maneuvering of medium-category commercial aircraft.",
      },
      {
        subtitle: "Apron",
        paragraph:
          "A 150 x 108 meter apron has been constructed to support power-in/push-back operations, with a layout optimized for three Boeing 737-300 aircraft. The apron configuration provides sufficient clearance, ground handling space, and operational flexibility for the reference aircraft type.",
      },
    ],
  },
  nis: {
    title: "Constantine the Great Airport",
    subtitle: "[ICAO – LYNI, IATA – INI]",
    heroImage: "/airports/nis/Hero.jpg",
    country: "Serbia",
    employer: "Airports of Serbia",
    contractDate: "2022-2024",
    beneficiary: "Airports of Serbia",
    disciplines: [
      "Civil design",
      "Pavement structure design",
      "Stormwater drainage design",
      "Stormwater analysis",
      "Synthesis plan of installations",
      "Vertical signalization design",
      "Marking of the airside airport areas",
    ],
    description:
      "RECONSTRUCTION AND MODERNIZATION OF AIRSIDE INFRASTRUCTURE AT NIŠ AIRPORT",
    descriptionImage: "/airports/nis/description.png",
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    galleryImages: [
      "/airports/nis/gallery-1.png",
      "/airports/nis/gallery-2.png",
      "/airports/nis/gallery-3.png",
    ],
    aboutParagraphs: [
      "The project at Niš Constantine the Great Airport involved the reconstruction and modernization of key airside infrastructure, supporting the airport's growth as a significant regional hub in southern Serbia.",
      "NEO delivered engineering design for runway rehabilitation, taxiway improvements, apron expansion, stormwater drainage, electrical systems, and comprehensive airfield markings to ICAO standards.",
    ],
    scopeInsteadOfAbout: true,
    scopeOfProjectTitle: "[01] RECONSTRUCTION AND\nEXPANSION OF THE\nEXISTING APRON:",
    scopeOfProject: [
      {
        subtitle: "",
        paragraph:
          "The project involves the reconstruction and expansion of the existing apron, increasing its total area from 32,200 m² to 119,700 m², representing an overall expansion of 87,500 m².",
      },
      {
        subtitle: "",
        paragraph:
          "NEO Aerodromes Engineering is acting as the Overall Chief Designer, responsible for the apron extension, civil works, pavement structure design, stormwater drainage system, and pavement marking layout. In its coordinating role, NEO is also overseeing the design and integration of the new airfield ground lighting (AGL) system and the apron lighting infrastructure, ensuring full alignment with operational and safety standards.",
      },
    ],
    scopeOfProjectSecondary: {
      title: "[02] CONSTRUCTION OF THE NEW\nTAXIWAY AND REMOTE PARKING\nPOSITION:",
      paragraphs: [
        "As part of a broader initiative to increase airside capacity, a new taxiway has been designed to connect the existing runway threshold (THR 11) with the newly expanded apron. In addition, a remote aircraft parking stand has been planned to support operational flexibility. The combined surface area of the taxiway and remote stand covers approximately 97,000 m².",
        "NEO Aerodromes Engineering served as the Overall Chief Designer, responsible for the civil design, pavement structure, stormwater drainage system, and pavement markings. NEO also led the coordination of the AGL system and the design of the lighting system for the new remote parking position.",
      ],
    },
  },
  belgrade: {
    title: "Belgrade Nikola Tesla Airport",
    subtitle: "[ICAO – LYBE, IATA – BEG]",
    heroImage: "/airports/nikolatesla.jpg",
    country: "Serbia",
    employer: "Vinci Terna Construction JV",
    contractDate: "2019-2024",
    beneficiary: "VINCI Airport Belgrade",
    disciplines: [
      "Civil design and construction supervision",
      "Pavement structure design",
      "Stormwater drainage design",
      "Stormwater analysis",
      "Underground retention and detention pond design",
      "Preparatory works - demolition of the existing objects",
      "Synthesis plan of installations",
      "Concept of Operations (CONOPS)",
      "Vertical signalization design",
      "Marking of the airside airport areas - design and supervision",
    ],
    description:
      "DESIGN AND SUPERVISION OF AIRSIDE WORKS AT BELGRADE NIKOLA TESLA AIRPORT",
    ...projectImages("belgrade"),
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    aboutParagraphs: [
      "Belgrade Nikola Tesla Airport, Serbia's primary international gateway, underwent significant airside improvements with NEO providing design and supervision services for multiple phases of works.",
      "The scope included pavement rehabilitation, taxiway system upgrades, apron reconfiguration, stormwater drainage improvements, airfield ground lighting modernization, and comprehensive surface markings.",
      "NEO also provided construction supervision services ensuring that all works were executed in compliance with the design documentation and applicable ICAO and EASA regulations.",
    ],
    scopeInsteadOfAbout: true,
    scopeOfProjectTitle: "[01] CONSTRUCTION OF THE NEW BASE - CASE INSERTED RUNWAY\n(12R-30L, 3500 X 45M), NEW TAXIWAYS AND RECONSTRUCTION OF THE EXISTING TAXIWAYS:",
    scopeOfProject: [
      {
        subtitle: "",
        paragraph:
          "NEO Aerodromes Engineering served as the Overall Chief Designer on this strategically significant project, which involved the construction of a new runway (12R–30L), measuring 3,500 meters in length and 45 meters in width, along with new taxiways and the reconstruction of existing ones.\n\nNEO's scope of work included the complete civil and pavement structure design, the design of the stormwater drainage system, as well as an underground retention system. The company was also responsible for the design of installations related to ILS (Instrument Landing System), AGL (Airfield Ground Lighting), and METEO equipment.",
      },
      {
        subtitle: "",
        paragraph:
          "In addition to technical design, NEO developed the project's Concept of Operations (CONOPS), prepared all horizontal markings and vertical signage, and coordinated the demolition of the existing Taxiway D. As lead designer, NEO directed the integration of the new AGL system and managed the relocation of high-voltage and medium-voltage electrical infrastructure within the construction area.\n\nFurthermore, NEO designed a new electrical substation and oversaw the integration of ILS equipment necessary for Category III operations. Beyond its design responsibilities, NEO was also engaged in site supervision throughout the construction phase, ensuring full alignment between design intent and execution on site.",
      },
    ],
    scopeOfProjectSecondary: {
      title: "[02] EXPANSION OF THE TERMINAL\nBUILDING AND APRON C:",
      paragraphs: [
        "Alongside the Terminal expansion, the Phase 1 of the Apron C extension was successfully completed. This expansion added approximately 45,000 square meters of new apron surface and was carried out concurrently with the development of Pier C. As part of this phase, eight new aircraft parking stands were constructed, significantly enhancing the airport's overall capacity and enabling direct access to the newly developed de-/anti-icing pad.",
        "NEO Aerodromes Engineering served as the Chief Designer, responsible for the civil engineering design, stormwater drainage system, pavement marking, and coordination of the AGL (Airfield Ground Lighting) system. In addition to design duties, NEO also provided site supervision throughout the entire construction process, ensuring successful implementation of all project components in accordance with design standards and operational requirements.",
      ],
    },
    galleryBeforeNext: [
      "/airports/belgrade/extra-1.jpg",
      "/airports/belgrade/extra-2.jpg",
      "/airports/belgrade/extra-3.jpg",
      "/airports/belgrade/extra-4.jpg",
    ],
    scopeSectionBeforeGallery2: {
      title: "[03] CONSTRUCTION OF THE NEW DE-/ANTI-ICING PAD:",
      paragraphs: [
        "The new pad construction project, including the required modifications to the existing pad, will span an area of approximately 25,500m². NEO served as the Overall Chief Designer for this project, responsible for civil design, pavement structure design, stormwater drainage system design (including subgrade drainage) and the marking design.",
        "As the Overall Chief Designer, NEO also coordinated the installation of the new AGL system, the lighting system for the de-/anti-icing pad, and all other necessary installations. NEO has been given the responsibility for coordination of the relocation of the facility for storing ADF (aircraft deicing fluid). In addition to their design responsibilities, NEO was also commissioned to oversee site supervision during the construction phase.",
      ],
    },
    galleryBeforeNext2: [
      "/airports/belgrade/extra2-1.jpg",
      "/airports/belgrade/extra2-2.jpg",
      "/airports/belgrade/extra2-3.jpg",
      "/airports/belgrade/extra2-4.jpg",
    ],
    scopeSectionsBeforeNext: [
      {
        title: "[04] EXTENSION OF THE APRON B:",
        paragraphs: [
          "The upgrade and reconfiguration of Apron B have been successfully completed, resulting in an additional 11,000 m² of apron surface. This expansion increased the capacity from seven Code C aircraft stands to ten Code C stands and one dependent stand for a Code E aircraft.",
          "NEO Aerodromes Engineering served as the Overall Chief Designer, responsible for the civil design, pavement structure design, stormwater drainage system, and marking layout. NEO also led the comprehensive design coordination throughout all phases of the project. In addition to its design responsibilities, NEO provided site supervision during the construction phase, ensuring full compliance with technical and operational standards.",
        ],
      },
      {
        title: "[05] RECONSTRUCTION OF THE EXISTING RUNWAY:",
        paragraphs: [
          "NEO has completed all required documentation and successfully obtained the Construction Permit for the reconstruction of Runway 12-30, which will be redesignated as Runway 12L-30R upon completion. The reconstruction will be carried out using the rubblization technique, wherein the existing concrete pavement is broken in-place and overlaid with new asphalt layers.",
          "NEO Aerodromes Engineering served as the Overall Chief Designer, responsible for the civil design, pavement structure design, stormwater drainage system, and marking layout. NEO also led the comprehensive design coordination throughout all phases of the project. In addition to its design responsibilities, NEO provided site supervision during the construction phase, ensuring full compliance with technical and operational standards.",
          "The reconstructed runway will measure 3,500 meters in length and 45 meters in width, designed to accommodate operations under ICAO Code 4E, with a total reconstruction area of 183,000 m². As the Overall Chief Designer, NEO is responsible for the civil and pavement structure design, drainage system design, and pavement marking plan, as well as for site supervision during the implementation phase.",
        ],
      },
    ],
  },
  vrsac: {
    title: "Vršac Airport",
    subtitle: "[ICAO – LYVR]",
    heroImage: "/airports/vrsacairport.jpg",
    country: "Serbia",
    employer: "Airports of Serbia",
    contractDate: "2024",
    beneficiary: "SMATSA Aviation Academy",
    disciplines: [
      "Civil design",
      "Pavement structure design",
      "Stormwater drainage design",
      "Stormwater analysis",
      "Synthesis plan of installations",
      "Vertical signalization design",
      "Airside marking design",
      "Landside marking design",
    ],
    description: "REHABILITATION OF RUNWAY AT VRŠAC AIRPORT",
    ...projectImages("vrsac"),
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    aboutParagraphs: [
      "The project at Vršac Airport focused on the rehabilitation of the existing runway to support continued flight training operations and general aviation activities.",
      "NEO provided pavement evaluation and design services for the runway rehabilitation, ensuring compliance with applicable standards for the airport's operational category.",
    ],
    scopeInsteadOfAbout: true,
    scopeOfProjectTitle: "[01] RECONSTRUCTION AND EXTENSION OF THE EXISTING RUNWAY, TAXIWAYS & APRON",
    scopeOfProject: [
      {
        subtitle: "",
        paragraph:
          "This design envisions the expansion of the capacity of maneuvering areas and aprons, ensuring that the physical characteristics of the airport and all associated facilities meet the requirements for the operation of the critical aircraft with code 3C. The OLS surfaces are designed for the reference fleet designated for 2B aircraft.",
      },
      {
        subtitle: "",
        paragraph:
          "This design encompasses the reconstruction and extension of the existing runway 01R-19L, adjusting its load-bearing capacity to comply with standards and regulations; the reconstruction and extension of taxiways, modifying their load-bearing capacity to meet applicable standards and regulations; and the reconstruction and merging of the existing aprons into one unified apron.",
      },
    ],
    scopeSectionsBeforeNext: [
      {
        title: "[02] CONSTRUCTION OF THE NEW HELIPORT",
        paragraphs: [
          "NEO has designed a heliport positioned and dimensioned to accommodate the critical helicopter MI17. All necessary surfaces within the existing airport complex have been defined based on the critical helicopter and the site's conditions. The dimensions of the Final Approach and Takeoff Area (FATO) are D=26m, and the dimensions of the Safety Area (SA) are D=52m.",
        ],
      },
      {
        title: "[03] RELOCATION OF THE EXISTING ACCESS ROAD",
        paragraphs: [
          "The existing access road intersects with the planned runway extension at the threshold zone 01R. Therefore, before commencing the reconstruction and extension of the current runway, it is necessary to relocate the access road to the airport complex. The main focus of this design is the relocation of the access road to the Vršac Airport complex.",
        ],
      },
    ],
  },
  "krusevac-rosulje": {
    title: "Kruševac-Rosulje Airfield",
    subtitle: "[ICAO – GOSM, IATA -MAX]",
    heroImage: "/airports/krusevac.jpg",
    country: "Serbia",
    employer: "Airports of Serbia",
    contractDate: "2023-2024",
    beneficiary: "Airports of Serbia",
    disciplines: [
      "Civil design",
      "Pavement structure design",
      "Stormwater drainage design",
      "Stormwater analysis",
      "Synthesis plan of installations",
      "Vertical signalization design",
      "Airside marking design",
      "Landside marking design",
    ],
    description: "DESIGN OF KRUŠEVAC-ROSULJE AIRFIELD INFRASTRUCTURE",
    ...projectImages("krusevac-rosulje"),
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    aboutParagraphs: [
      "The Kruševac-Rosulje Airfield project involved the design of airfield infrastructure to support regional connectivity and general aviation operations in central Serbia.",
      "NEO provided comprehensive design services for runway, taxiway, and apron areas including pavement structures and surface drainage systems.",
    ],
    scopeInsteadOfAbout: true,
    scopeOfProjectTitle: "[01] CONSTRUCTION OF THE NEW RUNWAY\n15-33 & ACCOMPANYING TAXIWAY",
    scopeOfProject: [
      {
        subtitle: "",
        paragraph:
          "The subject of this technical documentation is the design for the construction of the runway, the runway strip, the drainage system, and the AGL system, as well as the taxiway that connects the runway with the existing apron by the hangar. At the request of the investor, a runway has been designed with a length of 820 meters and a width of 23 meters. Turn pads for aircraft (Code Letter B) have been planned at both thresholds.",
      },
      {
        subtitle: "",
        paragraph:
          "The new apron, in terms of both structural and operational characteristics, is designed to accommodate the largest aircraft up to Code Letter E, ensuring safe traffic flow and uninterrupted aircraft, passenger, and cargo handling operations. NEO was the Chief Designer for the civil design, stormwater and drainage system, marking, and coordinator for the AGL system.",
      },
    ],
    scopeSectionsBeforeNext: [
      {
        title: "[02] EXTENSION OF THE RUNWAY WITH ASSOCIATED TAXIWAYS,\nAPRON, HANGAR & SUPPORTING FACILITIES",
        paragraphs: [
          "The non-instrument runway is planned for an airport reference code of 2B; NEO has conducted an obstacle limitation surfaces analysis for the defined airport reference code. In addition to the runway extension, the construction of an apron with approximate dimensions of 140×60 meters has also been planned.",
          "To connect the newly planned runway extension, the existing runway, and the apron, the construction of two new taxiways has been designed. NEO has also designed an access road to the hangar/terminal with an adjacent parking area.",
        ],
      },
    ],
  },
  "ouro-sogui": {
    title: "Ouro Sogui Airport",
    subtitle: "[ICAO – GOSM, IATA -MAX]",
    heroImage: "/airports/ouro-sogui/Hero.jpeg",
    country: "Senegal",
    employer: "Transcon Electronic Systems S.R.O. Prague, Czech Republic",
    contractDate: "2018 – 2024",
    beneficiary: "Ministry of Transportation of the Republic of Senegal",
    disciplines: [
      "Master planning",
      "Quality control and safety standards compliance",
      "Constructability reviews",
      "Comprehensive construction management consulting, guiding projects with expert oversight.",
    ],
    description: "DESIGN OF OURO SOGUI REGIONAL AIRPORT",
    descriptionImage: "/airports/ouro-sogui/description.png",
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    galleryImages: [
      "/airports/ouro-sogui/gallery-1.png",
      "/airports/ouro-sogui/gallery-2.png",
      "/airports/ouro-sogui/gallery-3.png",
    ],
    aboutParagraphs: [
      "As part of the Programme de Réhabilitation des Aéroports du Sénégal (PRAS), the Government of the Republic of Senegal initiated a national effort to modernize and upgrade existing airports across the country. Ouro Sogui Airport is one of five regional airports selected for reconstruction under this strategic initiative.",
      "Within the scope of this project, NEO Aerodromes Engineering was entrusted with the development of the detailed master plan. Additionally, as a key member of the project management team, NEO was responsible for the coordination and technical review of the design for all airside components, including the apron and service roads, as well as landside infrastructure. The scope also encompassed the design oversight of all associated facilities and utilities, such as the passenger terminal, air traffic control tower, and aircraft hangar.",
    ],
    scopeOfProject: [
      {
        subtitle: "Runway",
        paragraph:
          "The newly reconstructed runway will retain its threshold orientations at headings 13 and 31, while its overall length will be modified. The updated dimensions of the runway will be 2,200 meters in length and 30 meters in width, meeting the operational requirements of the reference aircraft.",
      },
      {
        subtitle: "Taxiway",
        paragraph:
          "A connecting taxiway measuring 150 meters in length and 15 meters in width is planned to serve the new runway. It is designed to accommodate aircraft with an ICAO reference code of 3C, ensuring safe and efficient ground movements.",
      },
      {
        subtitle: "Apron",
        paragraph:
          "A new 110 x 50 meter apron will be constructed to facilitate aircraft parking and servicing. Parking operations will follow a power-in/power-out configuration, with the layout optimized for two Fokker 27-600 aircraft as reference types.",
      },
    ],
  },
  pancevo: {
    title: "Pančevo Airport Master Plan",
    subtitle: "[Serbia]",
    heroImage: "/airports/pancevo.png",
    country: "Serbia",
    employer: "City of Pančevo",
    contractDate: "2020",
    beneficiary: "Republic of Serbia",
    disciplines: ["Civil Engineering", "Pavement Design", "Master Planning"],
    description: "PANČEVO AIRPORT MASTER PLAN",
    ...projectImages("pancevo"),
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    aboutParagraphs: [
      "The Pančevo Airport Master Plan project involved comprehensive planning and design for the development of Pančevo Airport.",
      "NEO provided master planning and engineering design services for airside infrastructure.",
    ],
  },
  "lisiciji-jarak": {
    title: "Lisičji Jarak Airport Master Plan",
    subtitle: "[Serbia]",
    heroImage: "/airports/lisiciji.png",
    country: "Serbia",
    employer: "Government of Serbia",
    contractDate: "2020",
    beneficiary: "Republic of Serbia",
    disciplines: ["Civil Engineering", "Pavement Design", "Master Planning"],
    description: "LISIČJI JARAK AIRPORT MASTER PLAN",
    ...projectImages("lisiciji-jarak"),
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    aboutParagraphs: [
      "The Lisičji Jarak Airport Master Plan project involved planning and design for the development of Lisičji Jarak Airport.",
      "NEO provided master planning and engineering design services for airside infrastructure.",
    ],
  },
  kopaonik: {
    title: "Heliport Kopaonik",
    subtitle: "[Serbia]",
    heroImage: "/airports/kopaonik.png",
    country: "Serbia",
    employer: "Kopaonik Resort",
    contractDate: "2021",
    beneficiary: "Republic of Serbia",
    disciplines: ["Civil Engineering", "Heliport Design"],
    description: "HELIPORT KOPAONIK, SERBIA",
    ...projectImages("kopaonik"),
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    aboutParagraphs: [
      "The Heliport Kopaonik project involved the design of heliport infrastructure at Kopaonik mountain resort.",
      "NEO provided design services for helipad and supporting infrastructure.",
    ],
  },
  mup: {
    title: "Heliport MUP, Serbia",
    subtitle: "[Serbia]",
    heroImage: "/airports/mup.jpg",
    country: "Serbia",
    employer: "Ministry of Interior",
    contractDate: "2021",
    beneficiary: "Republic of Serbia",
    disciplines: ["Civil Engineering", "Heliport Design", "Electrical"],
    description: "HELIPORT MUP, SERBIA",
    ...projectImages("mup"),
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    aboutParagraphs: [
      "The Heliport MUP project involved the design of heliport infrastructure for the Ministry of Interior of Serbia.",
      "NEO provided design services for helipad and supporting infrastructure.",
    ],
  },
  morava: {
    title: "Morava Airport Kraljevo",
    subtitle: "[ICAO – LYKV, IATA – KVO]",
    heroImage: "/airports/kraljevo.jpg",
    country: "Serbia",
    employer: "Airports of Serbia",
    contractDate: "2023",
    beneficiary: "Airports of Serbia",
    disciplines: [
      "Civil design",
      "Pavement structure design",
      "Stormwater drainage design",
      "Stormwater analysis",
      "Synthesis plan of installations",
      "Vertical signalization design",
      "Airside marking design",
      "Landside marking design",
    ],
    description: "MORAVA AIRPORT KRALJEVO, SERBIA",
    ...projectImages("morava"),
    descriptionImageTitle: "Rehabilitation and\nExpansion of the\nMain Apron",
    aboutParagraphs: [
      "The Morava Airport Kraljevo project involved design and modernization of airport infrastructure in central Serbia.",
      "NEO provided comprehensive design services for runway, taxiway, and apron areas.",
    ],
    scopeBlocksInsteadOfAbout: [
      {
        title: "[02] CONSTRUCTION OF THE NEW MAINTENANCE BLOCK WITH FIREFIGHTING STATION FACILITY",
        paragraphs: [
          "The subject of this technical documentation is the design for the construction of the runway, the runway strip, the drainage system, and the AGL system, as well as the taxiway that connects the runway with the existing apron by the hangar. At the request of the investor, a runway has been designed with a length of 820 meters and a width of 23 meters. Turn pads for aircraft (Code Letter B) have been planned at both thresholds.",
        ],
      },
      {
        title: "[03] CONSTRUCTION OF THE NEW SERVICE ROAD",
        paragraphs: [
          "The service road is designed to run around the fenced sanitary protection zone and the energy block, seamlessly connecting with the existing asphalt road, and is intended for two-way traffic.",
        ],
      },
    ],
    scopeSectionsBeforeNext: [
      {
        title: "[03] EXPANSION OF THE EXISTING LANDSIDE PARKING LOT",
        paragraphs: [
          "In the landside airport area, an extension is planned to accommodate parking for various categories of individuals (passenger and visitor parking, employee parking, rent-a-car agency parking, taxi parking, bus parking, and parking for government vehicles and institutions essential for airport operations). The parking area, as a distinct functional unit, fully meets safety requirements for road traffic.",
        ],
      },
      {
        title: "[04] RECONSTRUCTION OF THE EXISTING TAXIWAY AND EXPANSION OF THE EXISTING APRON",
        paragraphs: [
          "NEO has been developing a design to expand and enhance the apron at 'Morava' Airport in Kraljevo. This expansion will ensure continuity with the existing apron in terms of traffic flow and operational technology. By extending the current apron, this design will facilitate safe passenger boarding and disembarkation and loading and unloading of cargo and mail, as well as aircraft maintenance, while providing additional apron space for servicing aircraft in accordance with the expressed needs of the 'Morava' Airport.",
        ],
      },
    ],
  },
};

export default projects;
