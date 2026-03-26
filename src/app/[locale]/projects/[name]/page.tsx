import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import projects from "./projectData";
import ProjectTemplate from "./ProjectTemplate";

// Redosled (Next Project):
// Kishinev → Goma → Matam/Ouro Sogui → Saint Louis → Konstantin Veliki (Niš)
// → Nikola Tesla (Belgrade) → Pančevo → Lisičji Jarak → Vršac → Kruševac/Rosulje
// → Heliport Kopaonik → Kraljevo (Morava) → Heliport MUP → (wrap) Kishinev
const slugOrder = [
  "kishinev",
  "goma",
  "ouro-sogui",
  "saint-louis",
  "nis",
  "belgrade",
  "pancevo",
  "lisiciji-jarak",
  "vrsac",
  "krusevac-rosulje",
  "kopaonik",
  "morava",
  "mup",
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
