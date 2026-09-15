import { PrismaClient } from "@prisma/client";
import { PREFECTURES_MASTER } from "../lib/prefectures-master";
const prisma = new PrismaClient();

// 47都道府県を全件登録（地図・県ページ用）。大分は詳細コピーを上書き。
const prefIntro: Record<string, { catchcopy: string; intro: string }> = {
  oita: { catchcopy: "大分を面白くしている企業と人たち。", intro: "温泉と自然、ものづくりと挑戦する人が集まる大分。東京にいるあなたと、大分の企業・人・地域活動をつなぎます。" },
};
const prefectures = PREFECTURES_MASTER.map((p) => ({
  slug: p.slug, name: p.name, region: p.region,
  catchcopy: prefIntro[p.slug]?.catchcopy ?? `${p.name}を面白くしている企業と人たち。`,
  intro: prefIntro[p.slug]?.intro ?? "",
  published: true,
}));

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

// ── インタビュー記事（サンプル）──────────────────────────
const CATS = ["地元企業・経営者","地域プロジェクト","若者・学生","Uターン・移住者","自治体・行政","地域プレイヤー","東京から地元に関わる人"];
const prefName: Record<string,string> = Object.fromEntries(PREFECTURES_MASTER.map(p=>[p.slug,p.name]));

type ISeed = { pref:string; company:string; person:string; role:string; cat:string; title:string; sub:string; tags:string; slug?:string; img?:string };
// 各県ごとの見出しプール（取材件数で地図の色を段階化）
const HERO: Record<string, ISeed[]> = {
  niigata:[{pref:"niigata",company:"雪國酒造",person:"佐藤 誠",role:"代表取締役",cat:"地元企業・経営者",title:"雪国の酒を、世界へ。地域と生きる酒蔵の挑戦",sub:"米と水と人。土地の力を醸すものづくり",tags:"地元企業,経営者,事業承継"}],
  kochi:[{pref:"kochi",company:"土佐グリーンファーム",person:"山本 彩",role:"農業経営者",cat:"地域プロジェクト",title:"畑から、まちの未来をつくる。若き農業経営者のチャレンジ",sub:"耕作放棄地を、次の世代の希望に変える",tags:"地元企業,地域プロジェクト,農業",img:"/images/interviews/kochi-farm.png"}],
  ishikawa:[{pref:"ishikawa",company:"能登ものづくり工房",person:"中村 拓也",role:"職人・代表",cat:"地元企業・経営者",title:"能登の手仕事を、次の世代へ。ものづくりでつなぐ地域の輪",sub:"伝統と革新のあいだで",tags:"地元企業,まちづくり,事業承継",img:"/images/interviews/ishikawa-monozukuri.png"}],
  nagasaki:[{pref:"nagasaki",company:"五島うみのめぐみ",person:"林 早紀",role:"漁業法人 代表",cat:"地域プロジェクト",title:"離島だからこそできること。海と生きる、持続可能な漁業を",sub:"島の暮らしを次世代へつなぐ",tags:"地域プロジェクト,経営者,まちづくり",img:"/images/interviews/nagasaki-umi.png"}],
  hokkaido:[{pref:"hokkaido",company:"MACHI base",person:"高橋 一真",role:"コミュニティ運営",cat:"地元企業・経営者",title:"人が集う、まちのあたらしい拠点。ローカルから生まれる豊かな暮らし",sub:"小さな町で、大きな実験を",tags:"地元企業,Uターン,まちづくり"}],
};
function makeInterviews(): ISeed[] {
  const out: ISeed[] = [];
  // 件数配分（地図の段階を作る）
  const plan: Record<string, number> = {
    oita:12, miyazaki:8, hokkaido:6, fukuoka:5, tokyo:5, kagawa:4,
    niigata:3, kochi:3, ishikawa:2, nagasaki:2, ehime:1, kagoshima:1,
  };
  for (const [pref, n] of Object.entries(plan)) {
    const heroes = HERO[pref] ?? [];
    for (let i=0;i<n;i++){
      const slug = `${pref}-iv-${String(i+1).padStart(3,"0")}`;
      if (i < heroes.length) { out.push({ ...heroes[i], slug }); continue; }
      const cat = CATS[i % CATS.length];
      const pn = prefName[pref] ?? pref;
      out.push({
        slug,
        pref, company:`${pn.replace(/[都道府県]$/,"")}${["製作所","ファーム","工房","商店","デザイン","フーズ"][i%6]}（サンプル）`,
        person:["田中 健","鈴木 花","佐々木 亮","井上 美和","渡辺 隆","小林 彩"][i%6],
        role:["代表取締役","事業責任者","3代目","共同創業者","工場長","マネージャー"][i%6],
        cat, title:`${pn}で挑戦する、${cat}のストーリー（サンプル${i+1}）`,
        sub:"地域とともに歩む、これからの仕事のかたち",
        tags:["地元企業","経営者","まちづくり","Uターン","地域プロジェクト"].slice(0, 2+ (i%3)).join(","),
      });
    }
  }
  return out;
}
function body(s: ISeed){
  return {
    bodyAbout:`${s.company}は、${prefName[s.pref]}で事業を営む${s.cat}です。［取材で確認：事業の概要と規模］`,
    bodyWhyLocal:`この地域で事業をする理由——${prefName[s.pref]}の風土と人が、私たちのものづくり／サービスの土台です。［取材で確認］`,
    bodyStart:`はじまりのきっかけ。［取材で確認：創業・参画の経緯］`,
    bodyStrength:`地域だからこその強み。地元のネットワークと信頼が最大の資産です。［取材で確認］`,
    bodyChallenge:`いま抱えている課題は、人材採用と販路の拡大。［取材で確認］`,
    bodyFuture:`これから挑戦したいこと。地域の外——東京や全国、海外へ。［取材で確認］`,
    bodyLocalLove:`地元への想い。この土地で挑戦し続ける理由がここにあります。［取材で確認］`,
    bodyConnect:`東京・全国とつながるなら。副業・採用・取引など、関わり方はいろいろ。［取材で確認］`,
    bodyMessage:`読者へ——${prefName[s.pref]}には、まだ知らない面白い仕事があります。一度、会いにきてください。`,
    compRepresentative:`${s.person}`, compBusiness:`${s.cat}`, compFounded:"", compAddress:prefName[s.pref], compUrl:"", compSns:"", compRecruit:"",
  };
}

const features = [
  { slug:"chiho-x-wakamono", title:"地方×若者。まちの未来をつくる新世代", subtitle:"Uターン・学生・移住者たちのいま", theme:"地方×若者", summary:"若い世代が地域で挑戦する動きを特集。", relatedTags:"若者,Uターン,まちづくり", status:"published" },
  { slug:"uturn-keieisha", title:"Uターン経営者という選択", subtitle:"東京で学び、地元で挑む人たち", theme:"Uターン経営者", summary:"都市の経験を地元に還元する経営者たち。", relatedTags:"Uターン,経営者", status:"published" },
  { slug:"chiho-x-ai", title:"地方×AI。テクノロジーで変わる地域の仕事", subtitle:"DXの現場から", theme:"地方×AI", summary:"地方企業のAI・DX活用最前線。", relatedTags:"DX,地元企業", status:"published" },
];

async function main() {
  const now = new Date();
  for (const p of prefectures) await prisma.prefecture.upsert({ where:{slug:p.slug}, update:p, create:p });
  for (const c of companies) { const d:any={...c, publishedAt: c.status==="published"?now:null}; await prisma.company.upsert({ where:{slug:c.slug}, update:d, create:d }); }
  for (const p of people) { const d:any={...p, publishedAt: p.status==="published"?now:null}; await prisma.person.upsert({ where:{slug:p.slug}, update:d, create:d }); }
  for (const p of projects) { const d:any={...p, publishedAt: p.status==="published"?now:null}; await prisma.project.upsert({ where:{slug:p.slug}, update:d, create:d }); }
  for (const e of events) { const d:any={...e, heldOn:null, publishedAt: e.status==="published"?now:null}; await prisma.event.upsert({ where:{slug:e.slug}, update:d, create:d }); }
  for (const o of orgs) { const d:any={...o, publishedAt: o.status==="published"?now:null}; await prisma.organization.upsert({ where:{slug:o.slug}, update:d, create:d }); }

  // インタビュー（公開日を過去3か月に分散・県ラウンドロビンで並べ最新枠を多県に）
  const raw = makeInterviews();
  const byPref: Record<string, typeof raw> = {};
  for (const s of raw) (byPref[s.pref] ??= []).push(s);
  const queues = Object.values(byPref);
  const interviews: typeof raw = [];
  let more = true;
  while (more) {
    more = false;
    for (const q of queues) { const x = q.shift(); if (x) { interviews.push(x); more = true; } }
  }
  // 特定スラッグへの写真割り当て（最新5記事など）
  const IMG_OVERRIDE: Record<string,string> = {
    "oita-iv-001": "/images/interviews/keiei-factory-1.png",
    "miyazaki-iv-001": "/images/interviews/keiei-factory-2.png",
    "hokkaido-iv-001": "/images/interviews/craftsman-wood.png",
    "fukuoka-iv-001": "/images/interviews/logistics.png",
    "tokyo-iv-001": "/images/interviews/care-exec.png",
  };
  let idx = 0;
  for (const s of interviews) {
    const slug = s.slug!;
    ++idx;
    const publishedAt = new Date(now.getTime() - idx * 3 * 24 * 3600 * 1000); // 3日おきに過去へ
    const d:any = {
      slug, status:"published", prefecture:s.pref, city:"",
      companyName:s.company, personName:s.person, personRole:s.role,
      category:s.cat, tags:s.tags, title:s.title, subtitle:s.sub, mainImage:s.img ?? IMG_OVERRIDE[slug] ?? "",
      ...body(s),
      topPick: idx <= 5, recommend: idx <= 8, featured: idx % 5 === 0,
      seoTitle:`${s.title}｜${prefName[s.pref]}のインタビュー｜地元で働こう`,
      seoDescription:`${prefName[s.pref]}で挑戦する${s.company}／${s.person}さんのインタビュー。${s.sub}`,
      publishedAt,
    };
    await prisma.interview.upsert({ where:{slug}, update:d, create:d });
  }

  for (const f of features) {
    const d:any = { ...f, publishedAt: f.status==="published"?now:null };
    await prisma.feature.upsert({ where:{slug:f.slug}, update:d, create:d });
  }

  console.log(`Seeded. prefectures=${prefectures.length} interviews=${interviews.length} features=${features.length} companies=${companies.length}`);
}
main().catch(e=>{console.error(e);process.exit(1);}).finally(()=>prisma.$disconnect());
