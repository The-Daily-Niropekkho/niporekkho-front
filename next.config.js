/** @type {import('next').NextConfig} */
const nextConfig = {
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
    AWS_BASE_URL: process.env.AWS_BASE_URL,
    AWS_BASE_URL_PROD: process.env.AWS_BASE_URL_PROD,
    AWS_CDN: process.env.AWS_CDN_URL,
    NATIONAL_ID: process.env.NEXT_PUBLIC_NATIONAL_ID,
    ACROSS_THE_COUNTRY_ID: process.env.NEXT_PUBLIC_ACROSS_THE_COUNTRY_ID,
    INTERNATIONAL_ID: process.env.NEXT_PUBLIC_INTERNATIONAL_ID,
    ENTERTAINMENT_ID: process.env.NEXT_PUBLIC_ENTERTAINMENT_ID,
    SPORTS_ID: process.env.NEXT_PUBLIC_SPORTS_ID,
    OPINION_ID: process.env.NEXT_PUBLIC_OPINION_ID,
    MISCELLANEOUS_ID: process.env.NEXT_PUBLIC_MISCELLANEOUS_ID,
    LIFESTYLE_ID: process.env.NEXT_PUBLIC_LIFESTYLE_ID,
    TECHNOLOGY_ID: process.env.NEXT_PUBLIC_TECHNOLOGY_ID,
    LAW_AND_JUSTICE_ID: process.env.NEXT_PUBLIC_LAW_AND_JUSTICE_ID,
    EXPATRIATE_BANGLA_ID: process.env.NEXT_PUBLIC_EXPATRIATE_BANGLA_ID,
    EDUCATION_ID: process.env.NEXT_PUBLIC_EDUCATION_ID,
    SPECIAL_REPORT_ID: process.env.NEXT_PUBLIC_SPECIAL_REPORT_ID,
    ECONOMY_ID: process.env.NEXT_PUBLIC_ECONOMY_ID,
    TODAYS_NEWSPAPER_ID: process.env.NEXT_PUBLIC_TODAYS_NEWSPAPER_ID,
    VIDEO_ID: process.env.NEXT_PUBLIC_VIDEO_ID,
    AGRICULTURE_ID: process.env.NEXT_PUBLIC_AGRICULTURE_ID,
    POLITICS_ID: process.env.NEXT_PUBLIC_POLITICS_ID,
    CITIES_ID: process.env.NEXT_PUBLIC_CITIES_ID,
  },
};

module.exports = nextConfig;
