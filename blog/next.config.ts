import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder SVG lokal untuk Fase 1 (sebelum Sanity CDN tersambung)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
