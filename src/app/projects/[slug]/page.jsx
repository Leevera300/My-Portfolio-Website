import { projects } from "../../data/projects";
import ProjectDetail from "../../components/project/ProjectDetail";

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug: slug,
  }));
}

export default function ProjectPage({ params }) {
  return <ProjectDetail slug={params.slug} />;
}
