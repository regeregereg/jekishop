/**
 * ============================================================
 *  JEKISTORE BLOG ENGINE
 *  blog-engine.js
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

  function thumbHTML(article, height) {
    if (article.image) {
      return `<img src="${article.image}" alt="${article.imageAlt || article.title}" class="thumb-img" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
    }
    const cat = CATEGORY_CONFIG[article.category] || {};
    return `<div class="thumb-pattern"></div><i class="bi ${article.icon || cat.icon || 'bi-journal-text'} thumb-icon"></i>`;
  }

  function catBadge(article) {
    const cat = CATEGORY_CONFIG[article.category] || { label: article.category, icon: 'bi-tag' };
    return `<div class="article-cat"><i class="bi ${cat.icon}"></i> ${cat.label}</div>`;
  }

  // ── Blog Index: Featured Card ─────────────────────────────

  function renderFeatured() {
    const el = document.getElementById('js-featured');
    if (!el) return;

    const article = ARTICLES.find(a => a.featured) || ARTICLES[0];
    if (!article) return;

    el.innerHTML = `
      <a href="${articleUrl(article.slug)}" class="article-featured reveal" data-cat="${article.category}">
        <div class="article-featured-thumb">
          ${thumbHTML(article)}
        </div>
        <div class="article-featured-body">
          ${catBadge(article)}
          <div class="article-title">${article.title}</div>
          <p class="article-excerpt">${article.excerpt}</p>
          <div class="article-meta">
            <span><i class="bi bi-clock"></i> ${article.readTime} baca</span>
            <span><i class="bi bi-calendar3"></i> ${article.date}</span>
            <span><i class="bi bi-star-fill" style="color:var(--green-deep)"></i> Terpopuler</span>
          </div>
          <div class="read-more">Baca Artikel <i class="bi bi-arrow-right"></i></div>
        </div>
      </a>`;
  }

  // ── Blog Index: Article Grid ──────────────────────────────

  function renderGrid() {
    const el = document.getElementById('js-grid');
    if (!el) return;

    // Semua artikel kecuali yang featured
    const articles = ARTICLES.filter(a => !a.featured);

    el.innerHTML = articles.map(article => `
      <a href="${articleUrl(article.slug)}" class="article-card reveal" data-cat="${article.category}">
        <div class="card-thumb">
          ${thumbHTML(article)}
        </div>
        <div class="card-body">
          ${catBadge(article)}
          <div class="article-title-sm">${article.title}</div>
          <p class="article-excerpt">${article.excerpt}</p>
          <div class="article-meta">
            <span><i class="bi bi-clock"></i> ${article.readTime}</span>
            <span><i class="bi bi-calendar3"></i> ${article.date}</span>
          </div>
        </div>
      </a>`).join('');
  }

  // ── Blog Index: Popular Sidebar ───────────────────────────

  function renderPopular() {
    const el = document.getElementById('js-popular');
    if (!el) return;

    // Tampilkan semua artikel live (max 6)
    const articles = ARTICLES.slice(0, 6);

    el.innerHTML = articles.map((article, i) => `
      <li>
        <a href="${articleUrl(article.slug)}" class="popular-item">
          <div class="popular-num">0${i + 1}</div>
          <div class="popular-title">${article.title}</div>
        </a>
      </li>`).join('');
  }

  // ── Blog Index: Schema ItemList ───────────────────────────

  function renderBlogSchema() {
    const el = document.getElementById('js-schema-itemlist');
    if (!el) return;

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

  // ── Article Page: Related Section ────────────────────────

  function renderRelated() {
    const el = document.getElementById('js-related');
    if (!el) return;

    // Baca slug halaman ini dari meta canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) return;

    const currentSlug = canonical.href.split('/blog/')[1]?.replace(/\/$/, '');
    if (!currentSlug) return;

    const current = ARTICLES.find(a => a.slug === currentSlug);
    if (!current) return;

    // Cari artikel relevan: sama kategori dulu, sisanya dari urutan terbaru
    // Kecualikan artikel sekarang
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
                ${thumbHTML(article)}
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

  // ── Reveal animation (untuk card yang di-render JS) ───────

  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => obs.observe(el));
  }

  // ── Filter + Search (blog index) ─────────────────────────

  function initFilter() {
    const filterBar = document.getElementById('filterBar');
    const searchInput = document.getElementById('searchInput');
    if (!filterBar && !searchInput) return;

    let currentCategory = 'semua';

    function applyFilters() {
      const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const featured = document.querySelector('.article-featured');
      const cards    = document.querySelectorAll('.article-card');

      const matches = el => {
        const inCat    = currentCategory === 'semua' || el.dataset.cat === currentCategory;
        const inSearch = !q || el.textContent.toLowerCase().includes(q);
        return inCat && inSearch;
      };

      if (featured) featured.style.display = matches(featured) ? '' : 'none';
      cards.forEach(card => { card.style.display = matches(card) ? '' : 'none'; });
    }

    if (filterBar) {
      filterBar.addEventListener('click', e => {
        const btn = e.target.closest('.filter-tag');
        if (!btn) return;
        document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.cat;
        applyFilters();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }
  }

  // ── Init ─────────────────────────────────────────────────

  function init() {
    // Blog index
    renderFeatured();
    renderGrid();
    renderPopular();
    renderBlogSchema();

    // Article page
    renderRelated();

    // UI
    setTimeout(initReveal, 50);
    initFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
