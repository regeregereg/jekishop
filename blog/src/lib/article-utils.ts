import type { ArticleBlock } from "@/types/blog";
import { slugifyHeading } from "./utils";

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Ambil semua h2/h3 dari body artikel untuk ditampilkan di Table of Contents */
export function extractHeadings(blocks: ArticleBlock[]): HeadingItem[] {
  return blocks
    .filter((b): b is { type: "h2" | "h3"; text: string } => b.type === "h2" || b.type === "h3")
    .map((b) => ({
      id: slugifyHeading(b.text),
      text: b.text,
      level: b.type === "h2" ? 2 : 3,
    }));
}
