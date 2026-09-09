import { loginAction } from "@/lib/session-actions";
import { SITE } from "@/lib/constants";
export const metadata = { title:"管理ログイン", robots:{index:false} };
export default function Login({ searchParams }:{ searchParams:{e?:string} }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl brand-gradient text-xl font-bold text-white">地</span>
          <h1 className="mt-3 text-lg font-bold text-slate-900">{SITE.name} 管理</h1>
          <p className="text-xs text-slate-400">取材・コンテンツ・地域CRM</p>
        </div>
        {searchParams.e && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">パスワードが違います。</p>}
        <form action={loginAction} className="space-y-4">
          <input type="password" name="password" required autoFocus placeholder="パスワード" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500" />
          <button className="w-full rounded-lg brand-gradient px-4 py-2.5 text-sm font-semibold text-white">ログイン</button>
        </form>
      </div>
    </main>
  );
}
