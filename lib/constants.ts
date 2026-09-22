export const SITE = {
  name: "地元で働こう",
  // ファーストビュー大コピー（仕様§2/§5）
  heroLead: "47",
  heroTitleA: "都道府県の、",
  heroTitleB: "“地元企業”",
  heroTitleC: "に会いにいく。",
  catch: "このまちの、はたらくを、未来へ。",
  sub: "日本のローカルに、出会うメディア",
  lead: "全国各地で挑戦する地元企業と、その想いを持ってはたらく人たちを取材するインタビューメディアです。まだ知らない日本の、あたたかくて、かっこいい仕事に出会えます。",
  description:
    "「地元で働こう」は、全国47都道府県の地元企業・経営者・地域プレイヤーを取材する地方創生インタビューメディアです。日本地図から地域を選び、まだ知らない面白い会社と人に出会えます。運営：株式会社Roots Next。",
  operator: "株式会社Roots Next",
  url: "https://jimoto-de-hatarako.jp",
};

// グローバルナビ（仕様§4）
export const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/prefectures", label: "地域から探す" },
  { href: "/interviews", label: "インタビュー" },
  { href: "/features", label: "特集" },
  { href: "https://chiho-sosei-site.vercel.app/cases", label: "県人会" },
  { href: "/contact", label: "お問い合わせ" },
];
export const HEADER_CTA = { href: "/inquiry", label: "掲載を依頼する" };

// 人気キーワード（仕様§5）
export const POPULAR_KEYWORDS = ["地元企業", "経営者", "地域プロジェクト", "Uターン", "まちづくり"];

// インタビューのカテゴリー（仕様§11）
export const INTERVIEW_CATEGORIES = [
  "地元企業・経営者",
  "自治体・行政",
  "地域プレイヤー",
  "若者・学生",
  "Uターン・移住者",
  "東京から地元に関わる人",
  "地域プロジェクト",
];
export const CATEGORY_COLORS: Record<string, string> = {
  "地元企業・経営者": "bg-brand-100 text-brand-700",
  "自治体・行政": "bg-navy-100 text-navy-700",
  "地域プレイヤー": "bg-sky-100 text-sky-700",
  "若者・学生": "bg-indigo-100 text-indigo-700",
  "Uターン・移住者": "bg-emerald-100 text-emerald-700",
  "東京から地元に関わる人": "bg-cyan-100 text-cyan-700",
  "地域プロジェクト": "bg-amber-100 text-amber-700",
};
export const categoryColor = (c: string) => CATEGORY_COLORS[c] ?? "bg-slate-100 text-slate-600";

// ファーストビュー右の写真オーバーレイコピー（仕様§7）
export const HERO_PHOTO_COPIES = [
  "このまちで、つくる。つなぐ。",
  "ローカルだからこそ、できる仕事がある。",
  "知らなかった日本に、会いにいこう。",
];

// 地図の色分け（取材件数 → 色。仕様§6）
export const MAP_TIERS = [
  { min: 11, fill: "#1d4ed8", label: "11件以上" }, // 濃い青
  { min: 6, fill: "#60a5fa", label: "6〜10件" },   // 青
  { min: 1, fill: "#bfe0fb", label: "1〜5件" },    // 薄い水色
  { min: 0, fill: "#eaeff5", label: "0件" },       // 薄いグレー
];
export function mapFill(count: number): string {
  for (const t of MAP_TIERS) if (count >= t.min) return t.fill;
  return "#eaeff5";
}

// 特集テーマ（仕様§10）
export const FEATURE_THEMES = ["地方×若者", "地方×介護", "地方×AI", "Uターン経営者", "東京から地元に関わる人", "地域を変える企業"];

export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: "下書き", color: "bg-slate-100 text-slate-600" },
  review: { label: "確認中", color: "bg-amber-100 text-amber-700" },
  published: { label: "公開", color: "bg-emerald-100 text-emerald-700" },
  private: { label: "非公開", color: "bg-rose-100 text-rose-700" },
};

// ── 以下、既存ページ互換のため保持 ──
export const SPONSORS: { name: string; note: string; confirmed: boolean }[] = [
  { name: "DMM", note: "EC・動画・新規事業", confirmed: false },
  { name: "freee", note: "会計・バックオフィス", confirmed: false },
  { name: "エアトリ", note: "出張・移動", confirmed: false },
];
export const TRUST_POINTS = [
  { t: "県人会ネットワーク発", d: "全国の県人会を束ねるRoots Nextが運営。同郷のつながりが土台。" },
  { t: "自治体・大学と連携", d: "各県・大学・学生団体と連携し、Uターン・関係人口づくりを応援。" },
  { t: "掲載は無料・営業ではない", d: "地元の魅力を若者に届けるための取材。売り込みはしません。" },
];
export const PERSON_CATEGORIES = ["経営者","議員","自治体","農家","地域プレイヤー","若手","学生","クリエイター","Uターン"];
export const PERSON_CATEGORY_COLORS: Record<string,string> = {
  "経営者":"bg-brand-100 text-brand-700","議員":"bg-indigo-100 text-indigo-700",
  "自治体":"bg-sky-100 text-sky-700","農家":"bg-lime-100 text-lime-700",
  "地域プレイヤー":"bg-amber-100 text-amber-700","若手":"bg-rose-100 text-rose-700",
  "学生":"bg-violet-100 text-violet-700","クリエイター":"bg-fuchsia-100 text-fuchsia-700",
  "Uターン":"bg-emerald-100 text-emerald-700",
};
export const ORG_TYPES = ["県人会","東京事務所","大学","学生団体","地域団体"];
export const PROJECT_THEMES = ["農業","耕作放棄地","空き家","商店街","観光","伝統産業","移住","若者流出","事業承継","高齢者支援","地場産業","DX","教育"];
export const EVENT_CATEGORIES = ["県人会","自治体","東京事務所","大学","学生団体","地方企業","地方創生","移住","就職","農業","観光","地域PR"];
export const RELATION_WAYS = [
  { title:"地元に戻って働く", desc:"Uターン転職で地元企業へ" },
  { title:"東京から副業する", desc:"リモート・副業で地元と関わる" },
  { title:"プロジェクトに参加", desc:"地方創生の取り組みに参加" },
  { title:"インターンする", desc:"学生・若手が地元企業で経験" },
  { title:"地元商品を東京で広める", desc:"県産品PR・販売に協力" },
  { title:"県人会に参加する", desc:"同郷のつながりをつくる" },
  { title:"地域イベントへ参加", desc:"東京開催の地元イベントに" },
  { title:"地元で起業・承継する", desc:"起業や事業承継に挑戦" },
];
export const INTERESTS = ["Uターン","転職","副業","地方企業支援","プロジェクト","起業","事業承継","農業","県人会","地方創生","学生活動"];
