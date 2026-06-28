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
      {
        type: "paragraph",
        text: "Setiap tahun, ribuan trader pemula di Indonesia membuka akun baru dengan semangat tinggi. Mereka sudah nonton puluhan video YouTube, baca beberapa artikel, bahkan ikut kelas trading singkat. Tapi data dari berbagai broker secara konsisten menunjukkan pola yang sama: mayoritas trader baru kehilangan modal mereka dalam 12 bulan pertama.",
      },
      {
        type: "paragraph",
        text: "Yang menarik, kalau ditelusuri lebih dalam, alasan kegagalan ini jarang soal strategi entry yang salah. Banyak trader pemula sebenarnya punya pemahaman teknikal yang cukup baik — mereka bisa baca support resistance, ngerti moving average, bahkan paham price action. Masalahnya ada di tempat lain.",
      },
      {
        type: "h2",
        text: "Risk management yang asal-asalan",
      },
      {
        type: "paragraph",
        text: "Ini adalah penyebab nomor satu. Trader pemula sering masuk posisi dengan ukuran lot yang terlalu besar relatif terhadap modal mereka. Satu atau dua kali loss beruntun langsung menghabiskan porsi signifikan dari akun, dan dari situ mulai muncul tekanan psikologis untuk \"balik modal cepat\" — yang biasanya berujung pada keputusan yang lebih buruk lagi.",
      },
      {
        type: "blockquote",
        text: "Bukan strategi entry yang menentukan apakah kamu profitable jangka panjang. Yang menentukan adalah berapa banyak modal yang kamu pertaruhkan di setiap kesalahan.",
      },
      {
        type: "h2",
        text: "Ekspektasi yang tidak realistis",
      },
      {
        type: "paragraph",
        text: "Banyak konten trading di media sosial menampilkan hasil yang luar biasa — profit ratusan persen dalam sebulan, lifestyle mewah dari hasil trading. Ini menciptakan ekspektasi bahwa trading adalah jalan cepat menuju kekayaan. Realitanya, trader profesional yang konsisten biasanya menargetkan return tahunan di kisaran wajar, bukan ratusan persen per bulan.",
      },
      {
        type: "list",
        items: [
          "Menetapkan target profit harian yang tidak realistis",
          "Menganggap drawdown sebagai kegagalan, bukan bagian normal dari proses",
          "Membandingkan progres sendiri dengan highlight reel orang lain di media sosial",
        ],
      },
      {
        type: "h3",
        text: "Apa yang sebenarnya membedakan trader yang survive",
      },
      {
        type: "paragraph",
        text: "Dari pengamatan terhadap trader-trader yang berhasil bertahan lebih dari 2-3 tahun, kesamaan utamanya bukan pada indikator atau strategi yang mereka pakai, tapi pada konsistensi position sizing dan kemampuan menerima loss sebagai bagian dari proses, bukan sebagai kegagalan personal.",
      },
      {
        type: "paragraph",
        text: "Kalau kamu baru mulai, pertanyaan yang lebih penting untuk ditanyakan bukan \"strategi apa yang paling profitable\", tapi \"berapa risiko maksimal yang saya siap terima per trade, dan apakah saya benar-benar konsisten menjalankannya\".",
      },
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
    body: [
      {
        type: "paragraph",
        text: "Emas (XAUUSD) bergerak menembus level resistance jangka menengah yang sudah diuji beberapa kali dalam dua bulan terakhir. Pergerakan ini menarik perhatian karena terjadi di tengah ketidakpastian arah suku bunga The Fed, yang biasanya jadi salah satu pendorong utama pergerakan harga emas.",
      },
      {
        type: "h2",
        text: "Apa yang mendorong pergerakan ini",
      },
      {
        type: "paragraph",
        text: "Ada beberapa faktor yang berkontribusi pada penembusan resistance ini. Pertama, pelemahan indeks dolar AS (DXY) dalam beberapa hari terakhir membuat emas, yang dihargakan dalam dolar, jadi relatif lebih murah bagi pembeli dengan mata uang lain. Kedua, ada peningkatan permintaan safe-haven di tengah ketegangan geopolitik yang belum mereda.",
      },
      {
        type: "blockquote",
        text: "Penembusan level resistance bukan jaminan tren akan berlanjut — konfirmasi dari volume dan retest level tersebut sama pentingnya dengan breakout itu sendiri.",
      },
      {
        type: "h2",
        text: "Skenario yang perlu diwaspadai",
      },
      {
        type: "list",
        items: [
          "Jika harga gagal melakukan retest sukses di level resistance lama (kini jadi support), waspadai kemungkinan false breakout",
          "Rilis data inflasi AS minggu ini bisa jadi katalis volatilitas tambahan",
          "Volume saat breakout relatif tipis — perlu konfirmasi lebih lanjut sebelum menambah eksposur",
        ],
      },
      {
        type: "paragraph",
        text: "Untuk trader yang sudah memegang posisi, ini bukan saatnya euforia berlebihan. Manajemen risiko tetap jadi prioritas — pertimbangkan untuk menggeser stop loss ke level breakeven atau sedikit profit setelah konfirmasi retest, bukan menambah lot di tengah momentum tanpa rencana keluar yang jelas.",
      },
    ],
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

export function getArticleBySlug(slug: string) {
  return dummyArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string) {
  return dummyArticles.filter((a) => a.category.slug === categorySlug);
}

/** Artikel terkait: kategori sama dulu, lalu isi sisa slot dengan artikel terbaru lain */
export function getRelatedArticles(article: Article, limit = 3) {
  const sameCategory = dummyArticles.filter(
    (a) => a._id !== article._id && a.category.slug === article.category.slug,
  );
  const others = dummyArticles.filter(
    (a) => a._id !== article._id && a.category.slug !== article.category.slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
