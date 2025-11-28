import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  turbopack: {
    root: __dirname,
  },
  output: "export",
};

export default nextConfig;
