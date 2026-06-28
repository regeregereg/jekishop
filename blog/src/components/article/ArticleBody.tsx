import Image from "next/image";
import type { ArticleBlock } from "@/types/blog";
import { slugifyHeading } from "@/lib/utils";

interface ArticleBodyProps {
  blocks: ArticleBlock[];
}

/**
 * Renderer sederhana untuk ArticleBlock[]. Saat Sanity sudah aktif (Fase 4),
 * ganti dengan @portabletext/react dan pertahankan komponen-komponen kecil
 * di bawah (Paragraph, Heading2, dst.) sebagai custom components-nya,
 * supaya styling tetap konsisten — lihat catatan §15.5 dokumen planning.
 */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="article-body max-w-none text-[16px] leading-[1.7] text-text-1">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="mb-5 text-text-1">
                {block.text}
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                id={slugifyHeading(block.text)}
                className="mt-9 mb-3 font-display text-xl text-text-1 scroll-mt-20"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={i}
                id={slugifyHeading(block.text)}
                className="mt-7 mb-2 font-body font-semibold text-lg text-text-1 scroll-mt-20"
              >
                {block.text}
              </h3>
            );

          case "blockquote":
            return (
              <blockquote
                key={i}
                className="my-6 border-l-2 border-accent pl-4 italic text-text-2"
              >
                {block.text}
              </blockquote>
            );

          case "list":
            return (
              <ul key={i} className="mb-5 ml-5 list-disc space-y-1.5 text-text-1">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );

          case "image":
            return (
              <figure key={i} className="my-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-card)] bg-surface">
                  <Image
                    src={block.url}
                    alt={block.alt}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-text-3">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
