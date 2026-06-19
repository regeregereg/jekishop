/**
 * ============================================================
 *  JEKISTORE BLOG — ARTICLE REGISTRY
 *  articles.js
 * ============================================================
 *
 *  INI ADALAH SATU-SATUNYA FILE YANG PERLU DIUBAH
 *  ketika kamu publish artikel baru.
 *
 *  Cara menambah artikel baru:
 *  1. Tambahkan objek baru di array ARTICLES (urutan terbaru di atas)
 *  2. Upload file HTML artikel ke folder /blog/
 *  3. Selesai — blog index, related, popular, schema semua otomatis update
 *
 *  Field yang WAJIB diisi:
 *    slug       → nama file HTML tanpa .html, contoh: "cara-pakai-bar-replay-tradingview"
 *    title      → judul artikel
 *    excerpt    → deskripsi singkat (1-2 kalimat), muncul di card
 *    category   → lihat daftar CATEGORIES di bawah
 *    icon       → Bootstrap Icon class, contoh: "bi-play-circle"
 *    readTime   → contoh: "5 menit"
 *    date       → format "DD Bulan YYYY", contoh: "18 Juni 2026"
 *    dateISO    → format ISO untuk schema, contoh: "2026-06-18"
 *
 *  Field OPSIONAL:
 *    image      → path gambar thumbnail, contoh: "/blog/imgblog/foto.jpg"
 *    imageAlt   → alt text gambar
 *    featured   → true/false, artikel ini yang tampil besar di atas blog index
 *                 (hanya 1 artikel yang featured:true)
 *    tags       → array topik, contoh: ["Bar Replay", "Backtest", "Pemula"]
 *
 *  CATEGORIES yang tersedia:
 *    "perbandingan"  → Perbandingan fitur/produk
 *    "fitur"         → Fitur TradingView
 *    "market"        → Analisis & psikologi market
 *    "panduan"       → Panduan step-by-step
 *    "tips"          → Tips trading praktis
 *
 * ============================================================
 */

const ARTICLES = [

  // ─────────────────────────────────────────────────────────
  //  CONTOH ARTIKEL BARU — hapus komentar ini saat publish
  // ─────────────────────────────────────────────────────────
  // {
  //   slug:     "harga-tradingview-premium-indonesia-2026",
  //   title:    "Berapa Harga TradingView Premium di Indonesia? Perbandingan Lengkap 2026",
  //   excerpt:  "Harga resmi TradingView bisa tembus Rp 600.000+/bulan. Ada cara legal beli jauh lebih murah — ini perbandingan lengkapnya.",
  //   category: "panduan",
  //   icon:     "bi-tag",
  //   readTime: "4 menit",
  //   date:     "25 Juni 2026",
  //   dateISO:  "2026-06-25",
  //   image:    "/blog/imgblog/harga-tradingview-premium.jpg",
  //   imageAlt: "Perbandingan harga TradingView Premium Indonesia",
  //   featured: false,
  //   tags:     ["Harga", "Perbandingan", "Pemula"]
  // },

  // ─────────────────────────────────────────────────────────
  //  ARTIKEL LIVE
  // ─────────────────────────────────────────────────────────
  {
    slug:     "crypto-etf-2026-panduan-trader-indonesia",
    title:    "Crypto ETF 2026: Apa Artinya Buat Trader Indonesia?",
    excerpt:  "ETF crypto sudah menyedot $55 miliar+ dan kini jadi penggerak utama harga Bitcoin. Kalau kamu belum memperhatikan data ETF flow, kamu trading dengan mata tertutup.",
    category: "panduan",
    icon:     "bi-bar-chart-line",
    readTime: "7 menit",
    date:     "19 Juni 2026",
    dateISO:  "2026-06-19",
    image:    "/blog/imgblog/crypto-etf-2026-indonesia.jpg",
    imageAlt: "Panduan Crypto ETF 2026 untuk Trader Indonesia",
    featured: false,
    tags:     ["ETF", "Bitcoin", "Market", "Panduan"]
  },

  {
    slug:     "bitcoin-sideways-juni-2026",
    title:    "Bitcoin Sideways di $63K — Ini yang Sebenarnya Terjadi",
    excerpt:  "Bitcoin stuck di kisaran $60K–$64K hampir sebulan penuh. Bukan karena pasar mati — ada data konkret di baliknya dan ada yang bisa kamu lakukan sekarang.",
    category: "market",
    icon:     "bi-graph-up",
    readTime: "6 menit",
    date:     "19 Juni 2026",
    dateISO:  "2026-06-19",
    image:    "/blog/imgblog/bitcoin-sideways-juni-2026.jpg",
    imageAlt: "Analisis Bitcoin Sideways Juni 2026",
    featured: false,
    tags:     ["Bitcoin", "Market", "Analisis", "ETF"]
  },

  {
    slug:     "tradingview-free-vs-premium",
    title:    "TradingView Free vs Premium: Bedanya Apa dan Kapan Worth It Upgrade?",
    excerpt:  "Banyak trader masih ragu upgrade ke Premium karena belum tahu apa yang beneran berubah. Artikel ini breakdown fitur per fitur secara jujur — mana yang krusial, mana yang cuma nice-to-have.",
    category: "perbandingan",
    icon:     "bi-arrow-left-right",
    readTime: "8 menit",
    date:     "Juni 2026",
    dateISO:  "2026-06-18",
    image:    "/blog/imgblog/tradingviewpremiumvsfree.jpg",
    imageAlt: "Trading View Premium Vs Free Apa manfaatnya",
    featured: true,
    tags:     ["Perbandingan", "Pemula", "Indikator", "Bar Replay"]
  },

  {
    slug:     "cara-pakai-bar-replay-tradingview",
    title:    "Cara Pakai Bar Replay TradingView untuk Backtest Manual yang Lebih Akurat",
    excerpt:  "Bar Replay adalah fitur yang bikin kamu bisa \"mundur waktu\" di chart. Begini cara pakainya dengan benar untuk melatih entry dan exit point.",
    category: "fitur",
    icon:     "bi-skip-backward-circle",
    readTime: "5 menit",
    date:     "Juni 2026",
    dateISO:  "2026-06-18",
    image:    null,
    imageAlt: null,
    featured: false,
    tags:     ["Bar Replay", "Backtest", "Fitur TradingView"]
  },

  {
    slug:     "market-digerakan-oleh-emosi",
    title:    "Mengapa 80% Market Digerakkan Emosi dan Hanya 20% Oleh Teori?",
    excerpt:  "Banyak trader menghabiskan waktu bertahun-tahun mempelajari indikator tapi tetap rugi. Jawabannya ada di psikologi pasar — fear, greed, dan herd mentality.",
    category: "market",
    icon:     "bi-activity",
    readTime: "4 menit",
    date:     "18 Juni 2026",
    dateISO:  "2026-06-18",
    image:    "/blog/imgblog/behine-market-marketdigerakanemosi.webp",
    imageAlt: "Mengapa 80% Market Digerakkan Emosi",
    featured: false,
    tags:     ["Psikologi Trading", "Market", "Pemula"]
  },

  {
    slug:     "navigasi-labirin-trading-mengapamindsetdanpemahamansiklusjauhlebihpentingdaripadamencaristrategiterbaik",
    title:    "Navigasi Labirin Trading: Mengapa Mindset dan Pemahaman Siklus Jauh Lebih Penting",
    excerpt:  "Banyak trader pemula terjebak dalam siklus tanpa akhir mencari strategi ajaib. Padahal kunci konsistensi ada di mindset dan pemahaman siklus pasar struktural.",
    category: "market",
    icon:     "bi-compass",
    readTime: "6 menit",
    date:     "18 Juni 2026",
    dateISO:  "2026-06-18",
    image:    "/blog/imgblog/navigasi-labirin-trading.jpg",
    imageAlt: "Mengapa Mindset dan Pemahaman Siklus Jauh Lebih Penting",
    featured: false,
    tags:     ["Mindset", "Siklus Pasar", "Market"]
  },

];

// ─────────────────────────────────────────────────────────
//  CATEGORY CONFIG — tidak perlu diubah
// ─────────────────────────────────────────────────────────
const CATEGORY_CONFIG = {
  perbandingan: { label: "Perbandingan",    icon: "bi-arrow-left-right", filterKey: "perbandingan" },
  fitur:        { label: "Fitur TradingView", icon: "bi-play-circle",    filterKey: "fitur" },
  market:       { label: "Market",           icon: "bi-activity",        filterKey: "market" },
  panduan:      { label: "Panduan",          icon: "bi-book",            filterKey: "panduan" },
  tips:         { label: "Tips Trading",     icon: "bi-lightbulb",       filterKey: "tips" },
};
