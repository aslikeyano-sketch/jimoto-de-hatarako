"use client";
import * as React from "react";
import type { Field } from "@/lib/models";

const inp="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500";

function toDateInput(v:any){ if(!v) return ""; try { return new Date(v).toISOString().slice(0,10); } catch { return ""; } }

export function RecordForm({ action, fields, initial, prefectures }:{
  action:(fd:FormData)=>void; fields:Field[]; initial:any; prefectures:{slug:string;name:string}[];
}) {
  // セクション順（登場順）
  const sections:string[]=[];
  for (const f of fields){ const s=f.section||"その他"; if(!sections.includes(s)) sections.push(s); }

  const renderField=(f:Field)=>{
    const val = initial?.[f.name];
    if (f.type==="bool") return (
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" name={f.name} defaultChecked={!!val} className="h-4 w-4 accent-brand-500" />{f.label}
      </label>
    );
    return (
      <div key={f.name}>
        <label className="mb-1 block text-sm font-medium text-slate-600">{f.label}{f.required && <span className="text-rose-500"> *</span>}</label>
        {f.type==="textarea" || f.type==="md" ? (
          <textarea name={f.name} defaultValue={val??""} rows={f.type==="md"?8:3} className={`${inp} ${f.type==="md"?"font-mono text-xs":""}`} />
        ) : f.type==="select" ? (
          <select name={f.name} defaultValue={val??(f.options?.[0]??"")} className={inp}>
            {(f.options??[]).map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        ) : f.type==="prefecture" ? (
          <select name={f.name} defaultValue={val??""} className={inp}>
            <option value="">（未設定）</option>
            {prefectures.map(p=><option key={p.slug} value={p.slug}>{p.name}</option>)}
          </select>
        ) : f.type==="date" ? (
          <input type="date" name={f.name} defaultValue={toDateInput(val)} className={inp} />
        ) : (
          <input name={f.name} defaultValue={val??""} required={f.required} className={inp} />
        )}
        {f.help && <p className="mt-1 text-xs text-slate-400">{f.help}</p>}
      </div>
    );
  };

  return (
    <form action={action} className="space-y-6">
      {sections.map(sec=>{
        const fs=fields.filter(f=>(f.section||"その他")===sec);
        const internal=fs.some(f=>f.internal);
        return (
          <div key={sec} className={`rounded-2xl border bg-white p-5 ${internal?"border-rose-200":"border-slate-200"}`}>
            <h3 className={`mb-3 flex items-center gap-2 font-bold ${internal?"text-rose-700":"text-slate-800"}`}>
              {sec}{internal && <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600">サイト非公開</span>}
            </h3>
            <div className={sec.includes("課題CRM")?"grid gap-2 sm:grid-cols-2":"grid gap-4 sm:grid-cols-2"}>
              {fs.map(f=>(
                <div key={f.name} className={(f.type==="textarea"||f.type==="md")?"sm:col-span-2":""}>{renderField(f)}</div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="flex gap-3">
        <button type="submit" className="rounded-lg brand-gradient px-6 py-2.5 text-sm font-semibold text-white">保存する</button>
      </div>
    </form>
  );
}
