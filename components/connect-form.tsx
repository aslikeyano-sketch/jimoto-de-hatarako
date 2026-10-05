"use client";
import { useEffect, useState } from "react";
import { connectAction } from "@/lib/actions";

const ENTRY_TYPES = [
  { v: "転職", label: "この企業で働くことに興味がある（転職）" },
  { v: "副業", label: "副業・プロジェクトで関わりたい" },
  { v: "商品・サービス", label: "商品・サービスに興味がある" },
  { v: "協業", label: "自社との協業を相談したい" },
  { v: "イベント", label: "イベント・交流に参加したい" },
  { v: "その他", label: "まず話を聞いてみたい" },
];

const inp = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500";
const lb = "mb-1 block text-sm font-medium text-slate-600";

export function ConnectForm({
  interviewSlug,
  companyTarget,
  articleTitle,
  prefName,
  defaultType,
}: {
  interviewSlug: string;
  companyTarget: string;
  articleTitle: string;
  prefName: string;
  defaultType: string;
}) {
  const [referrer, setReferrer] = useState("");
  const [utm, setUtm] = useState("");

  // 流入元・UTM を自動取得（§28 CRM想定）
  useEffect(() => {
    try {
      setReferrer(document.referrer || "");
      const sp = new URLSearchParams(window.location.search);
      const u: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
        const val = sp.get(k);
        if (val) u[k] = val;
      });
      setUtm(Object.keys(u).length ? JSON.stringify(u) : "");
    } catch {
      /* noop */
    }
  }, []);

  return (
    <form action={connectAction} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
      {/* コンテキスト（記事・企業） */}
      {(companyTarget || articleTitle) && (
        <div className="rounded-xl bg-brand-50/60 px-4 py-3 text-sm">
          {companyTarget && (
            <p className="font-bold text-navy-800">
              つながりたい企業：{companyTarget}
            </p>
          )}
          {articleTitle && <p className="mt-0.5 text-xs text-slate-500">記事：{articleTitle}</p>}
        </div>
      )}

      {/* hidden: CRM用コンテキスト */}
      <input type="hidden" name="interviewSlug" value={interviewSlug} />
      <input type="hidden" name="companyTarget" value={companyTarget} />
      <input type="hidden" name="articleTitle" value={articleTitle} />
      <input type="hidden" name="referrer" value={referrer} />
      <input type="hidden" name="utm" value={utm} />

      <div>
        <label className={lb}>どんな形で関わりたいですか？</label>
        <div className="space-y-2">
          {ENTRY_TYPES.map((t, i) => (
            <label key={t.v} className="flex cursor-pointer items-start gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50/60">
              <input
                type="radio"
                name="entryType"
                value={t.v}
                defaultChecked={defaultType ? defaultType === t.v : i === ENTRY_TYPES.length - 1}
                className="mt-0.5 accent-brand-600"
              />
              <span className="text-slate-700">{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={lb}>お名前 *</label>
          <input name="name" required className={inp} placeholder="山田 太郎" />
        </div>
        <div>
          <label className={lb}>メールアドレス *</label>
          <input name="email" type="email" required className={inp} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label className={lb}>都道府県（任意）</label>
        <input name="prefecture" defaultValue={prefName} className={inp} />
      </div>

      <div>
        <label className={lb}>メッセージ（任意）</label>
        <textarea name="message" rows={4} className={inp} placeholder="聞いてみたいこと、一緒にやってみたいことなど、お気軽にどうぞ。" />
      </div>

      <button className="w-full rounded-lg brand-gradient px-4 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.01]">
        この企業とつながる
      </button>
      <p className="text-center text-xs text-slate-400">約1分で完了｜編集部より折り返しご連絡します</p>
    </form>
  );
}
