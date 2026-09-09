// 設定駆動CMS：モデルとフィールドの定義。ここを増やせば管理画面が自動で対応する。
import { PERSON_CATEGORIES, ORG_TYPES, PROJECT_THEMES, EVENT_CATEGORIES } from "@/lib/constants";
import { STAGES } from "@/lib/pipeline";

export type FieldType = "text" | "textarea" | "md" | "select" | "bool" | "date" | "prefecture";
export type Field = {
  name: string; label: string; type: FieldType; section?: string;
  options?: readonly string[]; help?: string; required?: boolean; internal?: boolean;
};
export type ModelDef = {
  key: string;          // URL slug（複数形）
  delegate: string;     // prisma delegate 名
  label: string;
  emoji: string;
  titleField: string;   // 一覧・見出しに使う
  hasStage?: boolean;   // 取材パイプライン対象
  listCols: { field: string; label: string }[];
  fields: Field[];
};

const STATUS = ["draft","review","published","private"] as const;

// 共通の公開ステータス・スラッグ
const meta = (): Field[] => ([
  { name:"status", label:"公開状態", type:"select", options:STATUS, section:"公開設定" },
  { name:"slug", label:"スラッグ（URL・空欄で自動）", type:"text", section:"公開設定", help:"半角英数字。空欄なら自動生成" },
  { name:"seoTitle", label:"SEOタイトル", type:"text", section:"メタ" },
  { name:"seoDescription", label:"メタdescription", type:"textarea", section:"メタ" },
]);

export const MODELS: ModelDef[] = [
  {
    key:"companies", delegate:"company", label:"企業", emoji:"🏢", titleField:"name", hasStage:true,
    listCols:[{field:"name",label:"会社名"},{field:"prefecture",label:"県"},{field:"industry",label:"業種"}],
    fields:[
      { name:"name", label:"会社名", type:"text", required:true, section:"基本" },
      { name:"prefecture", label:"都道府県", type:"prefecture", section:"基本" },
      { name:"area", label:"市町村", type:"text", section:"基本" },
      { name:"industry", label:"業種", type:"text", section:"基本" },
      { name:"representative", label:"代表者", type:"text", section:"基本" },
      { name:"founded", label:"設立", type:"text", section:"基本" },
      { name:"employees", label:"従業員数", type:"text", section:"基本" },
      { name:"url", label:"公式サイトURL", type:"text", section:"基本" },
      { name:"coverImage", label:"カバー画像URL", type:"text", section:"基本" },
      { name:"description", label:"事業内容", type:"textarea", section:"公開情報（取材記事）" },
      { name:"history", label:"会社の歴史", type:"textarea", section:"公開情報（取材記事）" },
      { name:"strengths", label:"会社の強み", type:"textarea", section:"公開情報（取材記事）" },
      { name:"localRelation", label:"地域との関係", type:"textarea", section:"公開情報（取材記事）" },
      { name:"futureChallenge", label:"今後の挑戦", type:"textarea", section:"公開情報（取材記事）" },
      { name:"wantedPerson", label:"求める人物", type:"textarea", section:"公開情報（取材記事）" },
      { name:"messageToLocals", label:"東京の同郷者へ", type:"textarea", section:"公開情報（取材記事）" },
      { name:"photos", label:"写真URL（カンマ区切り）", type:"text", section:"公開情報（取材記事）" },
      // 内部CRM（非公開）
      { name:"stage", label:"取材ステージ", type:"select", options:STAGES, section:"取材・担当（非公開）", internal:true },
      { name:"owner", label:"事業推進担当", type:"text", section:"取材・担当（非公開）", internal:true },
      { name:"organizer", label:"県人会主催者", type:"text", section:"取材・担当（非公開）", internal:true },
      { name:"introducedBy", label:"紹介者", type:"text", section:"取材・担当（非公開）", internal:true },
      { name:"crmHiring", label:"採用に困っている", type:"bool", section:"経営課題CRM（非公開）", internal:true },
      { name:"crmDx", label:"AI/DXを導入したい", type:"bool", section:"経営課題CRM（非公開）", internal:true },
      { name:"crmSns", label:"SNSに課題", type:"bool", section:"経営課題CRM（非公開）", internal:true },
      { name:"crmSalesCh", label:"東京販路を広げたい", type:"bool", section:"経営課題CRM（非公開）", internal:true },
      { name:"crmSales", label:"営業に課題", type:"bool", section:"経営課題CRM（非公開）", internal:true },
      { name:"crmNewBiz", label:"新規事業を検討", type:"bool", section:"経営課題CRM（非公開）", internal:true },
      { name:"crmSuccession", label:"事業承継予定", type:"bool", section:"経営課題CRM（非公開）", internal:true },
      { name:"crmNotes", label:"経営課題メモ（非公開）", type:"textarea", section:"経営課題CRM（非公開）", internal:true },
      { name:"crmContact", label:"連絡先（非公開）", type:"text", section:"経営課題CRM（非公開）", internal:true },
      ...meta(),
    ],
  },
  {
    key:"people", delegate:"person", label:"人物", emoji:"🧑", titleField:"name", hasStage:true,
    listCols:[{field:"name",label:"氏名"},{field:"category",label:"区分"},{field:"prefecture",label:"県"}],
    fields:[
      { name:"name", label:"氏名", type:"text", required:true, section:"基本" },
      { name:"category", label:"区分", type:"select", options:PERSON_CATEGORIES, section:"基本" },
      { name:"prefecture", label:"都道府県", type:"prefecture", section:"基本" },
      { name:"title", label:"肩書", type:"text", section:"基本" },
      { name:"affiliation", label:"所属・会社・団体", type:"text", section:"基本" },
      { name:"photo", label:"顔写真URL", type:"text", section:"基本" },
      { name:"bio", label:"プロフィール", type:"textarea", section:"公開情報" },
      { name:"story", label:"記事本文（Markdown）", type:"md", section:"公開情報" },
      { name:"localIssue", label:"地域の課題（議員・行政）", type:"textarea", section:"公開情報" },
      { name:"vision", label:"目指す社会（議員・行政）", type:"textarea", section:"公開情報" },
      { name:"message", label:"東京の同郷者へのメッセージ", type:"textarea", section:"公開情報" },
      { name:"stage", label:"取材ステージ", type:"select", options:STAGES, section:"取材・担当（非公開）", internal:true },
      { name:"owner", label:"担当", type:"text", section:"取材・担当（非公開）", internal:true },
      { name:"introducedBy", label:"紹介者", type:"text", section:"取材・担当（非公開）", internal:true },
      { name:"crmNotes", label:"メモ（非公開）", type:"textarea", section:"取材・担当（非公開）", internal:true },
      { name:"crmContact", label:"連絡先（非公開）", type:"text", section:"取材・担当（非公開）", internal:true },
      ...meta(),
    ],
  },
  {
    key:"projects", delegate:"project", label:"プロジェクト", emoji:"🌱", titleField:"title",
    listCols:[{field:"title",label:"タイトル"},{field:"theme",label:"テーマ"},{field:"prefecture",label:"県"}],
    fields:[
      { name:"title", label:"タイトル", type:"text", required:true, section:"基本" },
      { name:"prefecture", label:"都道府県", type:"prefecture", section:"基本" },
      { name:"theme", label:"テーマ", type:"select", options:PROJECT_THEMES, section:"基本" },
      { name:"coverImage", label:"カバー画像URL", type:"text", section:"基本" },
      { name:"issue", label:"地域の課題", type:"textarea", section:"公開情報" },
      { name:"summary", label:"概要", type:"textarea", section:"公開情報" },
      { name:"organizer", label:"主催者", type:"text", section:"公開情報" },
      { name:"current", label:"現在の活動", type:"textarea", section:"公開情報" },
      { name:"goal", label:"今後の目標", type:"textarea", section:"公開情報" },
      { name:"wantedHelp", label:"求めている協力", type:"textarea", section:"公開情報" },
      { name:"joinHow", label:"参加方法", type:"textarea", section:"公開情報" },
      ...meta(),
    ],
  },
  {
    key:"events", delegate:"event", label:"イベント", emoji:"📅", titleField:"title",
    listCols:[{field:"title",label:"タイトル"},{field:"category",label:"区分"},{field:"prefecture",label:"県"}],
    fields:[
      { name:"title", label:"イベント名", type:"text", required:true, section:"基本" },
      { name:"prefecture", label:"都道府県", type:"prefecture", section:"基本" },
      { name:"category", label:"区分", type:"select", options:EVENT_CATEGORIES, section:"基本" },
      { name:"heldOn", label:"開催日", type:"date", section:"基本" },
      { name:"place", label:"場所", type:"text", section:"基本" },
      { name:"inTokyo", label:"東京開催", type:"bool", section:"基本" },
      { name:"isOnline", label:"オンライン", type:"bool", section:"基本" },
      { name:"host", label:"主催", type:"text", section:"基本" },
      { name:"target", label:"対象", type:"text", section:"基本" },
      { name:"content", label:"内容", type:"textarea", section:"公開情報" },
      { name:"applyUrl", label:"申込URL", type:"text", section:"公開情報" },
      { name:"coverImage", label:"カバー画像URL", type:"text", section:"公開情報" },
      ...meta(),
    ],
  },
  {
    key:"organizations", delegate:"organization", label:"団体", emoji:"🤝", titleField:"name",
    listCols:[{field:"name",label:"団体名"},{field:"type",label:"種別"},{field:"prefecture",label:"県"}],
    fields:[
      { name:"name", label:"団体名", type:"text", required:true, section:"基本" },
      { name:"type", label:"種別", type:"select", options:ORG_TYPES, section:"基本" },
      { name:"prefecture", label:"都道府県", type:"prefecture", section:"基本" },
      { name:"area", label:"活動地域", type:"text", section:"基本" },
      { name:"representative", label:"代表者", type:"text", section:"基本" },
      { name:"members", label:"メンバー数", type:"text", section:"基本" },
      { name:"url", label:"公式サイトURL", type:"text", section:"基本" },
      { name:"purpose", label:"活動目的", type:"textarea", section:"公開情報" },
      { name:"activity", label:"活動内容", type:"textarea", section:"公開情報" },
      { name:"wantPartner", label:"連携したいこと", type:"textarea", section:"公開情報" },
      { name:"message", label:"地元への想い", type:"textarea", section:"公開情報" },
      ...meta(),
    ],
  },
  {
    key:"prefectures", delegate:"prefecture", label:"都道府県", emoji:"🗾", titleField:"name",
    listCols:[{field:"name",label:"名称"},{field:"region",label:"地方"},{field:"slug",label:"slug"}],
    fields:[
      { name:"name", label:"名称", type:"text", required:true, section:"基本" },
      { name:"slug", label:"スラッグ（例:oita）", type:"text", required:true, section:"基本" },
      { name:"region", label:"地方", type:"text", section:"基本" },
      { name:"catchcopy", label:"キャッチコピー", type:"text", section:"基本" },
      { name:"intro", label:"県紹介（Markdown）", type:"md", section:"公開情報" },
      { name:"published", label:"公開", type:"bool", section:"公開設定" },
    ],
  },
];

export function modelByKey(key:string){ return MODELS.find(m=>m.key===key); }
