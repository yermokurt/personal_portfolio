import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    }, { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: .9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: .7 },
    ...projects.map((project) => ({ url: `${siteUrl}/work/${project.id}`, changeFrequency: "monthly" as const, priority: .8 })),
    { url: `${siteUrl}/legacy`, changeFrequency: "yearly" as const, priority: .3 },
  ];
}
