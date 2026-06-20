# File arsip — tidak lagi dipakai

Tiga file di folder ini berasal dari arsitektur blog versi sebelumnya dan
**sudah tidak kompatibel** dengan sistem yang sekarang dipakai (`articles.js`
+ `build-blog.js`):

- `generate-blog.js` — mengharapkan file `articles.json` dengan skema field
  berbeda (`status`, `categoryLabel`, `categoryIcon`, `thumbIcon`, dst.) dan
  marker `<!-- AUTO:FEATURED:START -->` yang sudah tidak ada di `blog.html`
  saat ini. Menjalankannya akan error karena `articles.json` tidak ada.
- `generate-articles.js` — generator artikel dari blok konten JSON sederhana
  (intro/p/h2/list/table/cta). Hanya didukung 3 dari 8 artikel
  (`articles-content.json`), dan tidak men-support elemen visual yang sudah
  dipakai di artikel hand-crafted saat ini (key-points box, sidebar TOC,
  article-cta card, dll).
- `articles-content.json` — data konten untuk generator di atas, sebagian
  besar artikel (5 dari 8) tidak ada di sini sama sekali.

Disimpan di sini hanya untuk referensi sejarah. Aman dihapus permanen kapan
saja. Untuk menambah/mengubah artikel, gunakan `articles.js` +
`node build-blog.js` di root folder blog — lihat komentar di awal
`articles.js` dan `build-blog.js`.
