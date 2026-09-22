import type { Metadata } from "next";
import { submitAction } from "@/lib/actions";
import { PageHero, Crumbs } from "@/components/ui";
export const metadata: Metadata = { title: "情報提供・イベント掲載" };
const inp="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500";
const lb="mb-1 block text-sm font-medium text-slate-600";
const ORG=["東京事務所","自治体","大学","学生団体","地方企業","地域団体","その他"];
export default function Submit({ searchParams }:{ searchParams:{e?:string} }) {
  return (
    <main>
      <PageHero eyebrow="情報提供" title="情報提供・イベント掲載" lead="イベント・求人・プロジェクト・地域ニュースなど、東京の同郷者へ届けたい情報をお寄せください。" />
      <div className="mx-auto max-w-2xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"情報提供"}]} />
        {searchParams.e && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">お名前・団体名と、ご連絡先は必須です。</p>}
        <form action={submitAction} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <div><label className={lb}>提供元</label><select name="orgType" className={inp}>{ORG.map(o=><option key={o}>{o}</option>)}</select></div>
          <div><label className={lb}>団体・お名前 *</label><input name="name" required className={inp} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={lb}>都道府県</label><input name="prefecture" className={inp} /></div>
            <div><label className={lb}>ご連絡先（メール/電話） *</label><input name="contact" required className={inp} /></div>
          </div>
          <div><label className={lb}>情報の内容</label><textarea name="message" rows={4} placeholder="イベント名・日時・場所・URL、または求人・プロジェクトの概要など" className={inp} /></div>
          <button className="w-full rounded-lg brand-gradient px-4 py-3 text-sm font-semibold text-white">送信する</button>
        </form>
      </div>
    </main>
  );
}
