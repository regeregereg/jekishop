import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/types/blog";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="font-display text-xl text-text-1 mb-4">
        Artikel Terkait
      </h2>

      {/* Mobile: horizontal scroll carousel. Desktop: grid */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide sm:hidden -mx-4 px-4">
        {articles.map((article) => (
          <div key={article._id} className="w-[260px] shrink-0">
            <ArticleCard article={article} variant="medium" />
          </div>
        ))}
      </div>

      <div className="hidden sm:grid sm:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} variant="medium" />
        ))}
      </div>
    </section>
  );
}
