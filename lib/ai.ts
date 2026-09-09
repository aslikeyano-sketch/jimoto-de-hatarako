// AI取材記事の下書き生成。GEMINI_API_KEY があれば Gemini 2.5 Flash、無ければテンプレートで動作。
export type DraftType = "企業" | "人物" | "議員" | "プロジェクト";
export type DraftInput = { type: DraftType; name: string; prefecture?: string; notes: string };

const jsonHint = "必ず次のJSONのみ出力（前後に説明やコードフェンスを付けない）。値は自然な日本語の文章にする。";

function prompt(i: DraftInput): string {
  const base = `あなたは地域メディア「地元で働こう」の編集者です。東京にいる地元出身者へ届ける記事を書きます。営業色を出さず、地元の魅力と人の想いを丁寧に伝えます。取材メモをもとに、下記フィールドの下書きを作ってください。\n対象：${i.name}\n地域：${i.prefecture||"（未設定）"}\n取材メモ：\n${i.notes}\n\n`;
  if (i.type==="企業") return base + jsonHint + `\n{"description":"事業内容","history":"会社の歴史","strengths":"会社の強み","localRelation":"地域との関係","futureChallenge":"今後の挑戦","wantedPerson":"求める人物","messageToLocals":"東京にいる地元出身者へのメッセージ","seoTitle":"32字前後","seoDescription":"110字前後"}`;
  if (i.type==="プロジェクト") return base + jsonHint + `\n{"summary":"概要","issue":"地域の課題","current":"現在の活動","goal":"今後の目標","wantedHelp":"求めている協力","joinHow":"参加方法","seoTitle":"32字前後","seoDescription":"110字前後"}`;
  if (i.type==="議員") return base + jsonHint + `\n（政治的中立を保ち、特定政党の支持はしない）\n{"bio":"プロフィール","localIssue":"地域の課題認識","vision":"目指す社会","story":"記事本文(Markdownで見出し##を数個)","message":"東京の同郷者へのメッセージ","seoTitle":"32字前後","seoDescription":"110字前後"}`;
  return base + jsonHint + `\n{"bio":"プロフィール","story":"記事本文(Markdownで見出し##を数個)","message":"東京の同郷者へのメッセージ","seoTitle":"32字前後","seoDescription":"110字前後"}`;
}

function fallback(i: DraftInput): Record<string,string> {
  const n = i.notes || `${i.name}への取材内容`;
  if (i.type==="企業") return {
    description:n, history:"[取材で確認：会社の歴史]", strengths:"[取材で確認：強み]",
    localRelation:"[取材で確認：地域との関係]", futureChallenge:"[取材で確認：今後の挑戦]",
    wantedPerson:"[取材で確認：求める人物]", messageToLocals:`東京で頑張る${i.prefecture||"地元"}出身のみなさんへ。[取材で確認]`,
    seoTitle:`${i.name}｜地元で働こう`, seoDescription:`${i.name}を取材。${n}`.slice(0,110),
  };
  if (i.type==="プロジェクト") return {
    summary:n, issue:"[取材で確認：地域の課題]", current:"[取材で確認：現在の活動]",
    goal:"[取材で確認：今後の目標]", wantedHelp:"[取材で確認：求める協力]", joinHow:"[取材で確認：参加方法]",
    seoTitle:`${i.name}｜地元で働こう`, seoDescription:n.slice(0,110),
  };
  const common = { bio:n, story:`## ${i.name}\n\n[取材で確認]`, message:"[取材で確認]", seoTitle:`${i.name}｜地元で働こう`, seoDescription:n.slice(0,110) };
  if (i.type==="議員") return { ...common, localIssue:"[取材で確認：地域の課題]", vision:"[取材で確認：目指す社会]" };
  return common;
}

function extractJson(text:string):any|null {
  try { const fence=String.fromCharCode(96,96,96); const c=text.split(fence+"json").join("").split(fence).join("").trim(); const s=c.indexOf("{"),e=c.lastIndexOf("}"); if(s<0||e<0)return null; return JSON.parse(c.slice(s,e+1)); } catch { return null; }
}

export async function generateDraft(i: DraftInput): Promise<{ fields: Record<string,string>; usedAI: boolean }> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { fields: fallback(i), usedAI:false };
  try {
    const url=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
    const res=await fetch(url,{ method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ contents:[{parts:[{text:prompt(i)}]}], generationConfig:{temperature:0.7,maxOutputTokens:4096} }) });
    if(!res.ok) return { fields: fallback(i), usedAI:false };
    const data=await res.json();
    const text:string = data?.candidates?.[0]?.content?.parts?.map((p:any)=>p.text).join("") ?? "";
    const parsed=extractJson(text);
    if(!parsed) return { fields: fallback(i), usedAI:false };
    return { fields: parsed, usedAI:true };
  } catch { return { fields: fallback(i), usedAI:false }; }
}