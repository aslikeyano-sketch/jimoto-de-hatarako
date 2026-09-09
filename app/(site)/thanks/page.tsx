import { CTAButton } from "@/components/ui";
export const metadata = { title: "送信完了" };
const MSG:Record<string,string> = {
  register:"ご登録ありがとうございます。あなたの地元の情報をご案内していきます。",
  inquiry:"お問い合わせありがとうございます。担当より折り返しご連絡します。",
  submit:"情報のご提供ありがとうございます。内容を確認のうえ掲載を検討します。",
};
export default function Thanks({ searchParams }:{ searchParams:{t?:string} }) {
  const msg = MSG[searchParams.t ?? ""] ?? "送信が完了しました。";
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full brand-gradient text-3xl">✓</span>
      <h1 className="mt-5 text-2xl font-bold text-slate-900">送信完了</h1>
      <p className="mt-3 leading-relaxed text-slate-600">{msg}</p>
      <div className="mt-8"><CTAButton href="/">トップへ戻る</CTAButton></div>
    </main>
  );
}
