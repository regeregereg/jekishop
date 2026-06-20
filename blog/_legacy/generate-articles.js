#!/usr/bin/env node
/**
 * generate-articles.js
 * ─────────────────────────────────────────────────────────
 * Generate halaman artikel statis dari articles.json (meta)
 * dan articles-content.json (isi konten).
 *
 * Output: blog/[slug]/index.html untuk setiap artikel published
 *
 * Cara pakai:
 *   1. Tulis konten artikel di articles-content.json
 *   2. Pastikan slug & meta sudah ada di articles.json
 *   3. Jalankan: node generate-articles.js
 *   4. File blog/[slug]/index.html akan ter-generate otomatis
 *   5. Commit & push ke Vercel — URL /blog/[slug] langsung aktif
 *
 * Format blok konten yang didukung di articles-content.json:
 *   { "type": "intro", "text": "..." }          — Paragraf pembuka besar
 *   { "type": "p", "text": "..." }              — Paragraf biasa
 *   { "type": "h2", "text": "..." }             — Heading section
 *   { "type": "h3", "text": "..." }             — Heading sub-section
 *   { "type": "list", "items": [...] }          — Bullet list
 *   { "type": "steps", "items": [...] }         — Numbered steps
 *   { "type": "table", "caption", "headers", "rows" } — Tabel perbandingan
 *   { "type": "cta", "text", "href", "label" } — Call-to-action box
 *   { "type": "callout", "text": "..." }        — Highlight box / tip
 * ─────────────────────────────────────────────────────────
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_JSON_PATH   = path.join(__dirname, '..', 'articles.json');
const CONTENT_JSON_PATH    = path.join(__dirname, 'articles-content.json'); // sama folder blog/
const OUTPUT_DIR           = path.join(__dirname); // output langsung di folder blog/
const SITE_URL             = 'https://jekistore.com';

// ── Helpers ──────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Block renderers ───────────────────────────────────────
function renderBlock(block) {
  switch (block.type) {
    case 'intro':
      return `<p class="article-intro">${esc(block.text)}</p>`;

    case 'p':
      return `<p>${esc(block.text)}</p>`;

    case 'h2':
      return `<h2>${esc(block.text)}</h2>`;

    case 'h3':
      return `<h3>${esc(block.text)}</h3>`;

    case 'list':
      const liItems = block.items.map(item => `<li>${esc(item)}</li>`).join('\n      ');
      return `<ul>\n      ${liItems}\n    </ul>`;

    case 'steps':
      const olItems = block.items.map(item => `<li>${esc(item)}</li>`).join('\n      ');
      return `<ol>\n      ${olItems}\n    </ol>`;

    case 'table':
      const thCells = block.headers.map(h => `<th>${esc(h)}</th>`).join('');
      const tbody = block.rows.map(row => {
        const tds = row.map(cell => `<td>${esc(cell)}</td>`).join('');
        return `<tr>${tds}</tr>`;
      }).join('\n        ');
      return `<div class="table-wrap">
      <table>
        <caption>${esc(block.caption || '')}</caption>
        <thead><tr>${thCells}</tr></thead>
        <tbody>
        ${tbody}
        </tbody>
      </table>
    </div>`;

    case 'cta':
      return `<div class="article-cta">
      <p>${esc(block.text)}</p>
      <a href="${esc(block.href)}" class="btn-cta" target="_blank" rel="noopener">
        <i class="bi bi-whatsapp"></i> ${esc(block.label)}
      </a>
    </div>`;

    case 'callout':
      return `<div class="article-callout">
      <i class="bi bi-lightbulb-fill"></i>
      <p>${esc(block.text)}</p>
    </div>`;

    default:
      console.warn(`  ⚠ Tipe blok tidak dikenal: "${block.type}" — dilewati`);
      return '';
  }
}

// ── Artikel lain untuk "Artikel Terkait" ─────────────────
function renderRelated(allMeta, currentSlug) {
  const others = allMeta
    .filter(a => a.slug !== currentSlug && a.status === 'published')
    .slice(0, 3);

  if (others.length === 0) return '';

  const cards = others.map(a => `
    <a href="/blog/${esc(a.slug)}" class="related-card">
      <div class="related-thumb">
        <div class="thumb-pattern"></div>
        <i class="bi ${esc(a.thumbIcon)} related-icon"></i>
      </div>
      <div class="related-body">
        <div class="related-cat"><i class="bi ${esc(a.categoryIcon)}"></i> ${esc(a.categoryLabel)}</div>
        <div class="related-title">${esc(a.title)}</div>
        <div class="related-meta"><i class="bi bi-clock"></i> ${esc(a.readTime)}</div>
      </div>
    </a>`).join('');

  return `<section class="related-section">
    <h2 class="related-heading">Artikel Lainnya</h2>
    <div class="related-grid">
      ${cards}
    </div>
  </section>`;
}

// ── Full HTML page builder ────────────────────────────────
function buildArticlePage(meta, content, allMeta) {
  const contentHtml = content.blocks.map(renderBlock).join('\n\n    ');
  const relatedHtml = renderRelated(allMeta, meta.slug);
  const canonicalUrl = `${SITE_URL}/blog/${meta.slug}`;

  return `<!DOCTYPE html>
<html lang="id" prefix="og: https://ogp.me/ns#">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

<!-- Security -->
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

<!-- SEO -->
<title>${esc(meta.title)} — Blog JekiStore</title>
<meta name="description" content="${esc(meta.excerpt)}">
<meta name="author" content="JekiStore">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<link rel="canonical" href="${canonicalUrl}">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.excerpt)}">
<meta property="og:image" content="${SITE_URL}/asset/og-image.png">
<meta property="og:locale" content="id_ID">
<meta property="og:site_name" content="JekiStore">
<meta property="article:published_time" content="${new Date().toISOString().split('T')[0]}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.excerpt)}">

<!-- Schema.org Article -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${meta.title.replace(/"/g, '\\"')}",
  "description": "${meta.excerpt.replace(/"/g, '\\"')}",
  "url": "${canonicalUrl}",
  "inLanguage": "id",
  "author": { "@type": "Organization", "name": "JekiStore", "url": "${SITE_URL}" },
  "publisher": {
    "@type": "Organization",
    "name": "JekiStore",
    "url": "${SITE_URL}",
    "logo": { "@type": "ImageObject", "url": "${SITE_URL}/asset/logo.png" }
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "${SITE_URL}" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "${SITE_URL}/blog" },
      { "@type": "ListItem", "position": 3, "name": "${meta.title.replace(/"/g, '\\"')}", "item": "${canonicalUrl}" }
    ]
  }
}
</script>

<!-- Performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<style>
:root {
  --green:        #a8ff3e;
  --green-deep:   #7acc1a;
  --green-light:  #edffd0;
  --green-mid:    rgba(168,255,62,0.18);
  --green-border: rgba(168,255,62,0.35);
  --black:        #0f0f0f;
  --ink:          #1a1a1a;
  --ink-mid:      #3d3d3d;
  --ink-muted:    #767676;
  --surface:      #fafaf8;
  --surface-2:    #f2f2ee;
  --surface-3:    #e8e8e2;
  --card:         #ffffff;
  --border:       #e0e0d8;
  --border-dark:  #c8c8be;
  --shadow-sm:    0 1px 4px rgba(0,0,0,0.06);
  --shadow-md:    0 4px 20px rgba(0,0,0,0.08);
  --shadow-lg:    0 12px 48px rgba(0,0,0,0.12);
  --text-xs:   0.64rem;  --text-sm:  0.8rem;
  --text-base: 1rem;     --text-md:  1.25rem;
  --text-lg:   1.563rem; --text-xl:  1.953rem;
  --text-2xl:  2.441rem;
  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px;
  --radius-xl: 32px; --radius-pill: 999px;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px;
}

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; font-size:16px; }
body {
  font-family:'Plus Jakarta Sans', system-ui, sans-serif;
  font-size:var(--text-base); line-height:1.6;
  color:var(--ink); background:var(--surface);
  overflow-x:hidden; -webkit-font-smoothing:antialiased;
}
a { text-decoration:none; color:inherit; }
img { display:block; max-width:100%; }

/* ── NAVBAR ── */
#navbar {
  position:fixed; top:0; left:0; right:0; z-index:200;
  padding:14px 24px; display:flex; align-items:center;
  justify-content:center; pointer-events:none;
}
.nav-pill {
  display:flex; align-items:center; gap:0;
  background:rgba(250,250,248,0.92); backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px); border:1px solid var(--border);
  border-radius:var(--radius-pill); padding:6px 6px 6px 20px;
  box-shadow:0 2px 12px rgba(0,0,0,0.07),0 8px 32px rgba(0,0,0,0.06);
  pointer-events:all; transition:box-shadow 0.32s,background 0.32s;
  width:max-content; max-width:calc(100vw - 48px);
}
nav.scrolled .nav-pill {
  box-shadow:0 4px 24px rgba(0,0,0,0.10),0 12px 40px rgba(0,0,0,0.08);
  background:rgba(250,250,248,0.99); border-color:var(--border-dark);
}
.nav-logo {
  font-size:1rem; font-weight:800; color:var(--ink);
  letter-spacing:-0.04em; display:flex; align-items:center; gap:7px; flex-shrink:0;
}
.logo-dot {
  width:8px; height:8px; background:var(--green); border-radius:50%;
  border:2px solid var(--black); animation:blink 2.2s ease-in-out infinite; flex-shrink:0;
}
@keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.75)} }
.nav-divider-v { width:1px; height:20px; background:var(--border); margin:0 16px; flex-shrink:0; }
.nav-menu { display:flex; align-items:center; gap:4px; list-style:none; }
.nav-menu a {
  font-size:0.8125rem; font-weight:600; color:var(--ink-mid);
  letter-spacing:-0.01em; transition:color 0.18s,background 0.18s;
  padding:6px 12px; border-radius:var(--radius-pill);
}
.nav-menu a:hover, .nav-menu a.active { color:var(--ink); background:var(--surface-2); }
.nav-cta {
  margin-left:8px; background:var(--black); color:var(--green) !important;
  font-size:0.8125rem; font-weight:700; padding:8px 18px;
  border-radius:var(--radius-pill); transition:background 0.18s,transform 0.18s; white-space:nowrap;
}
.nav-cta:hover { background:var(--ink); transform:translateY(-1px); }

/* ── ARTICLE HERO ── */
.article-hero {
  background:var(--black); padding:120px 24px 64px;
  position:relative; overflow:hidden;
}
.article-hero::before {
  content:''; position:absolute; top:-80px; left:50%;
  transform:translateX(-50%); width:700px; height:700px;
  background:radial-gradient(circle,rgba(168,255,62,0.10) 0%,transparent 65%);
  pointer-events:none;
}
.hero-inner { max-width:760px; margin:0 auto; position:relative; }
.hero-breadcrumb {
  display:flex; align-items:center; gap:8px; margin-bottom:var(--space-5);
  font-size:var(--text-sm); color:rgba(255,255,255,0.45);
}
.hero-breadcrumb a { color:rgba(255,255,255,0.55); transition:color 0.18s; }
.hero-breadcrumb a:hover { color:var(--green); }
.hero-breadcrumb i { font-size:0.7rem; }
.hero-cat {
  display:inline-flex; align-items:center; gap:6px;
  font-size:var(--text-sm); font-weight:700; letter-spacing:0.06em;
  text-transform:uppercase; color:var(--green-deep);
  background:var(--green-mid); border:1px solid var(--green-border);
  padding:5px 14px; border-radius:var(--radius-pill); margin-bottom:var(--space-4);
}
.article-hero h1 {
  font-size:clamp(1.75rem,4vw,2.8rem); font-weight:800;
  color:#fff; letter-spacing:-0.03em; line-height:1.15;
  margin-bottom:var(--space-5);
}
.hero-meta {
  display:flex; align-items:center; gap:var(--space-5); flex-wrap:wrap;
  font-size:var(--text-sm); color:rgba(255,255,255,0.45);
}
.hero-meta i { margin-right:5px; }

/* ── ARTICLE LAYOUT ── */
.article-layout {
  max-width:1100px; margin:0 auto; padding:var(--space-8) var(--space-5);
  display:grid; grid-template-columns:1fr 300px; gap:var(--space-7); align-items:start;
}

/* ── ARTICLE BODY ── */
.article-body { min-width:0; }
.article-body h2 {
  font-size:var(--text-lg); font-weight:800; color:var(--ink);
  letter-spacing:-0.02em; margin:var(--space-7) 0 var(--space-4);
  padding-bottom:var(--space-3); border-bottom:2px solid var(--border);
}
.article-body h2:first-child { margin-top:0; }
.article-body h3 {
  font-size:var(--text-md); font-weight:700; color:var(--ink);
  margin:var(--space-6) 0 var(--space-3); letter-spacing:-0.01em;
}
.article-body p {
  margin-bottom:var(--space-5); color:var(--ink-mid); line-height:1.8;
}
.article-intro {
  font-size:var(--text-md); color:var(--ink); font-weight:500;
  line-height:1.7; margin-bottom:var(--space-6) !important;
  padding:var(--space-5) var(--space-6); background:var(--green-light);
  border-left:4px solid var(--green-deep); border-radius:0 var(--radius-md) var(--radius-md) 0;
}
.article-body ul, .article-body ol {
  margin:0 0 var(--space-5) var(--space-6); color:var(--ink-mid);
}
.article-body li { margin-bottom:var(--space-3); line-height:1.7; }
.article-body ol { counter-reset:steps; list-style:none; margin-left:0; }
.article-body ol li {
  counter-increment:steps; padding-left:var(--space-7);
  position:relative; margin-bottom:var(--space-5);
}
.article-body ol li::before {
  content:counter(steps); position:absolute; left:0;
  width:28px; height:28px; background:var(--black); color:var(--green);
  font-weight:800; font-size:0.75rem; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  top:2px; flex-shrink:0;
}

/* ── TABLE ── */
.table-wrap { overflow-x:auto; margin-bottom:var(--space-6); border-radius:var(--radius-md); border:1px solid var(--border); }
.table-wrap table { width:100%; border-collapse:collapse; font-size:var(--text-sm); }
.table-wrap caption { font-size:var(--text-sm); color:var(--ink-muted); padding:var(--space-3); text-align:left; caption-side:top; }
.table-wrap th {
  background:var(--black); color:var(--green); font-weight:700;
  padding:var(--space-3) var(--space-4); text-align:left; white-space:nowrap;
}
.table-wrap td { padding:var(--space-3) var(--space-4); border-top:1px solid var(--border); color:var(--ink-mid); }
.table-wrap tr:nth-child(even) td { background:var(--surface-2); }

/* ── CALLOUT ── */
.article-callout {
  display:flex; gap:var(--space-4); align-items:flex-start;
  background:var(--surface-2); border:1px solid var(--border);
  border-radius:var(--radius-md); padding:var(--space-5);
  margin-bottom:var(--space-5);
}
.article-callout i { color:var(--green-deep); font-size:1.2rem; flex-shrink:0; margin-top:2px; }
.article-callout p { margin:0 !important; color:var(--ink-mid); }

/* ── CTA BOX ── */
.article-cta {
  background:var(--black); border-radius:var(--radius-lg);
  padding:var(--space-7); text-align:center; margin:var(--space-7) 0;
}
.article-cta p { color:rgba(255,255,255,0.7); margin-bottom:var(--space-5) !important; font-size:var(--text-md); }
.btn-cta {
  display:inline-flex; align-items:center; gap:8px;
  background:var(--green); color:var(--black);
  font-weight:700; font-size:var(--text-base); padding:12px 28px;
  border-radius:var(--radius-pill); transition:transform 0.18s,opacity 0.18s;
}
.btn-cta:hover { transform:translateY(-2px); opacity:0.9; }

/* ── SIDEBAR ── */
.article-sidebar { position:sticky; top:100px; display:flex; flex-direction:column; gap:var(--space-5); }
.sidebar-card {
  background:var(--card); border:1px solid var(--border);
  border-radius:var(--radius-md); padding:var(--space-5);
}
.sidebar-title { font-size:var(--text-sm); font-weight:800; letter-spacing:0.06em; text-transform:uppercase; color:var(--ink-muted); margin-bottom:var(--space-4); }
.sidebar-cta { background:var(--black); border-radius:var(--radius-md); padding:var(--space-5); text-align:center; }
.sidebar-cta p { color:rgba(255,255,255,0.6); font-size:var(--text-sm); margin-bottom:var(--space-3); }
.price-tag { font-size:var(--text-xl); font-weight:800; color:var(--green); letter-spacing:-0.03em; }
.price-label { font-size:var(--text-xs); color:rgba(255,255,255,0.4); margin-bottom:var(--space-5); }
.btn-sidebar-cta {
  display:flex; align-items:center; justify-content:center; gap:8px;
  background:var(--green); color:var(--black); font-weight:700;
  font-size:var(--text-sm); padding:10px 20px;
  border-radius:var(--radius-pill); transition:transform 0.18s; width:100%;
}
.btn-sidebar-cta:hover { transform:translateY(-2px); }
.toc-list { list-style:none; }
.toc-list li { border-bottom:1px solid var(--border); }
.toc-list li:last-child { border-bottom:none; }
.toc-list a {
  display:block; padding:var(--space-3) 0; font-size:var(--text-sm);
  color:var(--ink-mid); transition:color 0.18s;
}
.toc-list a:hover { color:var(--green-deep); }

/* ── RELATED ── */
.related-section { margin-top:var(--space-7); padding-top:var(--space-6); border-top:2px solid var(--border); }
.related-heading { font-size:var(--text-md); font-weight:800; margin-bottom:var(--space-5); letter-spacing:-0.02em; }
.related-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:var(--space-4); }
.related-card {
  background:var(--card); border:1px solid var(--border); border-radius:var(--radius-md);
  overflow:hidden; transition:box-shadow 0.22s,transform 0.22s; display:flex; flex-direction:column;
}
.related-card:hover { box-shadow:var(--shadow-md); transform:translateY(-3px); }
.related-thumb {
  background:var(--black); height:100px;
  display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden;
}
.thumb-pattern {
  width:100%; height:100%; position:absolute; inset:0;
  background:radial-gradient(circle at 50% 50%,rgba(168,255,62,0.14) 0%,transparent 65%),
    repeating-linear-gradient(-45deg,transparent,transparent 16px,rgba(168,255,62,0.03) 16px,rgba(168,255,62,0.03) 17px);
}
.related-icon { font-size:1.8rem; color:var(--green); position:relative; z-index:1; filter:drop-shadow(0 0 12px rgba(168,255,62,0.4)); }
.related-body { padding:var(--space-4); display:flex; flex-direction:column; gap:var(--space-2); flex:1; }
.related-cat { font-size:var(--text-xs); font-weight:700; color:var(--ink-muted); text-transform:uppercase; letter-spacing:0.05em; }
.related-title { font-size:var(--text-sm); font-weight:700; color:var(--ink); line-height:1.4; }
.related-meta { font-size:var(--text-xs); color:var(--ink-muted); margin-top:auto; }

/* ── FOOTER ── */
footer { text-align:center; padding:var(--space-7) var(--space-5); border-top:1px solid var(--border); color:var(--ink-muted); font-size:var(--text-sm); line-height:2; }
footer a:hover { color:var(--green-deep); }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .article-layout { grid-template-columns:1fr; }
  .article-sidebar { position:static; }
}
@media (max-width: 600px) {
  .article-hero h1 { font-size:1.6rem; }
  .article-intro { padding:var(--space-4); }
}
</style>
</head>
<body>

<!-- ── NAVBAR ── -->
<nav id="navbar">
  <div class="nav-pill">
    <a href="/" class="nav-logo">
      <div class="logo-dot"></div>
      JekiStore
    </a>
    <div class="nav-divider-v"></div>
    <ul class="nav-menu">
      <li><a href="/">Beranda</a></li>
      <li><a href="/blog" class="active">Blog</a></li>
      <li><a href="/#produk">Produk</a></li>
    </ul>
    <a href="https://wa.me/6283119686482" class="nav-cta" target="_blank" rel="noopener">Order Sekarang</a>
  </div>
</nav>

<!-- ── ARTICLE HERO ── -->
<header class="article-hero">
  <div class="hero-inner">
    <div class="hero-breadcrumb">
      <a href="/">Beranda</a>
      <i class="bi bi-chevron-right"></i>
      <a href="/blog">Blog</a>
      <i class="bi bi-chevron-right"></i>
      <span>${esc(meta.categoryLabel)}</span>
    </div>
    <div class="hero-cat">
      <i class="bi ${esc(meta.categoryIcon)}"></i> ${esc(meta.categoryLabel)}
    </div>
    <h1>${esc(meta.title)}</h1>
    <div class="hero-meta">
      <span><i class="bi bi-clock"></i>${esc(meta.readTime)}</span>
      <span><i class="bi bi-calendar3"></i>${esc(meta.date)}</span>
      <span><i class="bi bi-person"></i>JekiStore</span>
    </div>
  </div>
</header>

<!-- ── ARTICLE CONTENT ── -->
<div class="article-layout">

  <article class="article-body">
    ${contentHtml}

    ${relatedHtml}
  </article>

  <aside class="article-sidebar">
    <div class="sidebar-cta">
      <p>Akses semua fitur TradingView Premium mulai dari</p>
      <div class="price-tag">Rp 185rb</div>
      <div class="price-label">per bulan · garansi aktif</div>
      <a href="https://wa.me/6283119686482" class="btn-sidebar-cta" target="_blank" rel="noopener">
        <i class="bi bi-whatsapp"></i> Order via WhatsApp
      </a>
    </div>

    <div class="sidebar-card">
      <div class="sidebar-title">Daftar Isi</div>
      <ul class="toc-list" id="toc"></ul>
    </div>
  </aside>

</div>

<!-- ── FOOTER ── -->
<footer>
  <p>© 2026 JekiStore ·
    <a href="https://jekistore.com">jekistore.com</a> ·
    <a href="/blog">Blog</a> ·
    <a href="/feedback">Feedback</a>
  </p>
  <p>Reseller resmi TradingView Premium terpercaya di Indonesia</p>
</footer>

<script>
// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Auto-build TOC dari h2 di artikel
const toc = document.getElementById('toc');
document.querySelectorAll('.article-body h2').forEach((el, i) => {
  const id = 'section-' + i;
  el.id = id;
  const li = document.createElement('li');
  li.innerHTML = '<a href="#' + id + '">' + el.textContent + '</a>';
  toc.appendChild(li);
});
if (toc.children.length === 0) {
  toc.closest('.sidebar-card').style.display = 'none';
}

// Smooth scroll untuk link anchor
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
</script>

</body>
</html>`;
}

// ── Main ─────────────────────────────────────────────────
function main() {
  // Load meta dari articles.json
  const allMeta = JSON.parse(fs.readFileSync(ARTICLES_JSON_PATH, 'utf8'));
  const publishedMeta = allMeta.filter(a => a.status === 'published');

  // Load konten dari articles-content.json
  const allContent = JSON.parse(fs.readFileSync(CONTENT_JSON_PATH, 'utf8'));
  const contentMap = {};
  allContent.forEach(c => { contentMap[c.slug] = c; });

  let generated = 0;
  let skipped = 0;

  publishedMeta.forEach(meta => {
    const content = contentMap[meta.slug];

    if (!content) {
      console.warn(`  ⚠ Konten untuk "${meta.slug}" tidak ditemukan di articles-content.json — dilewati`);
      skipped++;
      return;
    }

    // Buat folder blog/[slug]/ kalau belum ada
    const dir = path.join(OUTPUT_DIR, meta.slug);
    fs.mkdirSync(dir, { recursive: true });

    const html = buildArticlePage(meta, content, allMeta);
    const outputPath = path.join(dir, 'index.html');
    fs.writeFileSync(outputPath, html, 'utf8');

    console.log(`  ✓ blog/${meta.slug}/index.html`);
    generated++;
  });

  console.log('\n✅ Generate artikel selesai.');
  console.log(`   Artikel ter-generate  : ${generated}`);
  console.log(`   Dilewati (no content) : ${skipped}`);
  if (skipped > 0) {
    console.log(`   → Tambahkan konten untuk slug yang dilewati di articles-content.json`);
  }
  console.log('\n📁 Struktur output:');
  console.log('   blog/');
  publishedMeta.forEach(a => {
    const hasContent = !!contentMap[a.slug];
    console.log(`   └── ${a.slug}/index.html ${hasContent ? '✓' : '✗ (belum ada konten)'}`);
  });
}

main();
