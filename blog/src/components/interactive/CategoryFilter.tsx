"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/site-config";

export function CategoryFilter() {
  const pathname = usePathname();

  const items = [
    { name: "Semua", slug: null },
    ...categories.map((c) => ({ name: c.name, slug: c.slug })),
  ];

  return (
    <nav
      aria-label="Filter kategori"
      className="flex gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-6 -mx-4 sm:-mx-6"
    >
      {items.map((item) => {
        const href = item.slug ? `/blog/kategori/${item.slug}` : "/blog";
        const isActive = item.slug
          ? pathname === href
          : pathname === "/blog";

        return (
          <Link
            key={item.name}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-[var(--radius-pill)] px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border",
              isActive
                ? "bg-accent text-bg border-accent"
                : "bg-transparent text-text-2 border-border hover:border-text-2 hover:text-text-1",
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
