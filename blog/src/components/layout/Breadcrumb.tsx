import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-text-2 overflow-x-auto scrollbar-hide">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5 shrink-0">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-accent transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className="text-text-1 whitespace-nowrap max-w-[160px] truncate"
              >
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight size={14} aria-hidden="true" />}
          </span>
        );
      })}
    </nav>
  );
}
