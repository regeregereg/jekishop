import Link from "next/link";

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/blog/tag/${tag}`}
            className="inline-block rounded-[var(--radius-pill)] border border-border px-3 py-1.5 text-sm text-text-2 hover:border-accent hover:text-accent transition-colors"
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
