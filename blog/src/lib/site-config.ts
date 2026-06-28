export const siteConfig = {
  name: "Jekistore",
  blogName: "Jekistore Journal",
  description:
    "Wawasan trading, market, dan keuangan untuk trader Indonesia — ditulis jujur, tanpa drama.",
  url: "https://jekistore.com",
  ogImage: "https://jekistore.com/og-default.jpg",
  links: {
    instagram: "https://instagram.com/jekistorecom",
  },
} as const;

export const categories = [
  {
    _id: "cat-trading",
    name: "Trading",
    slug: "trading",
    description: "Analisis pasar, strategi, dan psikologi trading.",
    color: "#F5C518",
  },
  {
    _id: "cat-market",
    name: "Market",
    slug: "market",
    description: "Berita dan update pasar terkini.",
    color: "#5BD0F0",
  },
  {
    _id: "cat-keuangan",
    name: "Keuangan",
    slug: "keuangan",
    description: "Literasi finansial dan investasi.",
    color: "#7CDB8A",
  },
  {
    _id: "cat-inspirasi",
    name: "Inspirasi",
    slug: "inspirasi",
    description: "Kisah trader sukses dan mindset.",
    color: "#E0789A",
  },
  {
    _id: "cat-tutorial",
    name: "Tutorial",
    slug: "tutorial",
    description: "Panduan penggunaan tools trading.",
    color: "#B79CF0",
  },
  {
    _id: "cat-trending",
    name: "Trending",
    slug: "trending",
    description: "Topik yang sedang ramai dibahas komunitas trader.",
    color: "#F5C518",
  },
] as const;
