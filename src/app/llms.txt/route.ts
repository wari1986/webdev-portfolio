import { NextResponse } from "next/server";

import { professionalProfile, projectAreas, siteUrl } from "@/lib/content/professionalProfile";

export const dynamic = "force-static";

export const GET = async () => {
  const body = [
    `# ${professionalProfile.name}`,
    "",
    `URL: ${siteUrl}`,
    `Summary: ${professionalProfile.description}`,
    "",
    "## Core pages",
    `- ${siteUrl}/about`,
    `- ${siteUrl}/projects`,
    `- ${siteUrl}/contact`,
    "",
    "## Machine-readable endpoints",
    `- ${siteUrl}/api/profile.json`,
    `- ${siteUrl}/api/projects.json`,
    "",
    "## Active project areas",
    ...projectAreas.map((project) => `- ${project.name}: ${project.description}`),
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
