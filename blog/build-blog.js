#!/usr/bin/env node
/**
 * ============================================================
 *  JEKISTORE BLOG — BUILD SCRIPT
 *  build-blog.js
 * ============================================================
 *
 *  Satu-satunya build tool yang dibutuhkan blog ini sekarang.
 *  Menggantikan generate-blog.js + generate-articles.js lama
 *  (sudah dipindah ke /_legacy, skema datanya sudah tidak
 *  cocok dengan articles.js yang dipakai sekarang).
 *
 *  KENAPA INI PENTING (jangan dihapus / dilewati):
 *  blog.html dan tiap halaman artikel sebelumnya menampilkan
 *  daftar artikel & "Artikel Lainnya" SEPENUHNYA lewat JavaScript
 *  (blog-engine.js, dijalankan saat DOMContentLoaded).
 *  Googlebot bisa me-render JS, tapi mayoritas AI crawler
 *  (GPTBot, ClaudeBot, PerplexityBot, dll) TIDAK menjalankan JS —
 *  mereka hanya membaca HTML mentah. Tanpa build step ini,
 *  crawler tersebut hanya melihat halaman kosong.
 *
 *  Script ini menulis HTML hasil render langsung ke dalam
 *  blog.html dan setiap artikel, di antara marker komentar
 *  <!-- BUILD:xxx:START --> ... <!-- BUILD:xxx:END -->.
 *  blog-engine.js tetap dimuat sebagai fallback: kalau ada
 *  artikel baru yang lupa di-build, JS akan tetap mengisi
 *  kontainer yang kosong (lebih baik daripada kosong total
 *  untuk browser ber-JS), tapi hasil build statis SELALU
 *  jadi sumber utama untuk crawler.
 *
 *  CARA PAKAI:
 *    1. Edit articles.js seperti biasa (tambah/ubah artikel)
 *    2. Jalankan: node build-blog.js
 *    3. blog.html dan semua artikel ter-update otomatis
 *    4. Commit & deploy
 * ============================================================
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const SITE_URL = 'https://jekistore.com';

// ── Load articles.js data tanpa menjalankan kode browser ──
function loadArticleData() {
  const code = fs.readFileSync(path.join(DIR, 'articles.js'), 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code + '\nthis.__ARTICLES = ARTICLES; this.__CATEGORY_CONFIG = CATEGORY_CONFIG;', sandbox);
  return { ARTICLES: sandbox.__ARTICLES, CATEGORY_CONFIG: sandbox.__CATEGORY_CONFIG };
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escAttr(str) {
  return esc(str).replace(/"/g, '&quot;');
}

function articleUrl(slug) {
  return '/blog/' + slug;
}

// ── Renderers (harus identik logikanya dengan blog-engine.js) ──

function cardMedia(article, CATEGORY_CONFIG) {
  const cat = CATEGORY_CONFIG[article.category] || { icon: 'bi-journal-text' };
  if (article.image) {
    return `<img src="${escAttr(article.image)}" alt="${escAttr(article.imageAlt || article.title)}" loading="lazy">`;
  }
  return `<div class="t-pattern"></div><i class="bi ${article.icon || cat.icon} t-icon"></i>`;
}

function catPillLabel(article, CATEGORY_CONFIG) {
  return CATEGORY_CONFIG[article.category] || { label: article.category, icon: 'bi-tag' };
}

function renderFeaturedHTML(article, CATEGORY_CONFIG) {
  const cat = catPillLabel(article, CATEGORY_CONFIG);
  const mediaHTML = article.image
    ? `<img class="f-img" src="${escAttr(article.image)}" alt="${escAttr(article.imageAlt || article.title)}" loading="eager">`
    : `<div class="f-pattern"><i class="bi ${article.icon || cat.icon || 'bi-journal-text'} f-pattern-icon"></i></div>`;

  return `<a href="${articleUrl(article.slug)}" class="featured-wrap reveal" data-cat="${escAttr(article.category)}">
        ${mediaHTML}
        <div class="f-overlay"></div>
        <div class="f-body">
          <div class="f-body-left">
            <div class="f-badge"><i class="bi ${cat.icon}"></i> ${esc(cat.label)}</div>
            <div class="f-title">${esc(article.title)}</div>
            <p class="f-excerpt">${esc(article.excerpt)}</p>
            <div class="f-meta">
              <span><i class="bi bi-clock"></i> ${esc(article.readTime)} baca</span>
              <span><i class="bi bi-calendar3"></i> ${esc(article.date)}</span>
            </div>
          </div>
          <div class="f-cta">Baca Artikel <i class="bi bi-arrow-up-right"></i></div>
        </div>
      </a>`;
}

function renderGridCardHTML(article, CATEGORY_CONFIG) {
  const cat = catPillLabel(article, CATEGORY_CONFIG);
  return `<a href="${articleUrl(article.slug)}" class="article-card reveal" data-cat="${escAttr(article.category)}">
        <div class="card-thumb">
          ${cardMedia(article, CATEGORY_CONFIG)}
          <div class="cat-pill"><i class="bi ${cat.icon}"></i> ${esc(cat.label)}</div>
        </div>
        <div class="card-body">
          <div class="card-title">${esc(article.title)}</div>
          <p class="card-excerpt">${esc(article.excerpt)}</p>
          <div class="card-foot">
            <div class="card-meta">
              <span><i class="bi bi-clock"></i> ${esc(article.readTime)}</span>
              <span><i class="bi bi-calendar3"></i> ${esc(article.date)}</span>
            </div>
            <div class="card-arrow"><i class="bi bi-arrow-right"></i></div>
          </div>
        </div>
      </a>`;
}

function renderPopularItemHTML(article, i) {
  return `<li>
        <a href="${articleUrl(article.slug)}" class="pop-item">
          <div class="pop-num">0${i + 1}</div>
          <div class="pop-title">${esc(article.title)}</div>
        </a>
      </li>`;
}

function renderSchemaJSON(ARTICLES) {
  const items = ARTICLES.map((a, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "url": `${SITE_URL}/blog/${a.slug}`,
    "name": a.title
  }));
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Daftar Artikel Blog JekiStore",
    "itemListElement": items
  }, null, 2);
}

function renderRelatedHTML(currentSlug, ARTICLES, CATEGORY_CONFIG) {
  const current = ARTICLES.find(a => a.slug === currentSlug);
  if (!current) return null;

  const sameCategory = ARTICLES.filter(a => a.slug !== currentSlug && a.category === current.category);
  const others       = ARTICLES.filter(a => a.slug !== currentSlug && a.category !== current.category);
  const related      = [...sameCategory, ...others].slice(0, 3);
  if (related.length === 0) return null;

  return `<div id="js-related"><section class="related-section">
        <h2 class="related-heading">Artikel Lainnya</h2>
        <div class="related-grid">
          ${related.map(article => {
            const cat = CATEGORY_CONFIG[article.category] || {};
            return `<a href="${articleUrl(article.slug)}" class="related-card">
              <div class="related-thumb">
                ${cardMedia(article, CATEGORY_CONFIG)}
              </div>
              <div class="related-body">
                <div class="related-cat">${esc(cat.label || article.category)}</div>
                <div class="related-title">${esc(article.title)}</div>
                <div class="related-meta"><i class="bi bi-clock"></i> ${esc(article.readTime)}</div>
              </div>
            </a>`;
          }).join('')}
        </div>
      </section></div>`;
}

// ── Marker replace helper ──
function replaceBetween(content, marker, innerHTML, fname, label) {
  const startTag = `<!-- BUILD:${marker}:START -->`;
  const endTag = `<!-- BUILD:${marker}:END -->`;
  const startIdx = content.indexOf(startTag);
  const endIdx = content.indexOf(endTag);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    console.warn(`  ⚠ marker ${marker} tidak ditemukan di ${fname}, dilewati`);
    return content;
  }
  const before = content.slice(0, startIdx + startTag.length);
  const after = content.slice(endIdx);
  return `${before}\n${innerHTML}\n    ${after}`;
}

function main() {
  const { ARTICLES, CATEGORY_CONFIG } = loadArticleData();

  // Validasi dasar
  const slugs = new Set();
  ARTICLES.forEach((a, i) => {
    ['slug', 'title', 'excerpt', 'category', 'readTime', 'date', 'dateISO'].forEach(key => {
      if (!a[key]) throw new Error(`articles.js[${i}] field wajib "${key}" kosong (slug: ${a.slug || '?'})`);
    });
    if (slugs.has(a.slug)) throw new Error(`Slug duplikat: "${a.slug}"`);
    if (/[^a-z0-9-]/.test(a.slug)) throw new Error(`Slug "${a.slug}" mengandung karakter tidak valid — gunakan huruf kecil, angka, dan tanda hubung saja`);
    slugs.add(a.slug);
  });

  // ── 1. Build blog.html ──
  const blogPath = path.join(DIR, 'blog.html');
  let blogHTML = fs.readFileSync(blogPath, 'utf8');

  const featured = ARTICLES.find(a => a.featured) || ARTICLES[0];
  const gridArticles = ARTICLES.filter(a => a !== featured);
  const popularArticles = ARTICLES.slice(0, 6);

  blogHTML = replaceBetween(blogHTML, 'SCHEMA',
    `<script type="application/ld+json" id="js-schema-itemlist">\n${renderSchemaJSON(ARTICLES)}\n</script>`,
    'blog.html', 'schema');
  blogHTML = replaceBetween(blogHTML, 'FEATURED',
    `<div id="js-featured">${renderFeaturedHTML(featured, CATEGORY_CONFIG)}</div>`,
    'blog.html', 'featured');
  blogHTML = replaceBetween(blogHTML, 'GRID',
    `<div id="js-grid" style="display:contents">\n${gridArticles.map(a => '        ' + renderGridCardHTML(a, CATEGORY_CONFIG)).join('\n')}\n      </div>`,
    'blog.html', 'grid');
  blogHTML = replaceBetween(blogHTML, 'POPULAR',
    `<ul class="popular-list" id="js-popular">\n${popularArticles.map((a, i) => '        ' + renderPopularItemHTML(a, i)).join('\n')}\n      </ul>`,
    'blog.html', 'popular');

  fs.writeFileSync(blogPath, blogHTML, 'utf8');
  console.log('✅ blog.html di-build ulang (featured, grid, popular, schema — semua statis di HTML)');

  // ── 2. Build related-articles block di tiap halaman artikel ──
  let articlesBuilt = 0;
  ARTICLES.forEach(article => {
    const fpath = path.join(DIR, `${article.slug}.html`);
    if (!fs.existsSync(fpath)) {
      console.warn(`  ⚠ file ${article.slug}.html tidak ditemukan, related-articles dilewati`);
      return;
    }
    let html = fs.readFileSync(fpath, 'utf8');
    const relatedHTML = renderRelatedHTML(article.slug, ARTICLES, CATEGORY_CONFIG);
    if (!relatedHTML) return;
    const updated = replaceBetween(html, 'RELATED', relatedHTML, `${article.slug}.html`, 'related');
    if (updated !== html) {
      fs.writeFileSync(fpath, updated, 'utf8');
      articlesBuilt++;
    }
  });
  console.log(`✅ Related-articles di-build ulang untuk ${articlesBuilt} halaman artikel`);

  // ── 3. Build sitemap fragment untuk blog ──
  const sitemapEntries = [
    `  <url><loc>${SITE_URL}/blog</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`,
    ...ARTICLES.map(a => `  <url><loc>${SITE_URL}/blog/${a.slug}</loc><lastmod>${a.dateISO}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`)
  ].join('\n');
  fs.writeFileSync(path.join(DIR, 'sitemap-blog.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`, 'utf8');
  console.log('✅ sitemap-blog.xml dibuat (gabungkan ke sitemap.xml utama di root domain)');

  console.log(`\nTotal artikel: ${ARTICLES.length} | Featured: ${featured.slug}`);
}

main();
