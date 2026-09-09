import Link from "next/link";
import { SITE, NAV } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-100 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg brand-gradient text-sm font-bold text-white">地</span>
            <span className="text-base font-bold text-slate-900">{SITE.name}</span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">{SITE.description}</p>
          <p className="mt-4 text-xs text-slate-400">運営：{SITE.operator}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-700">さがす・知る</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-brand-700">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-700">関わる・つながる</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link href="/register" className="hover:text-brand-700">地元と関わりたい人登録</Link></li>
            <li><Link href="/for-companies" className="hover:text-brand-700">取材を受けたい企業・団体へ</Link></li>
            <li><Link href="/inquiry" className="hover:text-brand-700">取材・掲載を希望する</Link></li>
            <li><Link href="/submit" className="hover:text-brand-700">情報提供・イベント掲載</Link></li>
            <li><Link href="/partners" className="hover:text-brand-700">応援パートナー</Link></li>
            <li><Link href="/about" className="hover:text-brand-700">「地元で働こう」について</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 px-5 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
          <Link href="/company" className="hover:text-brand-700">運営会社</Link>
          <Link href="/editorial-policy" className="hover:text-brand-700">編集・取材方針</Link>
          <Link href="/privacy" className="hover:text-brand-700">プライバシーポリシー</Link>
          <Link href="/contact" className="hover:text-brand-700">お問い合わせ</Link>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">© {new Date().getFullYear()} {SITE.operator}｜{SITE.name}</div>
    </footer>
  );
}
