"use client";

import dynamic from "next/dynamic";

const ProjectsMap = dynamic(() => import("./ProjectsMap"), {
  ssr: false,
});

export default function ProjectsMapLoader() {
  return <ProjectsMap />;
}
