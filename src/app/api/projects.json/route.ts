import { NextResponse } from "next/server";

import { projectAreas, siteUrl } from "@/lib/content/professionalProfile";

export const dynamic = "force-static";

export const GET = async () => {
  return NextResponse.json(
    {
      projects: projectAreas,
      links: {
        homepage: siteUrl,
        projectsPage: `${siteUrl}/projects`,
      },
      generatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "cache-control": "public, max-age=3600, s-maxage=3600",
      },
    },
  );
};
