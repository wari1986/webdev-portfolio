import type { Metadata } from "next";
import Link from "next/link";

import { projectAreas } from "@/lib/content/professionalProfile";

export const metadata: Metadata = {
  title: "Projects",
  description: "Current project areas and active engineering focus.",
  alternates: {
    canonical: "/projects",
  },
};

const ProjectsPage = () => {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-5 text-[var(--color-fg-soft)]">Active work areas and engineering focus.</p>

      <ul className="mt-8 space-y-5">
        {projectAreas.map((project) => (
          <li key={project.slug} className="rounded border border-[var(--color-divider)] p-4">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="mt-2">{project.description}</p>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
              Status: {project.status} · Categories: {project.category.join(", ")}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-[var(--color-fg-muted)]">
        Also see <Link className="underline" href="/about">About</Link> and <Link className="underline" href="/api/projects.json">machine-readable projects JSON</Link>.
      </p>
    </main>
  );
};

export default ProjectsPage;
