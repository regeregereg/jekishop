import { cn } from "@/lib/utils";
import type { Category } from "@/types/blog";
import Link from "next/link";

interface CategoryBadgeProps {
  category: Pick<Category, "name" | "slug" | "color">;
  /** "sm" untuk overlay di atas gambar, "md" untuk inline di header artikel */
  size?: "sm" | "md";
  /** Jika true, badge jadi link ke halaman kategori */
  asLink?: boolean;
  className?: string;
}

export function CategoryBadge({
  category,
  size = "sm",
  asLink = true,
  className,
}: CategoryBadgeProps) {
  const classes = cn(
    "inline-flex items-center font-body font-semibold uppercase tracking-wide rounded-[var(--radius-pill)] transition-colors",
    size === "sm" ? "text-[11px] px-2.5 py-1" : "text-xs px-3 py-1.5",
    className,
  );

  const style = {
    backgroundColor: `${category.color}1a`, // ~10% opacity tint
    color: category.color,
  };

  if (asLink) {
    return (
      <Link
        href={`/blog/kategori/${category.slug}`}
        className={cn(classes, "hover:brightness-110")}
        style={style}
      >
        {category.name}
      </Link>
    );
  }

  return (
    <span className={classes} style={style}>
      {category.name}
    </span>
  );
}
