import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/constants";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const [prefs, companies, people, projects, events, orgs] = await Promise.all([
    prisma.prefecture.findMany({ where:{published:true}, select:{slug:true,updatedAt:true} }),
    prisma.company.findMany({ where:{status:"published"}, select:{slug:true,updatedAt:true} }),
    prisma.person.findMany({ where:{status:"published"}, select:{slug:true,updatedAt:true} }),
    prisma.project.findMany({ where:{status:"published"}, select:{slug:true,updatedAt:true} }),
    prisma.event.findMany({ where:{status:"published"}, select:{slug:true,updatedAt:true} }),
    prisma.organization.findMany({ where:{status:"published"}, select:{slug:true,updatedAt:true} }),
  ]);
  const stat = ["","/prefectures","/companies","/people","/projects","/events","/organizations","/join","/for-companies","/about","/company","/editorial-policy","/privacy","/contact"];
  const staticUrls: MetadataRoute.Sitemap = stat.map(p=>({ url:`${base}${p}`, changeFrequency:"weekly", priority: p===""?1:0.7 }));
  const dyn = (arr:any[], path:string, pr=0.8): MetadataRoute.Sitemap =>
    arr.map(x=>({ url:`${base}${path}/${x.slug}`, lastModified:x.updatedAt, changeFrequency:"weekly" as const, priority:pr }));
  return [
    ...staticUrls,
    ...dyn(prefs,"/prefecture",0.9),
    ...dyn(companies,"/companies"),
    ...dyn(people,"/people"),
    ...dyn(projects,"/projects"),
    ...dyn(events,"/events",0.6),
    ...dyn(orgs,"/organizations",0.6),
  ];
}
