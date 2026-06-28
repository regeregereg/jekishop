import Image from "next/image";
import Link from "next/link";
import { CategoryBadge } from "./CategoryBadge";
import { formatDateId } from "@/lib/utils";
import type { Article } from "@/types/blog";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  /**
   * small  — thumbnail kiri + teks kanan (default untuk list mobile)
   * medium — gambar atas + teks bawah (grid desktop)
   * large  — untuk slot hero/featured, gambar besar full-width
   */
  variant?: "small" | "medium" | "large";
}

export function ArticleCard({ article, variant = "small" }: ArticleCardProps) {
  const href = `/blog/${article.slug}`;

  if (variant === "small") {
    return (
      <Link
        href={href}
        className="group flex gap-3 py-3 first:pt-0 border-b border-border last:border-b-0"
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-surface">
          <Image
            src={article.heroImageUrl}
            alt={article.heroImageAlt}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <CategoryBadge category={article.category} size="sm" asLink={false} />
          <h3 className="mt-1.5 font-body font-semibold text-[15px] leading-snug text-text-1 line-clamp-2 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-text-2">
            <Clock size={12} aria-hidden="true" />
            <span>{article.readingTime} mnt baca</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "medium") {
    return (
      <Link href={href} className="group flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-surface">
          <Image
            src={article.heroImageUrl}
            alt={article.heroImageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3">
            <CategoryBadge category={article.category} size="sm" asLink={false} />
          </div>
        </div>
        <h3 className="mt-3 font-display text-lg leading-snug text-text-1 line-clamp-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-text-2">
          <span>{formatDateId(article.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} mnt</span>
        </div>
      </Link>
    );
  }

  // variant === "large" — dipakai oleh HeroSection, lihat komponen itu untuk konteks layout
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-hero)] bg-surface">
        <Image
          src={article.heroImageUrl}
          alt={article.heroImageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
        <div className="absolute left-4 bottom-4 right-4">
          <CategoryBadge category={article.category} size="md" asLink={false} />
          <h2 className="mt-2 font-display text-2xl leading-tight text-text-1 line-clamp-2">
            {article.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
