"use client";

import { useState } from "react";
import { Share2, Link2, Check, X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  url: string;
  title: string;
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.4 5.09L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.1 8.1 0 0 1-4.14-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.14 8.14 0 0 1-1.25-4.31c0-4.5 3.66-8.16 8.18-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.78c0 4.5-3.67 8.16-8.16 8.16Zm4.48-6.12c-.25-.12-1.45-.71-1.67-.8-.22-.08-.39-.12-.55.12-.16.25-.63.79-.78.96-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.97-1.21-.73-.65-1.22-1.45-1.36-1.7-.14-.25-.02-.38.11-.5.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.04-.46-.08-.12-.5-1.21-.69-1.65-.18-.43-.37-.37-.5-.38-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.31-.21.25-.79.78-.79 1.89 0 1.12.81 2.2.93 2.35.11.16 1.58 2.41 3.83 3.28 1.9.74 2.28.6 2.7.56.42-.04 1.34-.55 1.53-1.08.18-.53.18-.98.13-1.08-.06-.1-.21-.16-.45-.27Z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.2 8.23L23 22h-6.9l-5.4-7.06L4.3 22H1.18l7.7-8.8L1 2h7.06l4.9 6.47L18.9 2Zm-2.42 18h1.91L7.62 4H5.6L16.48 20Z" />
    </svg>
  );
}

interface ShareOptionsListProps {
  whatsappHref: string;
  xHref: string;
  copied: boolean;
  onCopy: () => void;
}

/** Daftar opsi share, dipakai bersama oleh bottom sheet (mobile) dan popover (desktop) */
function ShareOptionsList({ whatsappHref, xHref, copied, onCopy }: ShareOptionsListProps) {
  return (
    <div className="flex flex-col gap-1">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-[var(--radius-button)] px-3 py-3 text-text-1 hover:bg-surface-raised transition-colors"
      >
        <span className="text-[#25D366]">
          <WhatsAppIcon />
        </span>
        Bagikan ke WhatsApp
      </a>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-[var(--radius-button)] px-3 py-3 text-text-1 hover:bg-surface-raised transition-colors"
      >
        <XIcon />
        Bagikan ke X
      </a>
      <button
        onClick={onCopy}
        className="flex items-center gap-3 rounded-[var(--radius-button)] px-3 py-3 text-text-1 hover:bg-surface-raised transition-colors text-left"
      >
        {copied ? <Check size={18} className="text-accent" /> : <Link2 size={18} />}
        {copied ? "Link tersalin" : "Salin link"}
      </button>
    </div>
  );
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API mungkin tidak tersedia (HTTP/permission) — diamkan saja
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="relative inline-block">
      {/* Trigger — tampil sama di semua breakpoint, perilaku beda (bottom sheet di mobile) */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-[var(--radius-button)] border border-border px-4 py-2.5 text-sm font-medium text-text-1 hover:border-accent transition-colors"
      >
        <Share2 size={16} />
        Bagikan
      </button>

      {/* Mobile: bottom sheet */}
      <div
        className={cn(
          "sm:hidden fixed inset-0 z-50 transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <button
          aria-label="Tutup"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-bg/70"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bagikan artikel"
          className={cn(
            "absolute bottom-0 left-0 right-0 rounded-t-[var(--radius-hero)] border-t border-border bg-surface p-4 pb-6 transition-transform duration-300",
            open ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-text-1">Bagikan artikel</span>
            <button onClick={() => setOpen(false)} aria-label="Tutup" className="text-text-2 p-1">
              <CloseIcon size={18} />
            </button>
          </div>
          <ShareOptionsList
            whatsappHref={whatsappHref}
            xHref={xHref}
            copied={copied}
            onCopy={handleCopy}
          />
        </div>
      </div>

      {/* Desktop: dropdown popover sederhana */}
      {open && (
        <>
          <button
            aria-label="Tutup"
            onClick={() => setOpen(false)}
            className="hidden sm:block fixed inset-0 z-40"
          />
          <div className="hidden sm:block absolute z-50 top-full left-0 mt-2 w-56 rounded-[var(--radius-card)] border border-border bg-surface p-2 shadow-xl">
            <ShareOptionsList
              whatsappHref={whatsappHref}
              xHref={xHref}
              copied={copied}
              onCopy={handleCopy}
            />
          </div>
        </>
      )}
    </div>
  );
}
