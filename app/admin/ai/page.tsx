import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";
import { aiCreateDraft } from "@/lib/admin-actions";
export const dynamic="force-dynamic";
export const metadata={ title:"AI取材記事生成", robots:{index:false} };
const inp="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500";
const lb="mb-1 block text-sm font-medium text-slate-600";
export default async function AiDraft({ searchParams }:{ searchParams:{e?:string} }) {
  requireAdmin();
  const prefs = await prisma.prefecture.findMany({ select:{slug:true,name:true}, orderBy:{name:"asc"} });
  return (
    <AdminShell active="ai">
      <h1 className="mb-2 text-xl font-bold text-slate-900">AI取材記事生成</h1>
      <p className="mb-6 text-sm text-slate-500">取材メモを貼り付けると、下書き記事を1本自動作成します。生成後は必ず内容を確認・編集し、取材先の確認を経てから公開してください。</p>
      {searchParams.e && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">対象名は必須です。</p>}
      <form action={aiCreateDraft} className="max-w-2xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div><label className={lb}>種別</label>
            <select name="type" className={inp}><option>企業</option><option>人物</option><option>議員</option><option>プロジェクト</option></select></div>
          <div className="sm:col-span-2"><label className={lb}>対象名（会社名・氏名・企画名）*</label><input name="name" required className={inp} /></div>
        </div>
        <div><label className={lb}>都道府県</label>
          <select name="prefecture" className={inp}><option value="">（未設定）</option>{prefs.map(p=><option key={p.slug} value={p.slug}>{p.name}</option>)}</select></div>
        <div><label className={lb}>取材メモ（箇条書き・会話メモでOK）</label><textarea name="notes" rows={10} className={inp} placeholder="・創業のきっかけ&#10;・事業内容と強み&#10;・地域との関わり&#10;・今後やりたいこと&#10;・求める人材&#10;・東京の同郷者へ伝えたいこと …" /></div>
        <button className="rounded-lg brand-gradient px-6 py-2.5 text-sm font-semibold text-white">下書きを生成する</button>
        <p className="text-xs text-slate-400">※GEMINI_API_KEY未設定時は、取材メモから雛形（[取材で確認]入り）を作成します。生成物は下書き（非公開）として作られ、編集画面が開きます。</p>
      </form>
    </AdminShell>
  );
}
