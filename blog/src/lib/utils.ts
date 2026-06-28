import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const monthsId = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/** Format "2026-06-20" -> "20 Juni 2026" */
export function formatDateId(isoDate: string): string {
  const d = new Date(isoDate);
  return `${d.getDate()} ${monthsId[d.getMonth()]} ${d.getFullYear()}`;
}

/** Ubah teks heading jadi id yang aman untuk anchor link (#id) dan TOC */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
