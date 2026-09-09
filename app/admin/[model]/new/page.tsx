import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { modelByKey } from "@/lib/models";
import { AdminShell } from "@/components/admin-shell";
import { RecordForm } from "@/components/record-form";
import { saveRecord } from "@/lib/admin-actions";
export const dynamic="force-dynamic";
export default async function NewRecord({ params }:{ params:{model:string} }) {
  requireAdmin();
  const m = modelByKey(params.model); if(!m) notFound();
  const prefectures = await prisma.prefecture.findMany({ select:{slug:true,name:true}, orderBy:{name:"asc"} });
  const action = saveRecord.bind(null, m.key, null);
  return (
    <AdminShell active={m.key}>
      <h1 className="mb-6 text-xl font-bold text-slate-900">{m.emoji} {m.label}を新規作成</h1>
      <RecordForm action={action} fields={m.fields} initial={{status:"draft",published:true}} prefectures={prefectures} />
    </AdminShell>
  );
}
