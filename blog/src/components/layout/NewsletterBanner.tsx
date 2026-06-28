"use client";

import { useState, FormEvent } from "react";
import { Mail } from "lucide-react";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO Fase 3: hubungkan ke Mailchimp/Brevo (lihat dokumen §14)
    setStatus("success");
  }

  return (
    <section className="rounded-[var(--radius-card)] bg-surface border border-border px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-accent mb-1">
            <Mail size={18} />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Newsletter
            </span>
          </div>
          <h3 className="font-display text-xl text-text-1">
            Update market, langsung ke email kamu
          </h3>
          <p className="mt-1 text-sm text-text-2">
            Sekali seminggu. Tanpa spam, berhenti kapan saja.
          </p>
        </div>

        {status === "success" ? (
          <p className="text-sm text-accent font-medium">
            Terima kasih, email kamu sudah terdaftar.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="flex-1 rounded-[var(--radius-button)] border border-border bg-bg px-3.5 py-2.5 text-sm text-text-1 placeholder:text-text-3 focus:border-accent outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-[var(--radius-button)] bg-accent px-4 py-2.5 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
