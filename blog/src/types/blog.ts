// Tipe data ini merefleksikan schema Sanity di dokumen planning §6.
// Selama Fase 1 kita pakai dummy data lokal (lihat lib/dummy-data.ts);
// nanti tinggal diganti dengan query Sanity tanpa mengubah shape komponen.

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  /** Warna badge kategori, contoh: "#F5C518" */
  color: string;
}

export interface Author {
  _id: string;
  name: string;
  avatarUrl: string;
  bio?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  /** Ringkasan maks 160 karakter, dipakai juga sebagai meta description */
  excerpt: string;
  heroImageUrl: string;
  heroImageAlt: string;
  category: Category;
  tags: string[];
  author: Author;
  publishedAt: string; // ISO date string
  /** Estimasi waktu baca dalam menit */
  readingTime: number;
  /** Konten body — placeholder string[] di Fase 1, nanti jadi Portable Text dari Sanity */
  body: ArticleBlock[];
  featured?: boolean;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; url: string; alt: string; caption?: string };
