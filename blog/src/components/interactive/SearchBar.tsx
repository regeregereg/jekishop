"use client";

import { Search } from "lucide-react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  defaultValue?: string;
  autoFocus?: boolean;
}

export function SearchBar({ defaultValue = "", autoFocus }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/blog/cari?q=${encodeURIComponent(value.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-3"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Cari artikel, topik, atau ticker..."
        aria-label="Cari artikel"
        className="w-full rounded-[var(--radius-button)] border border-border bg-surface py-3 pl-11 pr-4 text-[15px] text-text-1 placeholder:text-text-3 focus:border-accent outline-none"
      />
    </form>
  );
}
