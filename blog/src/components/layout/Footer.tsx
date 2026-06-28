import Link from "next/link";
import { categories, siteConfig } from "@/lib/site-config";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Link href="/blog" className="font-display text-xl text-text-1">
              {siteConfig.name}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-2 text-sm text-text-2">{siteConfig.description}</p>
            <Link
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Jekistore"
              className="mt-4 inline-flex items-center gap-2 text-sm text-text-2 hover:text-accent transition-colors"
            >
              <InstagramIcon size={16} />
              @jekistorecom
            </Link>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-3 mb-3">
              Kategori
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-text-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blog/kategori/${cat.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-text-3">
          © {new Date().getFullYear()} {siteConfig.name}. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
