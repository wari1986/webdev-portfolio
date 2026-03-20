import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/content/professionalProfile";

const sitemap = (): MetadataRoute.Sitemap => {
  const routes = ["", "/about", "/projects", "/contact", "/llms.txt"];
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
};

export default sitemap;
