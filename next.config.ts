import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  // Genera i PDF dei Termini e del DPA in Node, senza passare dal bundler.
  serverExternalPackages: ["@react-pdf/renderer"],
  // Niente export statico: il middleware (lingua della home in base al paese) deve girare su Vercel.
  // Le pagine restano comunque generate in anticipo. Per i controlli: npm run verifica.
  // Il sito ha un layout per ogni lingua: la pagina 404 comune sta in app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
