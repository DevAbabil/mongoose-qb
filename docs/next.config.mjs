/** @type {import('next').NextConfig} */
const nextConfig = {
  // <CHANGE> Enforce TypeScript checks during build
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  images: {
    unoptimized: true,
  },
  // <CHANGE> Enable React strict mode for development
  reactStrictMode: true,
  // <CHANGE> Turbopack will be used in next dev automatically with Latest Next.js
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
