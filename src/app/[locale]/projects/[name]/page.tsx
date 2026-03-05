import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import projects from "./projectData";
import ProjectTemplate from "./ProjectTemplate";

// Redosled: Kishinev → Goma → Ouro Sogui → Saint Louis → Niš → Nikola Tesla → Vršac → Rosulje → Morava (next: Kishinev). Ostali projekti za sada izostavljeni.
const slugOrder = [
  "kishinev",
  "goma",
  "ouro-sogui",
  "saint-louis",
  "nis",
  "belgrade",
  "vrsac",
  "krusevac-rosulje",
  "morava",
];
const orderedSlugs = slugOrder.filter((s) => s in projects);
const allSlugs = Object.keys(projects);

export function generateStaticParams() {
  return allSlugs.map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; name: string }>;
}) {
  const { name } = await params;
  const project = projects[name];
  if (!project) return {};

  return {
    title: `${project.title} — NEO`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; name: string }>;
}) {
  const { locale, name } = await params;
  setRequestLocale(locale);
  const project = projects[name];

  if (!project) {
    notFound();
  }

  // Get next project (redosled kao na Projects stranici, wraparound)
  const order = orderedSlugs.length > 0 ? orderedSlugs : allSlugs;
  const currentIndex = order.indexOf(name);
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % order.length : 0;
  const nextSlug = order[nextIndex];
  const nextProjectData = projects[nextSlug];

  return (
    <ProjectTemplate
      project={project}
      nextProject={{
        slug: nextSlug,
        title: nextProjectData.title,
        subtitle: nextProjectData.subtitle,
        heroImage: nextProjectData.heroImage,
      }}
    />
  );
}
