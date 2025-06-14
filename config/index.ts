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
    across_the_country_id: process.env
      .NEXT_PUBLIC_ACROSS_THE_COUNTRY_ID as string,
    international_id: process.env.NEXT_PUBLIC_INTERNATIONAL_ID as string,
    entertainment_id: process.env.NEXT_PUBLIC_ENTERTAINMENT_ID as string,
    sports_id: process.env.NEXT_PUBLIC_SPORTS_ID as string,
    opinion_id: process.env.NEXT_PUBLIC_OPINION_ID as string,
    miscellaneous_id: process.env.NEXT_PUBLIC_MISCELLANEOUS_ID as string,
    lifestyle_id: process.env.NEXT_PUBLIC_LIFESTYLE_ID as string,
    technology_id: process.env.NEXT_PUBLIC_TECHNOLOGY_ID as string,
    law_and_justice_id: process.env.NEXT_PUBLIC_LAW_AND_JUSTICE_ID as string,
    expatriate_bangla_id: process.env
      .NEXT_PUBLIC_EXPATRIATE_BANGLA_ID as string,
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

export enum EnumCategoryIds {
  national = "cmb21n1870003mh98mvl9k85o", // জাতীয়
  across_the_country = "cmb21jjgj0005mhfc2lqjtaf0", // দেশজুড়ে
  international = "cmb21idgv0003mh2cmm51tw6j", // আন্তর্জাতিক
  entertainment = "cmb6j5ymk0003mhqgko5f8ol7", // বিনোদন
  sports = "cmb21g29o0003mhv06mg8p0eo", // খেলাধুলা
  opinion = "cmb21eyll0003mh3sfrtly74b", // অভিমত
  miscellaneous = "cmb21e0pn000bmhu038qiogpl", // অন্যরকম
  lifestyle = "cmb21d1wg0007mhu0bi2jacsa", // লাইফস্টাইল
  technology = "cmb21b2ac000fmhdky8zasqj8", // প্রযুক্তি
  law_and_justice = "cmb219x46000bmhdkuu8z59cw", // আইন-আদালত
  expatriate_bangla = "cmb218pdu0007mhdkoer7a3qx", // প্রবাস বাংলা
  education = "cmb2171fw0003mhdkl0j789k2", // শিক্ষা
  special_report = "cmb215hs6000fmh5sdably5xf", // বিশেষ প্রতিবেদন
  economy = "cmb1zrh9r0003mhz4ykuthdrt", // অর্থনীতি
  todays_newspaper = "cmb20jp0s0003mh301r19qr2v", // আজকের পত্রিকা
  video = "cmb214emo000bmh5splc0onne", //ভিডিও
  agriculture = "cmb21c4fd0003mhu0q9xat4eq", // কৃষি
  politics = "cmaxqech2000bmhaodnsm3yl8", // রাজনীতি
  crime = "cmb4u3i2l0005mhnk3gdk1uhl", // অপরাধ
}
