/* eslint-disable import/no-anonymous-default-export */
export default {
  host:
    process.env.NODE_ENV === "production"
      ? process.env.PUBLIC_URL_PROD
      : process.env.PUBLIC_URL,
  host_aws:
    process.env.NODE_ENV === "production"
      ? process.env.AWS_BASE_URL_PROD
      : process.env.AWS_BASE_URL,
  aws_cdn_url: process.env.AWS_CDN,

  allCategories: {
    national_id: process.env.NEXT_PUBLIC_NATIONAL_ID as string,
    across_the_country_id: process.env.NEXT_PUBLIC_ACROSS_THE_COUNTRY_ID as string,
    international_id: process.env.NEXT_PUBLIC_INTERNATIONAL_ID as string,
    entertainment_id: process.env.NEXT_PUBLIC_ENTERTAINMENT_ID as string,
    sports_id: process.env.NEXT_PUBLIC_SPORTS_ID as string,
    opinion_id: process.env.NEXT_PUBLIC_OPINION_ID as string,
    miscellaneous_id: process.env.NEXT_PUBLIC_MISCELLANEOUS_ID as string,
    lifestyle_id: process.env.NEXT_PUBLIC_LIFESTYLE_ID as string,
    technology_id: process.env.NEXT_PUBLIC_TECHNOLOGY_ID as string,
    law_and_justice_id: process.env.NEXT_PUBLIC_LAW_AND_JUSTICE_ID as string,
    expatriate_bangla_id: process.env.NEXT_PUBLIC_EXPATRIATE_BANGLA_ID as string,
    education_id: process.env.NEXT_PUBLIC_EDUCATION_ID as string,
    special_report_id: process.env.NEXT_PUBLIC_SPECIAL_REPORT_ID as string,
    economy_id: process.env.NEXT_PUBLIC_ECONOMY_ID as string,
    todays_newspaper_id: process.env.NEXT_PUBLIC_TODAYS_NEWSPAPER_ID as string,
    video_id: process.env.NEXT_PUBLIC_VIDEO_ID as string,
    agriculture_id: process.env.NEXT_PUBLIC_AGRICULTURE_ID as string,
    politics_id: process.env.NEXT_PUBLIC_POLITICS_ID as string,
    cities_id: process.env.NEXT_PUBLIC_CITIES_ID as string,
  },
};

/* eslint-disable import/no-anonymous-default-export */
// export default {
//   host:
//     process.env.NODE_ENV === "production"
//       ? process.env.BASE_URL_PROD
//       : process.env.BASE_URL,
//   host_aws:
//     process.env.NODE_ENV === "production"
//       ? process.env.AWS_BASE_URL_PROD
//       : process.env.AWS_BASE_URL,
//   aws_cdn_url: process.env.AWS_CDN,
// };
