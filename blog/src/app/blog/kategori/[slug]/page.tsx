import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryFilter } from "@/components/interactive/CategoryFilter";
import { ArticleCard } from "@/components/article/ArticleCard";
import { NewsletterBanner } from "@/components/layout/NewsletterBanner";
import { BackToTop } from "@/components/interactive/BackToTop";
import { categories } from "@/lib/site-config";
import { getArticlesByCategory } from "@/lib/dummy-data";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const articles = getArticlesByCategory(slug);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        <div className="sticky top-14 z-30 bg-bg/95 backdrop-blur-md py-3">
          <CategoryFilter />
        </div>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-3">
          <div className="flex items-baseline gap-2.5 mb-5">
            <h1 className="font-display text-2xl text-text-1">{category.name}</h1>
            <span className="text-sm text-text-2">
              {articles.length} artikel
            </span>
          </div>

          {category.description && (
            <p className="text-text-2 text-sm mb-6 max-w-lg">
              {category.description}
            </p>
          )}

          {articles.length === 0 ? (
            <p className="text-text-2 text-sm py-12 text-center">
              Belum ada artikel di kategori ini. Kembali lagi nanti.
            </p>
          ) : (
            <>
              <div className="flex flex-col sm:hidden">
                {articles.map((article) => (
                  <ArticleCard key={article._id} article={article} variant="small" />
                ))}
              </div>

              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {articles.map((article) => (
                  <ArticleCard key={article._id} article={article} variant="medium" />
                ))}
              </div>
            </>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-10 mb-12">
          <NewsletterBanner />
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
