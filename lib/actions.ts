"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function inquiryAction(fd: FormData) {
  const g = (k:string)=>String(fd.get(k) ?? "").trim();
  if (!g("name") || !g("contact")) redirect("/inquiry?e=1");
  await prisma.inquiry.create({ data: {
    type:"取材掲載", orgType:g("orgType"), name:g("name"), prefecture:g("prefecture"),
    contact:g("contact"), message:g("message"),
  }});
  redirect("/thanks?t=inquiry");
}

export async function submitAction(fd: FormData) {
  const g = (k:string)=>String(fd.get(k) ?? "").trim();
  if (!g("name") || !g("contact")) redirect("/submit?e=1");
  await prisma.inquiry.create({ data: {
    type:"情報提供", orgType:g("orgType"), name:g("name"), prefecture:g("prefecture"),
    contact:g("contact"), message:g("message"),
  }});
  redirect("/thanks?t=submit");
}

/**
 * 記事末「この企業とつながる」導線（§8/§9/§28）。
 * 受け皿は管理画面の受信箱（Inquiry）に保存し、メール通知は環境変数が揃っていれば自動送信する。
 * - RESEND_API_KEY が未設定のときは保存のみ（通知はスキップ、送信自体は必ず成功させる）。
 * - 通知先: NOTIFY_EMAIL（未設定なら運営の既定アドレス）。
 */
export async function connectAction(fd: FormData) {
  const g = (k:string)=>String(fd.get(k) ?? "").trim();
  const name = g("name");
  const email = g("email");
  const entryType = g("entryType");
  const interviewSlug = g("interviewSlug");
  const companyTarget = g("companyTarget");
  const articleTitle = g("articleTitle");
  const prefecture = g("prefecture");
  const message = g("message");
  const referrer = g("referrer");
  const utm = g("utm");

  // 氏名とメールは必須。足りなければ元フォームへ戻す（入力値を引き継ぐ）。
  if (!name || !email) {
    const qs = new URLSearchParams({ e:"1", article:interviewSlug, company:companyTarget, pref:prefecture, type:entryType });
    redirect(`/connect?${qs.toString()}`);
  }

  await prisma.inquiry.create({ data: {
    type:"企業つながり", orgType:"", name, email, prefecture,
    contact: email, message, entryType, interviewSlug, companyTarget, articleTitle,
    referrer, utm, status:"new",
  }});

  // メール通知（環境変数が揃っているときのみ・失敗しても送信は成功扱い）
  try {
    const key = process.env.RESEND_API_KEY;
    if (key) {
      const to = process.env.NOTIFY_EMAIL || "aslike.yano@gmail.com";
      const from = process.env.RESEND_FROM || "地元で働こう <onboarding@resend.dev>";
      const lines = [
        `種別: ${entryType || "未選択"}`,
        `対象企業: ${companyTarget || "-"}`,
        `記事: ${articleTitle || "-"}（${interviewSlug || "-"}）`,
        `お名前: ${name}`,
        `メール: ${email}`,
        `都道府県: ${prefecture || "-"}`,
        ``,
        `メッセージ:`,
        message || "(なし)",
        ``,
        `流入元: ${referrer || "-"}`,
      ].join("\n");
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from, to,
          subject: `【地元で働こう】企業つながり: ${companyTarget || name}（${entryType || "問い合わせ"}）`,
          text: lines,
          reply_to: email,
        }),
      });
    }
  } catch { /* 通知失敗は無視（保存は完了している） */ }

  redirect("/thanks?t=connect");
}
