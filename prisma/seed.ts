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
  // サンプルは大分1件のみ
  const plan: Record<string, number> = {
    oita:1,
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

  // 旧サンプル記事（slugに -iv- を含む）を一度削除してから作り直す（本番でも重複しないように）
  await prisma.interview.deleteMany({ where: { slug: { contains: "-iv-" } } });

  // インタビュー（サンプルは大分1件のみ）
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
  // スラッグごとのリッチ本文（作り込み記事）。generic本文の上に上書きする。
  const RICH: Record<string, any> = {
    "oita-iv-001": {
      title: "「地方だからできない、をなくしたい。」大分から全国へ挑む、ものづくり企業の次の一手",
      subtitle: "大分製作所（サンプル）代表・田中健さんに聞く、地方でものづくりを続ける理由と、これからの挑戦。",
      companyName: "大分製作所（サンプル）",
      personName: "田中 健",
      personRole: "代表取締役",
      category: "地元企業・経営者",
      city: "大分市",
      tags: "大分県,地元企業,製造業,経営者,Uターン,地方採用,販路拡大,地方DX,地方×AI",
      mainImage: "/images/interviews/keiei-factory-1.png",
      bodyAbout:
`大分県で30年以上、製造業を営んできた「大分製作所」。地域の企業から必要とされる部品製造から始まり、現在では県外企業からの仕事にも対応。長年培ってきた技術力を武器にしながら、次のテーマとして掲げているのが「採用」「県外への販路拡大」、そして「AI・DXを活用した新しいものづくり」です。

「地方企業には、まだまだ知られていない力がある。大分にいながら全国と仕事ができる会社をつくりたい」——そう話す代表取締役・田中健さんに、会社のこれまでと、大分で会社を経営する理由、これから挑戦したいことを聞きました。

**——まず、大分製作所について教えてください。**

私たちは大分県を拠点に、企業向けの金属部品加工や機械部品の製造を行っています。大量生産というよりも、「こういう部品をつくれないか」「既製品では合わないので加工してほしい」「少量だけど高い精度が必要」といった相談に、一緒に考えながら対応してきた会社です。

製造業というと、どうしても「工場でモノをつくっている会社」という見え方になりがちです。でも実際には、お客様が抱えている課題を聞いて、設計や加工方法を考え、試作して、改善していく。かなりクリエイティブな仕事だと思っています。

長くお付き合いいただいている地元企業も多く、紹介から仕事につながるケースも少なくありません。派手な会社ではありませんが、地域の産業を裏側から支える存在として、長く必要とされる会社でありたいと思っています。`,
      bodyWhyLocal:
`**——全国どこでも仕事ができる時代になりました。それでも大分で事業を続ける理由は何でしょうか。**

一番大きいのは、やっぱり「人」ですね。大分には、一度信頼関係ができると長く付き合ってくださる方が多い。価格だけで毎回取引先を変えるのではなく、「田中さんのところなら一回相談してみよう」と言ってもらえる。これは地方で事業をする大きな価値だと思います。

それに、私自身が大分で育っていますから、この地域から会社や雇用がなくなっていくのは寂しいんですよ。若い人が東京や福岡に出ること自体は悪いことではありません。むしろ一度外に出て、いろいろ経験したほうがいい。

ただ、その人たちが30歳、40歳になったときに、「大分に戻りたいけど、面白い仕事がない」と思われる地域にはしたくありません。「こんな会社が大分にあったんだ」と思ってもらえる企業を、一社でも増やすことが必要なんじゃないかと思っています。`,
      bodyStart:
`**——会社の始まりについても教えてください。**

もともとは、地域の企業から依頼された部品を加工する小さな町工場から始まりました。当時は今のようにホームページもSNSもありませんから、仕事のほとんどが紹介です。

一件の仕事をきちんとやる。すると、「あそこはちゃんとやってくれるよ」と次の会社を紹介してもらえる。その繰り返しで会社が続いてきました。

だから私たちにとって、一番大切な資産は機械ではなく「信用」だと思っています。設備はお金を出せば買えます。でも、30年間積み重ねてきた信用は、お金では買えません。その文化は、これから会社がどれだけ変わったとしても残していきたいですね。`,
      bodyStrength:
`**——地方企業だからこその強みはありますか。**

意思決定の距離が近いことですね。お客様から相談があったときに、営業担当、設計担当、工場長、社長までの距離がすごく近い。「それならこうしてみよう」と、その日のうちに話が進むこともあります。大きな会社では難しい、小回りの利く対応は私たちの強みです。

もう一つは、地域の企業同士のネットワークです。自社だけではできない加工があっても、「それなら〇〇さんが得意ですよ」と地域の別の会社と連携できる。地方では、一社ですべてを抱えるというより、地域全体で仕事を完成させているところがあります。

競合でもあり仲間でもある。これは都会にはない、地方産業の面白さかもしれません。`,
      bodyChallenge:
`**——逆に、地方企業ならではの課題はありますか。**

大きく二つあります。

一つ目は**採用**です。私たちの会社にも面白い仕事はあると思っていますが、それを若い人に伝えられていません。高校や大学を卒業して県外に出た人たちは、そもそも私たちの会社の存在を知らない。これは採用条件以前の問題ですよね。知られていなければ、選択肢にも入れません。

二つ目は**販路**です。技術的には県外企業の仕事にも十分対応できる。でも、「大分にこういうことができる会社があります」と東京や大阪の企業に伝える方法を、これまでほとんど持っていませんでした。

地方企業には、営業専任の人材がいない会社も多いです。良い商品や技術があっても、「知ってもらう力」が弱い。これは私たちだけではなく、多くの地方企業に共通する課題だと思います。`,
      bodyFuture:
`### AI・DXで地方企業の働き方も変えていく

**——今後、AIやDXについてはどのように考えていますか。**

これは避けて通れないと思っています。製造そのものを全部AIにするという話ではありません。見積書を作る、過去の図面を探す、日報を書く、発注情報を整理する。そういった部分には、まだまだ人が時間を使っています。そこをAIやシステムに任せることができれば、人はもっと「考える仕事」に時間を使えるようになる。

そして、これは地方企業にとってチャンスだと思っています。これまで「東京にいないとできない仕事」「大企業じゃないとできない仕事」だと思われていた仕事も、テクノロジーによって場所に関係なくできるようになってきました。

地方にいながら全国の企業と仕事をする。東京にいる人が、大分の会社の仕事を副業で手伝う。そんな働き方も、これから当たり前になっていくんじゃないでしょうか。

### 「大分を拠点に全国と仕事をする会社」へ

**——これからの会社について、どんなことに挑戦したいですか。**

「大分の会社」から「大分を拠点に全国と仕事をする会社」になっていきたいです。拠点を東京に移す必要はないと思っています。ものづくりをする場所は大分にある。ただ、お客様や一緒に働く人は全国にいていい。

たとえば東京の企業から開発の相談をいただいたり、大分出身で現在東京にいる人に営業やマーケティングを手伝ってもらったり。そういう形がもっと増えると面白いですよね。

地方企業と東京の人材が、転職だけではなく、副業、業務委託、共同プロジェクト、商品開発、販路開拓など、いろいろな方法でつながれる会社にしていきたいと思っています。`,
      bodyLocalLove:
`**——田中さんにとって、「地元」とはどんな存在ですか。**

帰ってこられる場所ですね。若い人には、一度県外に出てもらってもいいと思っています。東京でも海外でも、行きたいところに行けばいい。

ただ、その人がいつか、「地元で何かやってみようかな」「大分に戻るのも面白そうだな」と思ったときに、選択肢になる会社が地元に残っていないといけない。

だから私たち世代の役割は、「地元に残りなさい」と言うことではなく、**「戻ってきたいと思える仕事をつくっておくこと」**なんじゃないでしょうか。それができれば、県外に出ることも地元に戻ることも、どちらも前向きな選択になると思っています。`,
      bodyConnect:
`**——この記事を読んでいる東京や全国の方と、どんなつながりが生まれると嬉しいですか。**

一つに絞らなくていいと思っています。私たちの技術を必要としてくださる企業がいれば、もちろん仕事をご一緒したいです。製造業向けの商品やサービスを持っている会社との協業も歓迎です。

そして、大分出身で東京にいる人にもぜひ会社を知ってほしいですね。「今すぐ転職してください」という話ではなく、東京で培った営業、マーケティング、IT、AI、人事などの経験を、地元企業で生かす方法はたくさんあると思っています。

月に数時間だけ関わる。一つのプロジェクトだけ手伝う。東京のお客様を紹介する。そんな小さな接点から始まってもいい。県外にいる大分出身者と地元企業との間に、もっといろいろな関わり方が生まれたら面白いと思います。

### こんな人・企業とつながりたい

**一緒に働く人**
- 大分へのUターン・Iターンを考えている方
- ものづくりに興味がある方
- 製造業×AI・DXに興味がある方
- 東京など県外で培った経験を地元で生かしてみたい方

**ビジネスでつながりたい企業**
- 製造パートナーを探している企業
- 地方で試作・小ロット製造を行いたい企業
- 製造業向けのAI・DXサービスを展開している企業
- 大分や九州への事業展開を考えている企業

**こんな相談も歓迎**
- 新商品の試作 ／ 県外への販路拡大 ／ 共同商品開発
- 副業・プロ人材との連携 ／ AI・DX導入`,
      bodyMessage:
`最後に伝えたいのは、**地方には、「知られていないだけ」の会社がたくさんあるということです。**

東京で有名な会社だけが面白い会社ではありません。地方にも、世界に通用する技術を持った会社や、新しいことに挑戦している経営者がいます。

私たちもまだまだ発展途中です。だからこそ、「何か一緒にできそう」と思っていただけたら、ぜひ一度話をしてみたいですね。大分出身の方も、そうでない方も大歓迎です。大分に来る機会があれば、ぜひ工場にも遊びに来てください。

---

※本記事は「地元で働こう」の掲載イメージをお伝えするために制作したデモ記事です。企業名・人物名・内容はサンプル設定です。`,
      compRepresentative: "代表取締役　田中 健",
      compAddress: "大分県大分市",
      compBusiness: "金属加工／機械部品製造／試作・小ロット製造（主な取引先：製造業・建設関連・設備関連企業など）",
      compFounded: "",
      compUrl: "",
      compSns: "",
      compRecruit: "",
      topPick: true,
      recommend: true,
      featured: true,
    },
  };
  let idx = 0;
  for (const s of interviews) {
    const slug = s.slug!;
    ++idx;
    const publishedAt = new Date(now.getTime() - idx * 3 * 24 * 3600 * 1000); // 3日おきに過去へ
    const rich = RICH[slug] ?? {};
    const d:any = {
      slug, status:"published", prefecture:s.pref, city:"",
      companyName:s.company, personName:s.person, personRole:s.role,
      category:s.cat, tags:s.tags, title:s.title, subtitle:s.sub, mainImage:s.img ?? "",
      ...body(s),
      topPick: idx <= 5, recommend: idx <= 8, featured: idx % 5 === 0,
      ...rich,
      seoTitle:`${rich.title ?? s.title}｜${prefName[s.pref]}のインタビュー｜地元で働こう`,
      seoDescription: rich.subtitle ?? `${prefName[s.pref]}で挑戦する${s.company}／${s.person}さんのインタビュー。${s.sub}`,
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
