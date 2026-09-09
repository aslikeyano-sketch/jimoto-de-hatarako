import type { Metadata } from "next";
import { registerAction } from "@/lib/actions";
import { INTERESTS } from "@/lib/constants";
import { PageHero, Crumbs } from "@/components/ui";
export const metadata: Metadata = { title: "地元と関わりたい人登録" };
const inp="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500";
const lb="mb-1 block text-sm font-medium text-slate-600";
export default function Register({ searchParams }:{ searchParams:{e?:string} }) {
  return (
    <main>
      <PageHero eyebrow="登録" title="地元と関わりたい人登録" lead="出身地と興味を登録すると、あなたの地元の企業・イベント・県人会・プロジェクト情報をご案内します。" />
      <div className="mx-auto max-w-2xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"登録"}]} />
        {searchParams.e && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">お名前は必須です。</p>}
        <form action={registerAction} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={lb}>お名前 *</label><input name="name" required className={inp} /></div>
            <div><label className={lb}>年代</label><input name="age" placeholder="例：30代" className={inp} /></div>
            <div><label className={lb}>出身都道府県</label><input name="homePref" placeholder="例：大分県" className={inp} /></div>
            <div><label className={lb}>出身市町村</label><input name="homeCity" className={inp} /></div>
            <div><label className={lb}>現在お住まい</label><input name="currentLoc" placeholder="例：東京都" className={inp} /></div>
            <div><label className={lb}>ご職業</label><input name="job" className={inp} /></div>
            <div><label className={lb}>業種</label><input name="industry" className={inp} /></div>
            <div><label className={lb}>スキル・得意</label><input name="skills" className={inp} /></div>
          </div>
          <div>
            <label className={lb}>興味のある関わり方</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(i=>(
                <label key={i} className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-700">
                  <input type="checkbox" name="interests" value={i} className="accent-brand-500" />{i}
                </label>
              ))}
            </div>
          </div>
          <div><label className={lb}>ひとこと（任意）</label><textarea name="message" rows={3} className={inp} /></div>
          <button className="w-full rounded-lg brand-gradient px-4 py-3 text-sm font-semibold text-white">登録する</button>
          <p className="text-center text-xs text-slate-400">ご登録は無料です。いただいた情報は情報提供・ご連絡の目的のみに使用します。</p>
        </form>
      </div>
    </main>
  );
}
