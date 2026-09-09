"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
import { modelByKey } from "@/lib/models";

function guard(){ if(!isAdmin()) throw new Error("unauthorized"); }
function slugify(s:string, fallbackKey:string){
  const base=(s||"").toLowerCase().replace(/[^a-z0-9ぁ-んァ-ヶ一-龠]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40);
  return base || `${fallbackKey}-${Date.now().toString(36)}`;
}

function buildData(key:string, fd:FormData){
  const m = modelByKey(key)!;
  const data:any = {};
  for (const f of m.fields){
    const raw = fd.get(f.name);
    if (f.type==="bool") data[f.name] = fd.get(f.name)==="on" || fd.get(f.name)==="1";
    else if (f.type==="date") data[f.name] = raw ? new Date(String(raw)) : null;
    else data[f.name] = String(raw ?? "").trim();
  }
  return { m, data };
}

export async function saveRecord(key:string, id:string|null, fd:FormData){
  guard();
  const { m, data } = buildData(key, fd);
  const delegate = (prisma as any)[m.delegate];
  // slug
  if ("slug" in data){
    if (!data.slug) data.slug = slugify(String(fd.get(m.titleField)||""), m.delegate);
  }
  // publishedAt（公開状態を持つモデル）
  if ("status" in data){
    if (data.status==="published"){
      if (id){ const cur=await delegate.findUnique({where:{id}}); data.publishedAt = cur?.publishedAt ?? new Date(); }
      else data.publishedAt = new Date();
    } else data.publishedAt = null;
  }
  try {
    if (id) await delegate.update({ where:{id}, data });
    else await delegate.create({ data });
  } catch(e:any){
    // slug 重複時は後ろに乱数
    if (String(e?.code)==="P2002"){ data.slug = `${data.slug}-${Date.now().toString(36).slice(-4)}`; if(id) await delegate.update({where:{id},data}); else await delegate.create({data}); }
    else throw e;
  }
  revalidatePath("/"); revalidatePath(`/admin/${key}`); revalidatePath("/admin");
  redirect(`/admin/${key}`);
}

export async function deleteRecord(key:string, id:string){
  guard();
  const m = modelByKey(key)!;
  await (prisma as any)[m.delegate].delete({ where:{id} }).catch(()=>{});
  revalidatePath("/"); revalidatePath(`/admin/${key}`);
}

export async function setStage(key:string, id:string, stage:string){
  guard();
  const m = modelByKey(key)!;
  await (prisma as any)[m.delegate].update({ where:{id}, data:{ stage } });
  revalidatePath(`/admin/${key}`); revalidatePath("/admin/pipeline");
}

export async function markHandled(kind:"registration"|"inquiry", id:string, handled:boolean){
  guard();
  if (kind==="registration") await prisma.registration.update({ where:{id}, data:{handled} });
  else await prisma.inquiry.update({ where:{id}, data:{handled} });
  revalidatePath("/admin/inbox");
}

import { generateDraft, type DraftType } from "@/lib/ai";
export async function aiCreateDraft(fd: FormData){
  guard();
  const type = String(fd.get("type") ?? "企業") as DraftType;
  const name = String(fd.get("name") ?? "").trim();
  const prefecture = String(fd.get("prefecture") ?? "").trim();
  const notes = String(fd.get("notes") ?? "").trim();
  if (!name) redirect("/admin/ai?e=1");
  const { fields } = await generateDraft({ type, name, prefecture, notes });
  const now = new Date();
  const slug = `${type==="企業"?"co":type==="プロジェクト"?"pj":"pe"}-${Date.now().toString(36)}`;
  if (type==="企業"){
    const r = await prisma.company.create({ data:{ slug, name, prefecture, status:"draft", stage:"原稿作成中",
      description:fields.description||"", history:fields.history||"", strengths:fields.strengths||"",
      localRelation:fields.localRelation||"", futureChallenge:fields.futureChallenge||"", wantedPerson:fields.wantedPerson||"",
      messageToLocals:fields.messageToLocals||"", seoTitle:fields.seoTitle||"", seoDescription:fields.seoDescription||"", crmNotes:notes } });
    redirect(`/admin/companies/${r.id}/edit`);
  }
  if (type==="プロジェクト"){
    const r = await prisma.project.create({ data:{ slug, title:name, prefecture, status:"draft",
      summary:fields.summary||"", issue:fields.issue||"", current:fields.current||"", goal:fields.goal||"",
      wantedHelp:fields.wantedHelp||"", joinHow:fields.joinHow||"", seoTitle:fields.seoTitle||"", seoDescription:fields.seoDescription||"" } });
    redirect(`/admin/projects/${r.id}/edit`);
  }
  // 人物 / 議員
  const r = await prisma.person.create({ data:{ slug, name, prefecture, status:"draft", stage:"原稿作成中",
    category: type==="議員"?"議員":"地域プレイヤー",
    bio:fields.bio||"", story:fields.story||"", message:fields.message||"",
    localIssue:fields.localIssue||"", vision:fields.vision||"", seoTitle:fields.seoTitle||"", seoDescription:fields.seoDescription||"", crmNotes:notes } });
  redirect(`/admin/people/${r.id}/edit`);
}
