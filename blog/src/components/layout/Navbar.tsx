"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, ArrowLeft } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { siteConfig } from "@/lib/site-config";

interface NavbarProps {
  /** Tampilkan back arrow alih-alih logo — dipakai di halaman artikel detail */
  showBackButton?: boolean;
}

export function Navbar({ showBackButton = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          {showBackButton ? (
            <Link
              href="/blog"
              aria-label="Kembali ke blog"
              className="flex items-center gap-2 text-text-1"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Kembali</span>
            </Link>
          ) : (
            <Link href="/blog" className="font-display text-xl text-text-1">
              {siteConfig.name}
              <span className="text-accent">.</span>
            </Link>
          )}

          <div className="flex items-center gap-1">
            <Link
              href="/blog/cari"
              aria-label="Cari artikel"
              className="rounded-[var(--radius-button)] p-2 text-text-1 hover:bg-surface transition-colors"
            >
              <Search size={20} />
            </Link>
            <button
              aria-label="Buka menu"
              onClick={() => setMenuOpen(true)}
              className="rounded-[var(--radius-button)] p-2 text-text-1 hover:bg-surface transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
