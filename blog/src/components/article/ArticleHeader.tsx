import Image from "next/image";
import { CategoryBadge } from "./CategoryBadge";
import { ArticleMeta } from "./ArticleMeta";
import type { Article } from "@/types/blog";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header>
      <CategoryBadge category={article.category} size="md" />
      <h1 className="mt-3 font-display text-[26px] sm:text-4xl leading-[1.2] text-text-1">
        {article.title}
      </h1>
      <p className="mt-3 text-[15px] sm:text-lg text-text-2 leading-relaxed">
        {article.excerpt}
      </p>

      <div className="mt-4">
        <ArticleMeta
          author={article.author}
          publishedAt={article.publishedAt}
          readingTime={article.readingTime}
          size="md"
        />
      </div>

      <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-hero)] bg-surface">
        <Image
          src={article.heroImageUrl}
          alt={article.heroImageAlt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          priority
          className="object-cover"
        />
      </div>
    </header>
  );
}
