import { NextResponse } from "next/server";

import { professionalProfile, siteUrl } from "@/lib/content/professionalProfile";

export const dynamic = "force-static";

export const GET = async () => {
  return NextResponse.json(
    {
      profile: {
        name: professionalProfile.name,
        headline: professionalProfile.headline,
        description: professionalProfile.description,
        location: professionalProfile.location,
        email: professionalProfile.email,
        sameAs: professionalProfile.sameAs,
      },
      links: {
        homepage: siteUrl,
        about: `${siteUrl}/about`,
        projects: `${siteUrl}/projects`,
        contact: `${siteUrl}/contact`,
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
