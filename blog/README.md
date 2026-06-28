# Jekistore Blog — Fase 1: Foundation

Setup project sesuai `Jekistore_Blog_Planning_Doc.md`. Fase 1 mencakup:
Next.js + Tailwind, design system (warna/font/radius), dan komponen dasar.
CMS Sanity & halaman artikel detail belum disetup — itu Fase 2/4.

## Cara jalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000 — akan redirect ke `/blog`.

## Yang sudah jadi

- **Design tokens** di `src/app/globals.css` — warna, radius, font variable, sesuai §4 dokumen.
- **Font** — Inter, DM Serif Display, JetBrains Mono via `next/font/google` (lihat `src/app/layout.tsx`). Auto-download saat build/dev pertama kali (butuh koneksi internet).
- **Halaman**:
  - `/blog` — halaman utama (hero, filter kategori, list/grid artikel, newsletter)
  - `/blog/cari` — search dasar (client-side filter dummy data)
- **Komponen** (`src/components/`):
  - `article/` — ArticleCard (3 variant), CategoryBadge, ArticleMeta, HeroSection, TagList
  - `layout/` — Navbar, MobileMenu, Footer, Breadcrumb, NewsletterBanner
  - `interactive/` — CategoryFilter, SearchBar, BackToTop
- **Data**: `src/lib/dummy-data.ts` berisi 7 artikel contoh dengan gambar placeholder SVG di `public/images/articles/`. Tipe data di `src/types/blog.ts` sudah dibuat 1:1 mengikuti rencana schema Sanity di §6 dokumen, supaya nanti tinggal ganti dummy data dengan Sanity query tanpa ubah komponen.

## Belum dikerjakan (Fase 2+)

- Halaman kategori (`/blog/kategori/[slug]`) — folder placeholder sudah ada
- Halaman artikel detail (`/blog/[slug]`) — folder placeholder sudah ada, perlu ArticleHeader, ArticleBody (Portable Text renderer), ReadingProgress, ShareButtons, RelatedArticles
- Setup Sanity Studio + schema asli (article, category, author)
- SEO: JSON-LD, sitemap, OG image per artikel
- Newsletter form belum tersambung ke Mailchimp/Brevo (UI sudah jadi, lihat `src/components/layout/NewsletterBanner.tsx`)

## Catatan teknis

- Next.js 16 (App Router) + React 19 + Tailwind CSS v4 (pakai `@theme inline`, bukan `tailwind.config.js`)
- Gambar artikel di dummy data pakai SVG placeholder sementara — ganti dengan foto asli atau Sanity CDN nanti
- `next.config.ts` sudah disiapkan untuk `cdn.sanity.io` di `remotePatterns`
