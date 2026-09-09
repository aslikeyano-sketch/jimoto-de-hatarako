import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const prefectures = [
  { slug: "oita", name: "大分県", region: "九州", catchcopy: "大分で働く。大分と働く。", intro: "温泉と自然、ものづくりと挑戦する人が集まる大分。東京にいるあなたと、大分の企業・人・地域活動をつなぎます。", published: true },
  { slug: "miyazaki", name: "宮崎県", region: "九州", catchcopy: "宮崎で働く。宮崎と働く。", intro: "", published: true },
  { slug: "kagoshima", name: "鹿児島県", region: "九州", catchcopy: "鹿児島で働く。鹿児島と働く。", intro: "", published: true },
  { slug: "wakayama", name: "和歌山県", region: "近畿", catchcopy: "和歌山で働く。和歌山と働く。", intro: "", published: true },
];

const companies = [
  {
    slug: "takita-koumuten", prefecture: "oita", name: "田北工務店", area: "大分市", industry: "建設業",
    representative: "田北 〇〇", founded: "1975年", employees: "20名",
    description: "地域に根ざした住宅・建築の工務店。新築からリフォーム、公共工事まで手がける。",
    history: "大分で創業から半世紀。地域の暮らしを支える建物をつくり続けてきました。",
    strengths: "地元密着の対応力と、職人の技術力。地域の気候・風土を知り尽くした家づくり。",
    localRelation: "地域の祭りや防災活動にも参加し、まちづくりに貢献。",
    futureChallenge: "若手職人の育成と、DXによる現場効率化に挑戦中。",
    wantedPerson: "ものづくりが好きで、地域の役に立ちたい人。未経験歓迎。",
    messageToLocals: "大分で家を建てるなら、地元の私たちに。東京で頑張るあなたが、いつか帰る場所をつくります。",
    crmHiring: true, crmDx: true, crmNotes: "若手採用に苦戦。現場管理のDX関心あり。", owner: "矢野", organizer: "大分主催者",
    status: "published",
  },
  {
    slug: "oita-foods", prefecture: "oita", name: "おおいたフーズ（サンプル）", area: "別府市", industry: "食品製造",
    representative: "サンプル 太郎", founded: "2008年", employees: "45名",
    description: "大分県産の素材を活かした加工食品メーカー。全国・海外へ展開。",
    strengths: "地元農家との強い連携と、独自の製法。",
    localRelation: "県産品のブランド化を地域と共に推進。",
    futureChallenge: "東京・海外への販路拡大とEC強化。",
    wantedPerson: "地元の食を全国に届けたい人。",
    messageToLocals: "大分の美味しいを、東京のあなたの食卓にも。",
    crmSalesCh: true, crmSns: true, crmNotes: "東京販路とSNS発信に課題。", owner: "いちご",
    status: "published",
  },
];

const people = [
  {
    slug: "oita-keieisha-01", prefecture: "oita", name: "若手経営者（サンプル）", category: "経営者", title: "株式会社〇〇 代表取締役",
    affiliation: "株式会社〇〇", bio: "大分出身。東京で経験を積み、Uターンして起業。",
    story: "## 地元で挑戦する理由\n\n東京で学んだことを、地元で形にしたい——。[取材で確認]",
    message: "東京にいるからこそ見える大分の良さがあります。一緒に地元を面白くしませんか。",
    status: "published", owner: "矢野",
  },
  {
    slug: "oita-giin-01", prefecture: "oita", name: "地域の未来を語る議員（サンプル）", category: "議員", title: "〇〇市議会議員",
    affiliation: "〇〇市議会", bio: "地域の福祉・産業振興に取り組む。",
    localIssue: "若者の流出と、地元企業の人手不足が最大の課題。[取材で確認]",
    vision: "東京にいる大分出身者と地元がつながり続ける仕組みをつくりたい。",
    story: "## この地域の未来を聞く\n\n[取材で確認：地域の課題と目指す社会]",
    message: "地元を離れても、大分のためにできることはたくさんあります。",
    status: "published", owner: "矢野",
  },
  {
    slug: "oita-uturn-01", prefecture: "oita", name: "Uターン人材（サンプル）", category: "Uターン", title: "地域おこし協力隊",
    bio: "東京での勤務を経て大分にUターン。地域活動に参加。",
    story: "## 東京から大分へ戻って\n\n[取材で確認]",
    message: "戻る・戻らないの二択じゃない。関わり方は自由です。",
    status: "published",
  },
];

const projects = [
  {
    slug: "oita-akiya-01", prefecture: "oita", title: "空き家を活かす、まちの拠点づくり（サンプル）", theme: "空き家",
    issue: "増える空き家と、まちのにぎわいの減少。",
    summary: "空き家をリノベーションし、若者や移住者の拠点として再生するプロジェクト。",
    organizer: "地域団体〇〇", current: "1棟目を改修し、コワーキング＆イベントスペースとして運営中。",
    goal: "3年で5拠点を整備し、移住・起業のきっかけをつくる。",
    wantedHelp: "リノベDIY参加者、東京からの副業サポーター、資金協力。",
    joinHow: "サイトの「参加する」から連絡、または現地イベントへ。",
    status: "published",
  },
  {
    slug: "oita-nogyo-01", prefecture: "oita", title: "耕作放棄地を再生する農業チャレンジ（サンプル）", theme: "農業",
    issue: "担い手不足による耕作放棄地の増加。",
    summary: "若手×地元農家で、放棄地を再生し新しい特産品づくりに挑戦。",
    organizer: "農業法人〇〇", current: "試験栽培スタート。",
    goal: "地域ブランド品の確立と、若手就農者の受け入れ。",
    wantedHelp: "週末ボランティア、東京での販売協力、SNS発信。",
    joinHow: "「参加する」から。",
    status: "published",
  },
];

const events = [
  {
    slug: "oita-kenjinkai-tokyo-01", prefecture: "oita", title: "大分県人会 in 東京（サンプル）", category: "県人会",
    place: "東京都内", inTokyo: true, host: "大分県人会", target: "東京在住の大分出身者",
    content: "同郷の仲間と出会い、地元の最新情報を知る交流会。", applyUrl: "",
    status: "published",
  },
  {
    slug: "oita-iju-fair-01", prefecture: "oita", title: "大分UIターン・移住相談フェア（サンプル）", category: "移住",
    place: "東京・オンライン", inTokyo: true, isOnline: true, host: "大分県東京事務所", target: "移住・Uターン検討者",
    content: "大分の仕事・暮らし・支援制度をまとめて相談できる。", applyUrl: "",
    status: "published",
  },
];

const orgs = [
  {
    slug: "oita-campus-link", type: "学生団体", prefecture: "oita", name: "大分キャンパスリンク（サンプル）", area: "大分・東京",
    representative: "学生代表 〇〇", members: "約30名", purpose: "大分出身学生のつながりづくりと地方創生。",
    activity: "地元企業インターン、地域課題プロジェクト、県人会連携イベント。",
    wantPartner: "地元企業とのインターン・採用連携、自治体との協働。",
    message: "大分の学生が、地元とつながり続けられる場をつくっています。",
    status: "published",
  },
  {
    slug: "oita-tokyo-office", type: "東京事務所", prefecture: "oita", name: "大分県東京事務所（サンプル）", area: "東京",
    purpose: "移住・UIターン・県産品PR・観光の情報発信。",
    activity: "移住相談、就職イベント、県産品フェア、観光PR。",
    message: "東京で大分とつながる窓口です。", status: "published",
  },
  {
    slug: "oita-kenjinkai", type: "県人会", prefecture: "oita", name: "大分県人会（Roots Next運営）", area: "東京",
    purpose: "東京にいる大分出身者の交流と、地元への貢献。",
    activity: "交流会、地元企業紹介、地域活動への接続。",
    message: "飲み会で終わらせない。出会いを、地元への貢献に。", status: "published",
  },
];

async function main() {
  const now = new Date();
  for (const p of prefectures) await prisma.prefecture.upsert({ where:{slug:p.slug}, update:p, create:p });
  for (const c of companies) { const d:any={...c, publishedAt: c.status==="published"?now:null}; await prisma.company.upsert({ where:{slug:c.slug}, update:d, create:d }); }
  for (const p of people) { const d:any={...p, publishedAt: p.status==="published"?now:null}; await prisma.person.upsert({ where:{slug:p.slug}, update:d, create:d }); }
  for (const p of projects) { const d:any={...p, publishedAt: p.status==="published"?now:null}; await prisma.project.upsert({ where:{slug:p.slug}, update:d, create:d }); }
  for (const e of events) { const d:any={...e, heldOn:null, publishedAt: e.status==="published"?now:null}; await prisma.event.upsert({ where:{slug:e.slug}, update:d, create:d }); }
  for (const o of orgs) { const d:any={...o, publishedAt: o.status==="published"?now:null}; await prisma.organization.upsert({ where:{slug:o.slug}, update:d, create:d }); }
  console.log(`Seeded. prefectures=${prefectures.length} companies=${companies.length} people=${people.length} projects=${projects.length} events=${events.length} orgs=${orgs.length}`);
}
main().catch(e=>{console.error(e);process.exit(1);}).finally(()=>prisma.$disconnect());
