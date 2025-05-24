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
  env: {
    PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    PUBLIC_URL_PROD: process.env.NEXT_PUBLIC_URL_PROD,

  },
};

module.exports = nextConfig;
