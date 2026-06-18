#!/usr/bin/env node
/**
 * generate-blog.js
 * ─────────────────────────────────────────────────────────
 * Generate ulang bagian artikel di blog.html dari articles.json,
 * supaya nambah/edit/hapus artikel cukup edit 1 file JSON saja —
 * tanpa sentuh HTML, dan tanpa risiko bug konsistensi.
 *
 * Cara pakai:
 *   1. Edit articles.json (tambah/ubah artikel)
 *   2. Jalankan: node generate-blog.js
 *   3. blog.html otomatis ter-update di tempat
 *   4. Commit & push / redeploy ke Vercel
 *
 * blog.html TETAP file HTML statis murni setelah digenerate —
 * tidak ada JS runtime yang merender artikel, jadi tetap aman
 * untuk dibaca search engine & AI crawler yang tidak menjalankan JS.
 * ─────────────────────────────────────────────────────────
 */

const fs = require('fs');
const path = require('path');

const BLOG_HTML_PATH = path.join(__dirname, 'blog.html');
const ARTICLES_JSON_PATH = path.join(__dirname, 'articles.json');
const SITE_URL = 'https://jekistore.com';

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escJson(str) {
  return String(str).replace(/"/g, '\\"');
}

function loadArticles() {
  const raw = fs.readFileSync(ARTICLES_JSON_PATH, 'utf8');
  const articles = JSON.parse(raw);

  // Validasi dasar biar error ketahuan dari awal, bukan pas sudah live
  const slugs = new Set();
  articles.forEach((a, i) => {
    const required = ['slug', 'status', 'category', 'categoryLabel', 'categoryIcon', 'thumbIcon', 'title', 'excerpt', 'readTime', 'date'];
    required.forEach(key => {
      if (a[key] === undefined || a[key] === null || a[key] === '') {
        throw new Error(`articles.json[${i}] (slug: ${a.slug || '?'}) field wajib "${key}" kosong/hilang`);
      }
    });
    if (!['published', 'coming-soon'].includes(a.status)) {
      throw new Error(`articles.json[${i}] (slug: ${a.slug}) status harus "published" atau "coming-soon", ditemukan: "${a.status}"`);
    }
    if (slugs.has(a.slug)) {
      throw new Error(`Slug duplikat ditemukan: "${a.slug}". Setiap artikel butuh slug unik.`);
    }
    slugs.add(a.slug);
  });

  return articles;
}

function renderMeta(article, { comingSoonDateOverride } = {}) {
  const date = article.status === 'coming-soon' ? (comingSoonDateOverride || 'Segera hadir') : article.date;
  const badge = article.badge
    ? `\n          <span><i class="bi bi-star-fill" style="color:var(--green-deep)"></i> ${esc(article.badge)}</span>`
    : '';
  return `<span><i class="bi bi-clock"></i> ${esc(article.readTime)}</span>
            <span><i class="bi bi-calendar3"></i> ${esc(date)}</span>${badge}`;
}

function renderFeatured(article) {
  return `<a href="/blog/${esc(article.slug)}" class="article-featured reveal" data-cat="${esc(article.category)}">
      <div class="article-featured-thumb">
        <div class="thumb-pattern"></div>
        <i class="bi ${esc(article.thumbIcon)} thumb-icon"></i>
      </div>
      <div class="article-featured-body">
        <div class="article-cat"><i class="bi ${esc(article.categoryIcon)}"></i> ${esc(article.categoryLabel)}</div>
        <div class="article-title">${esc(article.title)}</div>
        <p class="article-excerpt">${esc(article.excerpt)}</p>
        <div class="article-meta">
          ${renderMeta(article)}
        </div>
        <div class="read-more">Baca Artikel <i class="bi bi-arrow-right"></i></div>
      </div>
    </a>`;
}

function renderGridCard(article) {
  const isComingSoon = article.status === 'coming-soon';
  const tag = isComingSoon ? 'div' : 'a';
  const hrefAttr = isComingSoon ? '' : ` href="/blog/${esc(article.slug)}"`;
  const classAttr = isComingSoon ? 'article-card card-coming-soon reveal' : 'article-card reveal';
  const comingBadge = isComingSoon ? '\n          <div class="coming-badge">Segera</div>' : '';

  return `<${tag}${hrefAttr} class="${classAttr}" data-cat="${esc(article.category)}">
        <div class="card-thumb">
          <div class="thumb-pattern"></div>
          <i class="bi ${esc(article.thumbIcon)} thumb-icon"></i>${comingBadge}
        </div>
        <div class="card-body">
          <div class="article-cat"><i class="bi ${esc(article.categoryIcon)}"></i> ${esc(article.categoryLabel)}</div>
          <div class="article-title-sm">${esc(article.title)}</div>
          <p class="article-excerpt">${esc(article.excerpt)}</p>
          <div class="article-meta">
            ${renderMeta(article)}
          </div>
        </div>
      </${tag}>`;
}

function renderPopularItem(article) {
  const title = esc(article.popularTitle || article.title);
  const num = String(article.popular).padStart(2, '0');
  // Dibungkus <a> supaya benar-benar bisa diklik (di versi lama cuma teks statis, tidak ada link)
  return `<li>
        <a href="/blog/${esc(article.slug)}" class="popular-item">
          <div class="popular-num">${num}</div>
          <div class="popular-title">${title}</div>
        </a>
        </li>`;
}

function renderSchema(articles) {
  const published = articles.filter(a => a.status === 'published');
  const items = published.map((a, i) =>
    `    { "@type": "ListItem", "position": ${i + 1}, "url": "${SITE_URL}/blog/${a.slug}", "name": "${escJson(a.title)}" }`
  ).join(',\n');

  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Daftar Artikel Blog JekiStore",
  "itemListElement": [
${items}
  ]
}
</script>`;
}

function replaceBetween(content, startMarker, endMarker, newInner) {
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(`Marker "${startMarker}" / "${endMarker}" tidak ditemukan atau urutannya rusak di blog.html. Jangan hapus comment marker AUTO:... saat edit manual.`);
  }
  const before = content.slice(0, startIdx + startMarker.length);
  const after = content.slice(endIdx);
  return `${before}\n${newInner}\n    ${after}`;
}

function main() {
  const articles = loadArticles();

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const gridArticles = articles.filter(a => a !== featuredArticle);
  const popularArticles = articles
    .filter(a => a.popular !== null && a.popular !== undefined && a.status === 'published')
    .sort((a, b) => a.popular - b.popular);

  let html = fs.readFileSync(BLOG_HTML_PATH, 'utf8');

  html = replaceBetween(html, '<!-- AUTO:FEATURED:START -->', '<!-- AUTO:FEATURED:END -->', '    ' + renderFeatured(featuredArticle));
  html = replaceBetween(html, '<!-- AUTO:GRID:START -->', '<!-- AUTO:GRID:END -->', gridArticles.map(a => '      ' + renderGridCard(a)).join('\n\n'));
  html = replaceBetween(html, '<!-- AUTO:POPULAR:START -->', '<!-- AUTO:POPULAR:END -->', popularArticles.map(renderPopularItem).join('\n'));
  html = replaceBetween(html, '<!-- AUTO:SCHEMA:START -->', '<!-- AUTO:SCHEMA:END -->', renderSchema(articles));

  fs.writeFileSync(BLOG_HTML_PATH, html, 'utf8');

  const counts = {
    total: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    comingSoon: articles.filter(a => a.status === 'coming-soon').length,
    popularListed: popularArticles.length,
  };

  console.log('✅ blog.html berhasil di-generate ulang.');
  console.log(`   Total artikel        : ${counts.total}`);
  console.log(`   Published (live)     : ${counts.published}`);
  console.log(`   Coming soon          : ${counts.comingSoon}`);
  console.log(`   Tampil di "Populer"  : ${counts.popularListed}`);
  console.log(`   Featured             : ${featuredArticle.slug}`);
}

main();
