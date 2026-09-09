export const SITE = {
  name: "地元で働こう",
  tagline: "地元には、まだ知らない仕事がある。",
  sub: "地元で働く。東京から地元と働く。地元の人や挑戦を知る。",
  description: "「地元で働こう」は、東京・都市部にいる地方出身者と、地元の企業・人・行政・大学・学生・地域活動をつなぐ入口です。運営：株式会社Roots Next。",
  operator: "株式会社Roots Next",
  url: "https://jimoto-de-hatarako.jp",
};

// 応援パートナー（賛同企業）。※契約確定まで confirmed:false → 「協議中」表示。
// 公開前に必ず各社の掲載可否を確認すること（未確定のまま実名を対外公開しない）。
export const SPONSORS: { name: string; note: string; confirmed: boolean }[] = [
  { name: "DMM", note: "EC・動画・新規事業", confirmed: false },
  { name: "freee", note: "会計・バックオフィス", confirmed: false },
  { name: "エアトリ", note: "出張・移動", confirmed: false },
];

// 会の信頼（若者向け・非営業の見せ方）
export const TRUST_POINTS = [
  { t: "県人会ネットワーク発", d: "全国の県人会を束ねるRoots Nextが運営。同郷のつながりが土台。" },
  { t: "自治体・大学と連携", d: "各県・大学・学生団体と連携し、Uターン・関係人口づくりを応援。" },
  { t: "掲載は無料・営業ではない", d: "地元の魅力を若者に届けるための取材。売り込みはしません。" },
];

// グローバルナビ（仕様§7の5本柱）
export const NAV = [
  { href: "/prefectures", label: "都道府県から探す" },
  { href: "/companies", label: "地元の企業を知る" },
  { href: "/people", label: "地元の人を知る" },
  { href: "/projects", label: "地元の活動を知る" },
  { href: "/events", label: "東京で地元とつながる" },
  { href: "/join", label: "地元に関わる" },
];

// 人物カテゴリ（仕様§15）
export const PERSON_CATEGORIES = [
  "経営者","議員","自治体","農家","地域プレイヤー","若手","学生","クリエイター","Uターン",
];
export const PERSON_CATEGORY_COLORS: Record<string,string> = {
  "経営者":"bg-brand-100 text-brand-700","議員":"bg-indigo-100 text-indigo-700",
  "自治体":"bg-sky-100 text-sky-700","農家":"bg-lime-100 text-lime-700",
  "地域プレイヤー":"bg-amber-100 text-amber-700","若手":"bg-rose-100 text-rose-700",
  "学生":"bg-violet-100 text-violet-700","クリエイター":"bg-fuchsia-100 text-fuchsia-700",
  "Uターン":"bg-emerald-100 text-emerald-700",
};

// 団体タイプ（仕様§17-22）
export const ORG_TYPES = ["県人会","東京事務所","大学","学生団体","地域団体"];

// プロジェクトのテーマ（仕様§24）
export const PROJECT_THEMES = ["農業","耕作放棄地","空き家","商店街","観光","伝統産業","移住","若者流出","事業承継","高齢者支援","地場産業","DX","教育"];

// イベントカテゴリ（仕様§19）
export const EVENT_CATEGORIES = ["県人会","自治体","東京事務所","大学","学生団体","地方企業","地方創生","移住","就職","農業","観光","地域PR"];

// 地元との関わり方（仕様§26）
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

// 登録フォームの興味関心（仕様§27）
export const INTERESTS = ["Uターン","転職","副業","地方企業支援","プロジェクト","起業","事業承継","農業","県人会","地方創生","学生活動"];

export const STATUS_LABELS: Record<string,{label:string;color:string}> = {
  draft:{label:"下書き",color:"bg-slate-100 text-slate-600"},
  review:{label:"確認中",color:"bg-amber-100 text-amber-700"},
  published:{label:"公開",color:"bg-emerald-100 text-emerald-700"},
  private:{label:"非公開",color:"bg-rose-100 text-rose-700"},
};
