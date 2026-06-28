import { Article, Author } from "@/types/blog";
import { categories } from "./site-config";

const author: Author = {
  _id: "author-tim-jekistore",
  name: "Tim Jekistore",
  avatarUrl: "/avatars/tim-jekistore.png",
  bio: "Redaksi Jekistore — menulis tentang trading dan market dengan data, tanpa hype.",
};

const findCategory = (slug: string) =>
  categories.find((c) => c.slug === slug)!;

export const dummyArticles: Article[] = [
  {
    _id: "art-1",
    title: "Kenapa 90% Trader Pemula Gagal di Tahun Pertama — Bukan Soal Strategi",
    slug: "kenapa-trader-pemula-gagal-tahun-pertama",
    excerpt:
      "Bukan strategi yang kurang bagus. Mayoritas trader baru gagal karena risk management yang asal-asalan dan ekspektasi yang tidak realistis.",
    heroImageUrl: "/images/articles/trader-pemula.svg",
    heroImageAlt: "Trader pemula menatap chart dengan kebingungan",
    category: findCategory("trading"),
    tags: ["trading", "psikologi-trading", "risk-management"],
    author,
    publishedAt: "2026-06-20",
    readingTime: 7,
    featured: true,
    body: [
      { type: "paragraph", text: "Placeholder body — diisi nanti." },
    ],
  },
  {
    _id: "art-2",
    title: "XAUUSD Tembus Resistance Kunci: Apa Artinya untuk Minggu Ini?",
    slug: "xauusd-tembus-resistance-kunci",
    excerpt:
      "Emas bergerak menembus level resistance jangka menengah. Kita bedah apa yang mendorong pergerakan ini dan skenario yang perlu diwaspadai.",
    heroImageUrl: "/images/articles/xauusd-chart.svg",
    heroImageAlt: "Chart XAUUSD menembus level resistance",
    category: findCategory("market"),
    tags: ["xauusd", "emas", "analisis-teknikal"],
    author,
    publishedAt: "2026-06-25",
    readingTime: 5,
    body: [{ type: "paragraph", text: "Placeholder body — diisi nanti." }],
  },
  {
    _id: "art-3",
    title: "Reksa Dana vs Saham Individu: Mana yang Cocok untuk Pemula 2026?",
    slug: "reksa-dana-vs-saham-individu-pemula",
    excerpt:
      "Dua instrumen ini sering dibandingkan, tapi jarang dijelaskan dengan jujur soal risiko dan komitmen waktu yang dibutuhkan masing-masing.",
    heroImageUrl: "/images/articles/reksa-dana-saham.svg",
    heroImageAlt: "Ilustrasi perbandingan reksa dana dan saham",
    category: findCategory("keuangan"),
    tags: ["reksa-dana", "saham", "investasi-pemula"],
    author,
    publishedAt: "2026-06-22",
    readingTime: 6,
    body: [{ type: "paragraph", text: "Placeholder body — diisi nanti." }],
  },
  {
    _id: "art-4",
    title: "Dari Karyawan Kantoran ke Full-Time Trader: Cerita Rian dari Bandung",
    slug: "cerita-rian-full-time-trader-bandung",
    excerpt:
      "Tiga tahun belajar, dua kali blow up akun, dan satu pelajaran yang akhirnya mengubah cara Rian melihat risiko.",
    heroImageUrl: "/images/articles/cerita-rian.svg",
    heroImageAlt: "Potret trader retail bekerja dari rumah",
    category: findCategory("inspirasi"),
    tags: ["kisah-trader", "mindset"],
    author,
    publishedAt: "2026-06-18",
    readingTime: 8,
    body: [{ type: "paragraph", text: "Placeholder body — diisi nanti." }],
  },
  {
    _id: "art-5",
    title: "Cara Setup Alert Multi-Timeframe di TradingView Tanpa Ribet",
    slug: "cara-setup-alert-multi-timeframe-tradingview",
    excerpt:
      "Tutorial step-by-step bikin alert yang benar-benar berguna, bukan yang bikin notifikasi HP penuh tapi tidak actionable.",
    heroImageUrl: "/images/articles/tradingview-alert.svg",
    heroImageAlt: "Tampilan setup alert di TradingView",
    category: findCategory("tutorial"),
    tags: ["tradingview", "tutorial", "alert"],
    author,
    publishedAt: "2026-06-15",
    readingTime: 4,
    body: [{ type: "paragraph", text: "Placeholder body — diisi nanti." }],
  },
  {
    _id: "art-6",
    title: "DXY Melemah, IHSG Menguat — Apa Hubungannya untuk Trader Ritel?",
    slug: "dxy-melemah-ihsg-menguat-hubungan",
    excerpt:
      "Korelasi dolar AS dan pasar saham domestik sering disebut tapi jarang dijelaskan mekanismenya. Ini penjelasan singkatnya.",
    heroImageUrl: "/images/articles/dxy-ihsg.svg",
    heroImageAlt: "Grafik perbandingan DXY dan IHSG",
    category: findCategory("market"),
    tags: ["dxy", "ihsg", "makro"],
    author,
    publishedAt: "2026-06-26",
    readingTime: 5,
    body: [{ type: "paragraph", text: "Placeholder body — diisi nanti." }],
  },
  {
    _id: "art-7",
    title: "Funded Trader Program: Worth It atau Jebakan Marketing?",
    slug: "funded-trader-program-worth-it-atau-jebakan",
    excerpt:
      "FTMO dan sejenisnya menjanjikan modal besar tanpa risiko pribadi. Kita lihat angka-angka aslinya, bukan testimoni marketing.",
    heroImageUrl: "/images/articles/funded-trader.svg",
    heroImageAlt: "Ilustrasi konsep funded trading program",
    category: findCategory("trading"),
    tags: ["funded-trader", "ftmo", "prop-firm"],
    author,
    publishedAt: "2026-06-10",
    readingTime: 9,
    body: [{ type: "paragraph", text: "Placeholder body — diisi nanti." }],
  },
];

export const dummyFeaturedArticles = dummyArticles.filter((a) => a.featured);
