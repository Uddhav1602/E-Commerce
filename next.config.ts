import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    domains: [
      "example-cdn.com",
      "images.unsplash.com",
      "via.placeholder.com",
      "tse4.mm.bing.net",
      "assets.myntassets.com"
    ],
  },
};

export default nextConfig;