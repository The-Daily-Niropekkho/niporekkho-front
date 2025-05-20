/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    domains: ["news.doptor.net", "dailyniropekkho.com"],
  },
};

module.exports = nextConfig;
