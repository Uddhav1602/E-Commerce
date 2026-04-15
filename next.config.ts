import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    // Migrated all domains to remotePatterns (domains is deprecated)
    remotePatterns: [
      { protocol: "https", hostname: "developers.google.com" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "www.bing.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.myntassets.com" },
      { protocol: "https", hostname: "tse4.mm.bing.net" },
      { protocol: "https", hostname: "example-cdn.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      // Wildcard for any https host (development convenience)
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;