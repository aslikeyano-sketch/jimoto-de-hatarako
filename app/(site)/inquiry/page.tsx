import type { Metadata } from "next";
import { inquiryAction } from "@/lib/actions";
import { PageHero, Crumbs } from "@/components/ui";
export const metadata: Metadata = { title: "取材・掲載を希望する" };
const inp="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500";
const lb="mb-1 block text-sm font-medium text-slate-600";
const ORG=["地方企業","自治体","東京事務所","大学","学生団体","議員","地域団体","地方創生プロジェクト","その他"];
export default function Inquiry({ searchParams }:{ searchParams:{e?:string} }) {
  return (
    <main>
      <PageHero eyebrow="取材・掲載" title="取材・掲載を希望する" lead="「東京にいる同郷者へ、地元の魅力を伝えたい」——企業・行政・大学・団体の方、お気軽にご相談ください。掲載は無料の取材から。" />
      <div className="mx-auto max-w-2xl px-5 py-10">
        <Crumbs items={[{href:"/",label:"ホーム"},{label:"取材・掲載希望"}]} />
        {searchParams.e && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">お名前・団体名と、ご連絡先（メール／電話）は必須です。</p>}
        <form action={inquiryAction} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <div><label className={lb}>種別</label><select name="orgType" className={inp}>{ORG.map(o=><option key={o}>{o}</option>)}</select></div>
          <div><label className={lb}>会社・団体・お名前 *</label><input name="name" required className={inp} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={lb}>都道府県</label><input name="prefecture" className={inp} /></div>
            <div><label className={lb}>ご連絡先（メール/電話） *</label><input name="contact" required className={inp} /></div>
          </div>
          <div><label className={lb}>ご相談内容</label><textarea name="message" rows={4} placeholder="取材・掲載してほしい内容、地域、想いなど" className={inp} /></div>
          <button className="w-full rounded-lg brand-gradient px-4 py-3 text-sm font-semibold text-white">送信する</button>
        </form>
      </div>
    </main>
  );
}
