import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/article/HeroSection";
import { CategoryFilter } from "@/components/interactive/CategoryFilter";
import { ArticleCard } from "@/components/article/ArticleCard";
import { NewsletterBanner } from "@/components/layout/NewsletterBanner";
import { BackToTop } from "@/components/interactive/BackToTop";
import { dummyArticles, dummyFeaturedArticles } from "@/lib/dummy-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Blog",
  description: siteConfig.description,
};

export default function BlogHomePage() {
  const featured = dummyFeaturedArticles[0] ?? dummyArticles[0];
  const rest = dummyArticles.filter((a) => a._id !== featured._id);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-5">
          <HeroSection article={featured} />
        </div>

        <div className="mt-7 sticky top-14 z-30 bg-bg/95 backdrop-blur-md py-3">
          <CategoryFilter />
        </div>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-2">
          <h2 className="font-display text-xl text-text-1 mb-3">
            Artikel Terbaru
          </h2>

          {/* Mobile: list view. Desktop: grid 3 kolom */}
          <div className="flex flex-col sm:hidden">
            {rest.map((article) => (
              <ArticleCard key={article._id} article={article} variant="small" />
            ))}
          </div>

          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {rest.map((article) => (
              <ArticleCard key={article._id} article={article} variant="medium" />
            ))}
          </div>
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
