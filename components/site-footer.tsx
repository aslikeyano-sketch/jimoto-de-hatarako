import Link from "next/link";
import { SITE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-100 bg-navy-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-base font-bold text-white">{SITE.catch}</p>
          <p className="mt-1 text-xs text-slate-400">{SITE.sub}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">{SITE.description}</p>
          <p className="mt-4 text-xs text-slate-500">運営：{SITE.operator}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">さがす・知る</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link href="/prefectures" className="hover:text-white">地域から探す（日本地図）</Link></li>
            <li><Link href="/interviews" className="hover:text-white">インタビュー</Link></li>
            <li><Link href="/features" className="hover:text-white">特集</Link></li>
            <li><Link href="/kenjinkai" className="hover:text-white">県人会</Link></li>
            <li><Link href="/search" className="hover:text-white">検索</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">関わる・つながる</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link href="/for-companies" className="hover:text-white">地域の企業を応援する</Link></li>
            <li><Link href="/inquiry" className="hover:text-white">取材・掲載を希望する</Link></li>
            <li><Link href="/submit" className="hover:text-white">情報提供・企業推薦</Link></li>
            <li><Link href="/register" className="hover:text-white">地元と関わりたい人登録</Link></li>
            <li><Link href="/about" className="hover:text-white">このメディアについて</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
          <Link href="/company" className="hover:text-white">運営会社</Link>
          <Link href="/editorial-policy" className="hover:text-white">編集・取材方針</Link>
          <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
          <Link href="/contact" className="hover:text-white">お問い合わせ</Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">© {new Date().getFullYear()} {SITE.operator}｜{SITE.name}</div>
    </footer>
  );
}
