import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  // Il sito ha un layout per ogni lingua: la pagina 404 comune sta in app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
