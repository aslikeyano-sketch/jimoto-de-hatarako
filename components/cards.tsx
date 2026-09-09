import Link from "next/link";
import { Placeholder, Tag } from "@/components/ui";
import { PERSON_CATEGORY_COLORS } from "@/lib/constants";

function Cover({ src, label, emoji }:{ src?:string; label:string; emoji?:string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
      ) : <Placeholder label={label} emoji={emoji} />}
    </div>
  );
}

export function CompanyCard({ c }:{ c:any }) {
  return (
    <Link href={`/companies/${c.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <Cover src={c.coverImage} label="企業" emoji="🏢" />
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex gap-1.5"><Tag color="bg-brand-100 text-brand-700">{c.industry||"企業"}</Tag><Tag>{c.area||c.prefecture}</Tag></div>
        <h3 className="font-bold leading-snug text-slate-900 group-hover:text-brand-700">{c.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">{c.description}</p>
      </div>
    </Link>
  );
}

export function PersonCard({ p }:{ p:any }) {
  return (
    <Link href={`/people/${p.slug}`} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-xl font-bold text-brand-700">
        {p.photo ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.photo} alt="" className="h-full w-full object-cover"/> : p.name.slice(0,1)}
      </span>
      <div className="min-w-0">
        <div className="mb-1"><Tag color={PERSON_CATEGORY_COLORS[p.category]||"bg-slate-100 text-slate-600"}>{p.category}</Tag></div>
        <h3 className="truncate font-bold text-slate-900 group-hover:text-brand-700">{p.name}</h3>
        <p className="truncate text-xs text-slate-500">{p.title||p.affiliation}</p>
      </div>
    </Link>
  );
}

export function ProjectCard({ p }:{ p:any }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <Cover src={p.coverImage} label="プロジェクト" emoji="🌱" />
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex gap-1.5"><Tag color="bg-leaf-500/10 text-leaf-700">{p.theme||"地方創生"}</Tag></div>
        <h3 className="line-clamp-2 font-bold leading-snug text-slate-900 group-hover:text-brand-700">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">{p.summary}</p>
      </div>
    </Link>
  );
}

export function EventCard({ e, fmt }:{ e:any; fmt:(d:any)=>string }) {
  return (
    <Link href={`/events/${e.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <Cover src={e.coverImage} label="イベント" emoji="📅" />
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex flex-wrap gap-1.5">
          <Tag color="bg-amber-100 text-amber-700">{e.category||"イベント"}</Tag>
          {e.inTokyo && <Tag color="bg-indigo-100 text-indigo-700">東京開催</Tag>}
          {e.isOnline && <Tag color="bg-sky-100 text-sky-700">オンライン</Tag>}
        </div>
        <h3 className="line-clamp-2 font-bold leading-snug text-slate-900 group-hover:text-brand-700">{e.title}</h3>
        <p className="mt-2 text-xs text-slate-500">{e.heldOn?fmt(e.heldOn):"日程調整中"}・{e.place}</p>
      </div>
    </Link>
  );
}

export function OrgCard({ o }:{ o:any }) {
  return (
    <Link href={`/organizations/${o.slug}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="mb-1"><Tag color="bg-violet-100 text-violet-700">{o.type}</Tag></div>
      <h3 className="font-bold text-slate-900 group-hover:text-brand-700">{o.name}</h3>
      <p className="mt-1 text-xs text-slate-500">{o.area}</p>
      <p className="mt-2 line-clamp-2 text-sm text-slate-500">{o.purpose}</p>
    </Link>
  );
}
