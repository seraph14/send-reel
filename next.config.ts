/**
 * @type {import('next').NextConfig}
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [new URL("https://placehold.co/**")],
  },
};

export default nextConfig;
