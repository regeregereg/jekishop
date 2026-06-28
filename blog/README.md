# Jekistore Blog — Fase 1 & 2: Foundation + Core Pages

Setup project sesuai `Jekistore_Blog_Planning_Doc.md`.
CMS Sanity asli belum disetup — itu Fase 4. Saat ini semua data masih dummy lokal.

## Cara jalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000 — akan redirect ke `/blog`.

## Yang sudah jadi

### Fase 1 — Foundation
- **Design tokens** di `src/app/globals.css` — warna, radius, font variable, sesuai §4 dokumen.
- **Font** — Inter, DM Serif Display, JetBrains Mono via `next/font/google` (lihat `src/app/layout.tsx`). Auto-download saat build/dev pertama kali (butuh koneksi internet).
- **Data**: `src/lib/dummy-data.ts` berisi 7 artikel contoh. 2 di antaranya (`art-1`, `art-2`) punya body lengkap untuk preview halaman detail; sisanya placeholder, tinggal diisi. Tipe data di `src/types/blog.ts` 1:1 mengikuti rencana schema Sanity di §6.

### Fase 2 — Core Pages
- **`/blog`** — halaman utama (hero, filter kategori, list/grid artikel, newsletter)
- **`/blog/cari`** — search dasar (client-side filter dummy data)
- **`/blog/kategori/[slug]`** — halaman kategori dengan heading + jumlah artikel, sesuai §5.2. 6 kategori sudah punya static params (trading, market, keuangan, inspirasi, tutorial, trending).
- **`/blog/[slug]`** — halaman artikel detail lengkap: breadcrumb, header, reading progress bar (sticky), table of contents (collapsible), body renderer, tag list, share buttons (bottom sheet di mobile), artikel terkait (carousel di mobile, grid di desktop). Semua 7 artikel dummy sudah punya static params.

### Komponen (`src/components/`)
- `article/` — ArticleCard (3 variant), ArticleHeader, ArticleBody, ArticleMeta, CategoryBadge, TagList, HeroSection, ReadingProgress, TableOfContents, ShareButtons, RelatedArticles
- `layout/` — Navbar (dengan mode back-button untuk halaman artikel), MobileMenu, Footer, Breadcrumb, NewsletterBanner
- `interactive/` — CategoryFilter, SearchBar, BackToTop

## Belum dikerjakan (Fase 3+)

- Setup Sanity Studio + schema asli (article, category, author) — saat ini masih dummy data lokal di `src/lib/dummy-data.ts`
- SEO: JSON-LD (Article + Breadcrumb schema), sitemap.xml dinamis, robots.ts, OG image generator per artikel
- Newsletter form belum tersambung ke Mailchimp/Brevo (UI sudah jadi, lihat `src/components/layout/NewsletterBanner.tsx`)
- Halaman tag (`/blog/tag/[slug]`) — link sudah ada di `TagList`, halamannya belum dibuat
- ISR (`revalidate`) belum disetel karena belum ada data source dinamis (masih SSG penuh dari dummy data)

## Catatan teknis

- Next.js 16 (App Router) + React 19 + Tailwind CSS v4 (pakai `@theme inline`, bukan `tailwind.config.js`)
- Gambar artikel di dummy data pakai SVG placeholder sementara — ganti dengan foto asli atau Sanity CDN nanti
- `next.config.ts` sudah disiapkan untuk `cdn.sanity.io` di `remotePatterns`
- Build sudah divalidasi dengan `tsc --noEmit`, `eslint`, dan `next build` — semua 7 halaman artikel + 6 halaman kategori ter-generate sebagai static (SSG) lewat `generateStaticParams`
