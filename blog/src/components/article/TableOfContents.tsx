"use client";

import { useState } from "react";
import { ChevronDown, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeadingItem } from "@/lib/article-utils";

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-text-1">
          <List size={16} className="text-accent" />
          Daftar Isi
        </span>
        <ChevronDown
          size={18}
          className={cn("text-text-2 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <nav aria-label="Daftar isi artikel" className="px-4 pb-4">
          <ul className="space-y-2">
            {headings.map((h) => (
              <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setOpen(false)}
                  className="text-sm text-text-2 hover:text-accent transition-colors"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
