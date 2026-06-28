"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { categories, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Kunci scroll body saat drawer terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <button
        aria-label="Tutup menu"
        onClick={onClose}
        className="absolute inset-0 bg-bg/70"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={cn(
          "absolute right-0 top-0 h-full w-[78%] max-w-xs bg-surface border-l border-border transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="font-display text-lg text-text-1">Menu</span>
          <button
            onClick={onClose}
            aria-label="Tutup menu"
            className="p-1.5 text-text-2 hover:text-text-1"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-3 mb-2">
            Kategori
          </p>
          <ul className="flex flex-col">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/blog/kategori/${cat.slug}`}
                  onClick={onClose}
                  className="block py-3 text-text-1 font-medium border-b border-border hover:text-accent transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-5 py-4 border-t border-border text-xs text-text-3">
          {siteConfig.blogName} oleh {siteConfig.name}
        </div>
      </div>
    </div>
  );
}
