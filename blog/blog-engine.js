/**
 * ============================================================
 *  JEKISTORE BLOG ENGINE  —  blog-engine.js
 * ============================================================
 *  File ini TIDAK perlu diubah.
 *  Semua konfigurasi ada di articles.js
 * ============================================================
 */

(function () {

  // ── Helpers ──────────────────────────────────────────────

  function articleUrl(slug) {
    return '/blog/' + slug;
  }

  // Render media untuk card biasa
  function cardMedia(article) {
    const cat = CATEGORY_CONFIG[article.category] || { icon: 'bi-journal-text' };
    if (article.image) {
      return `<img src="${article.image}" alt="${article.imageAlt || article.title}" loading="lazy">`;
    }
    return `<div class="t-pattern"></div><i class="bi ${article.icon || cat.icon} t-icon"></i>`;
  }

  // Render category pill
  function catPill(article) {
    const cat = CATEGORY_CONFIG[article.category] || { label: article.category, icon: 'bi-tag' };
    return `<div class="cat-pill"><i class="bi ${cat.icon}"></i> ${cat.label}</div>`;
  }

  // ── Featured Card ─────────────────────────────────────────

  function renderFeatured() {
    const el = document.getElementById('js-featured');
    if (!el) return;
    if (el.children.length) return; // sudah di-pre-render oleh build-blog.js

    const article = ARTICLES.find(a => a.featured) || ARTICLES[0];
    if (!article) return;

    const cat = CATEGORY_CONFIG[article.category] || { label: article.category, icon: 'bi-tag' };

    const mediaHTML = article.image
      ? `<img class="f-img" src="${article.image}" alt="${article.imageAlt || article.title}" loading="eager">`
      : `<div class="f-pattern"><i class="bi ${article.icon || cat.icon || 'bi-journal-text'} f-pattern-icon"></i></div>`;

    el.innerHTML = `
      <a href="${articleUrl(article.slug)}" class="featured-wrap reveal" data-cat="${article.category}">
        ${mediaHTML}
        <div class="f-overlay"></div>
        <div class="f-body">
          <div class="f-body-left">
            <div class="f-badge"><i class="bi ${cat.icon}"></i> ${cat.label}</div>
            <div class="f-title">${article.title}</div>
            <p class="f-excerpt">${article.excerpt}</p>
            <div class="f-meta">
              <span><i class="bi bi-clock"></i> ${article.readTime} baca</span>
              <span><i class="bi bi-calendar3"></i> ${article.date}</span>
            </div>
          </div>
          <div class="f-cta">Baca Artikel <i class="bi bi-arrow-up-right"></i></div>
        </div>
      </a>`;
  }

  // ── Article Grid ──────────────────────────────────────────

  function renderGrid() {
    const el = document.getElementById('js-grid');
    if (!el) return;
    if (el.children.length) return; // sudah di-pre-render oleh build-blog.js

    const articles = ARTICLES.filter(a => !a.featured);

    el.innerHTML = articles.map(article => {
      const cat = CATEGORY_CONFIG[article.category] || { label: article.category, icon: 'bi-tag' };
      return `
      <a href="${articleUrl(article.slug)}" class="article-card reveal" data-cat="${article.category}">
        <div class="card-thumb">
          ${cardMedia(article)}
          <div class="cat-pill"><i class="bi ${cat.icon}"></i> ${cat.label}</div>
        </div>
        <div class="card-body">
          <div class="card-title">${article.title}</div>
          <p class="card-excerpt">${article.excerpt}</p>
          <div class="card-foot">
            <div class="card-meta">
              <span><i class="bi bi-clock"></i> ${article.readTime}</span>
              <span><i class="bi bi-calendar3"></i> ${article.date}</span>
            </div>
            <div class="card-arrow"><i class="bi bi-arrow-right"></i></div>
          </div>
        </div>
      </a>`;
    }).join('');
  }

  // ── Popular Sidebar ───────────────────────────────────────

  function renderPopular() {
    const el = document.getElementById('js-popular');
    if (!el) return;
    if (el.children.length) return; // sudah di-pre-render oleh build-blog.js

    const articles = ARTICLES.slice(0, 6);
    el.innerHTML = articles.map((article, i) => `
      <li>
        <a href="${articleUrl(article.slug)}" class="pop-item">
          <div class="pop-num">0${i + 1}</div>
          <div class="pop-title">${article.title}</div>
        </a>
      </li>`).join('');
  }

  // ── Schema ItemList ───────────────────────────────────────

  function renderBlogSchema() {
    const el = document.getElementById('js-schema-itemlist');
    if (!el) return;
    if (el.textContent.trim()) return; // sudah di-pre-render oleh build-blog.js

    const items = ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://jekistore.com/blog/${a.slug}`,
      "name": a.title
    }));

    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Daftar Artikel Blog JekiStore",
      "itemListElement": items
    }, null, 2);
  }

  // ── Article Page: Related ─────────────────────────────────

  function renderRelated() {
    const el = document.getElementById('js-related');
    if (!el) return;
    if (el.children.length) return; // sudah di-pre-render oleh build-blog.js

    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) return;

    const currentSlug = canonical.href.split('/blog/')[1]?.replace(/\/$/, '');
    if (!currentSlug) return;

    const current = ARTICLES.find(a => a.slug === currentSlug);
    if (!current) return;

    const sameCategory = ARTICLES.filter(a => a.slug !== currentSlug && a.category === current.category);
    const others       = ARTICLES.filter(a => a.slug !== currentSlug && a.category !== current.category);
    const related      = [...sameCategory, ...others].slice(0, 3);

    if (related.length === 0) return;

    el.innerHTML = `
      <section class="related-section">
        <h2 class="related-heading">Artikel Lainnya</h2>
        <div class="related-grid">
          ${related.map(article => `
            <a href="${articleUrl(article.slug)}" class="related-card">
              <div class="related-thumb">
                ${cardMedia(article)}
              </div>
              <div class="related-body">
                <div class="related-cat">${(CATEGORY_CONFIG[article.category] || {}).label || article.category}</div>
                <div class="related-title">${article.title}</div>
                <div class="related-meta"><i class="bi bi-clock"></i> ${article.readTime}</div>
              </div>
            </a>`).join('')}
        </div>
      </section>`;
  }

  // ── Reveal animation ──────────────────────────────────────

  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 55);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });
    reveals.forEach(el => obs.observe(el));
  }

  // ── Init ─────────────────────────────────────────────────

  function init() {
    renderFeatured();
    renderGrid();
    renderPopular();
    renderBlogSchema();
    renderRelated();
    setTimeout(initReveal, 60);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
