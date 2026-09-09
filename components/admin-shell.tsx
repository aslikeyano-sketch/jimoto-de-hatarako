import Link from "next/link";
import { logoutAction } from "@/lib/session-actions";
import { MODELS } from "@/lib/models";
import { SITE } from "@/lib/constants";

export function AdminShell({ children, active }:{ children:React.ReactNode; active?:string }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-5 overflow-x-auto">
            <Link href="/admin" className="flex shrink-0 items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg brand-gradient text-sm font-bold text-white">地</span>
              <span className="font-bold text-slate-900">{SITE.name} 管理</span>
            </Link>
            <nav className="flex shrink-0 gap-1 text-sm">
              <A href="/admin" active={active==="home"}>ダッシュボード</A>
              <A href="/admin/pipeline" active={active==="pipeline"}>取材パイプライン</A>
              {MODELS.map(m=><A key={m.key} href={`/admin/${m.key}`} active={active===m.key}>{m.emoji}{m.label}</A>)}
              <A href="/admin/ai" active={active==="ai"}>✨AI記事生成</A>
              <A href="/admin/inbox" active={active==="inbox"}>受信箱</A>
              <A href="/admin/guide" active={active==="guide"}>取材質問票</A>
            </nav>
          </div>
          <form action={logoutAction}><button className="shrink-0 text-sm text-slate-400 hover:text-slate-600">ログアウト</button></form>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8">{children}</div>
    </div>
  );
}
function A({ href, active, children }:{ href:string; active?:boolean; children:React.ReactNode }) {
  return <Link href={href} className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-medium ${active?"bg-brand-50 text-brand-700":"text-slate-500 hover:bg-slate-100"}`}>{children}</Link>;
}
