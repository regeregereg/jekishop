import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/interactive/SearchBar";
import { CategoryFilter } from "@/components/interactive/CategoryFilter";
import { ArticleCard } from "@/components/article/ArticleCard";
import { dummyArticles } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "Cari Artikel",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;

  const results = q
    ? dummyArticles.filter((a) =>
        `${a.title} ${a.excerpt} ${a.tags.join(" ")}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      )
    : [];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-6">
          <h1 className="font-display text-2xl text-text-1 mb-4">
            Cari Artikel
          </h1>
          <SearchBar defaultValue={q} autoFocus />
        </div>

        <div className="mt-6 py-3">
          <CategoryFilter />
        </div>

        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {q && results.length === 0 && (
            <p className="text-text-2 text-sm py-8 text-center">
              Tidak ada artikel yang cocok dengan &quot;{q}&quot;. Coba kata kunci lain.
            </p>
          )}

          {!q && (
            <p className="text-text-2 text-sm py-8 text-center">
              Ketik kata kunci untuk mencari artikel.
            </p>
          )}

          {results.length > 0 && (
            <div className="flex flex-col">
              {results.map((article) => (
                <ArticleCard key={article._id} article={article} variant="small" />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
