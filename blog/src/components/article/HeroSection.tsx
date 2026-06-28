import Image from "next/image";
import Link from "next/link";
import { CategoryBadge } from "../article/CategoryBadge";
import { ArticleMeta } from "../article/ArticleMeta";
import type { Article } from "@/types/blog";

interface HeroSectionProps {
  article: Article;
}

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <div className="relative aspect-[4/5] sm:aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-hero)] bg-surface">
        <Image
          src={article.heroImageUrl}
          alt={article.heroImageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
          <CategoryBadge category={article.category} size="md" asLink={false} />
          <h1 className="mt-3 font-display text-[28px] sm:text-4xl leading-[1.15] text-text-1 line-clamp-2 max-w-2xl">
            {article.title}
          </h1>
          <p className="mt-2 hidden sm:block text-text-2 text-sm max-w-lg line-clamp-2">
            {article.excerpt}
          </p>
          <div className="mt-3">
            <ArticleMeta
              author={article.author}
              publishedAt={article.publishedAt}
              readingTime={article.readingTime}
              size="sm"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
