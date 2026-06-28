import { formatDateId } from "@/lib/utils";
import type { Author } from "@/types/blog";
import { Clock } from "lucide-react";

interface ArticleMetaProps {
  author: Author;
  publishedAt: string;
  readingTime: number;
  /** "sm" untuk card, "md" untuk header artikel */
  size?: "sm" | "md";
}

export function ArticleMeta({
  author,
  publishedAt,
  readingTime,
  size = "sm",
}: ArticleMetaProps) {
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={`flex items-center gap-2 text-text-2 ${textSize}`}>
      {size === "md" && (
        <span className="h-7 w-7 rounded-full bg-surface-raised border border-border flex items-center justify-center font-display text-accent text-sm shrink-0">
          {author.name.charAt(0)}
        </span>
      )}
      <span className="font-medium text-text-1">{author.name}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={publishedAt}>{formatDateId(publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock size={size === "sm" ? 12 : 14} aria-hidden="true" />
        {readingTime} mnt
      </span>
    </div>
  );
}
