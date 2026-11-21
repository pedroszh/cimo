import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // O projeto não usa ESLint; sem isso o build fica aguardando a configuração do lint.
  eslint: { ignoreDuringBuilds: true },
  images: {
    // AVIF primeiro (bem menor), WebP como alternativa — mesma aparência.
    formats: ["image/avif", "image/webp"],
    // Os prints e cenas não mudam com frequência: cache longo no navegador/CDN.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
};

export default nextConfig;
