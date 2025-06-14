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
  todays_newspaper = "cmb20jp0s0003mh301r19qr2v", // আজকের পত্রিকা
  latest_news = "cmb4ox5r3000vmhrct1r6u001", // সর্বশেষ
  national = "cmb21n1870003mh98mvl9k85o", // জাতীয়
  politics = "cmaxqech2000bmhaodnsm3yl8", // রাজনীতি
  international = "cmb21idgv0003mh2cmm51tw6j", // আন্তর্জাতিক
  across_the_country = "cmb21jjgj0005mhfc2lqjtaf0", // দেশজুড়ে
  economy = "cmb1zrh9r0003mhz4ykuthdrt", // অর্থনীতি
  special_report = "cmb215hs6000fmh5sdably5xf", // বিশেষ প্রতিবেদন
  sports = "cmb21g29o0003mhv06mg8p0eo", // খেলাধুলা
  video = "cmb214emo000bmh5splc0onne", //ভিডিও
  education = "cmb2171fw0003mhdkl0j789k2", // শিক্ষা
  law_and_justice = "cmb219x46000bmhdkuu8z59cw", // আইন-আদালত
  agriculture = "cmb21c4fd0003mhu0q9xat4eq", // কৃষি সংবাদ
  expatriate_bangla = "cmb218pdu0007mhdkoer7a3qx", // প্রবাস বাংলা
  technology = "cmb21b2ac000fmhdky8zasqj8", // প্রযুক্তি
  lifestyle = "cmb21d1wg0007mhu0bi2jacsa", // লাইফস্টাইল
  others = "cmb21e0pn000bmhu038qiogpl", // অন্যরকম
  opinion = "cmb21eyll0003mh3sfrtly74b", //অভিমত
  job = "cmb4ofw6n000rmhrc9s6uaree", //চাকরি
  photo = "cmb4oio11000tmhrcxlm8upz3", //ছবি
  capital = "cmb4oyrc1000xmhrcr502d8gb", //রাজধানী
  industry_trade = "cmb4ozyss000zmhrc8vytjubs", // শিল্প-বাণিজ্য
  archive = "cmb4p1djh0011mhrcedswbm4h", // আর্কাইভ
  special_ayojon = "cmb4p391e0013mhrcx9k4f6k0", //বিশেষ আয়োজন
  shilpomoncho = "cmb4p48bj0015mhrcu7k1nztc", // শিল্পমঞ্চ
  share_bazar = "cmb4p4wa20017mhrcql3w3v40", //শেয়ারবাজার
  interview = "cmb4p6d2y0019mhrc2zq6cms8", // সাক্ষাৎকার
  travel = "cmb4p75bc001bmhrc6skd1glz", //ভ্রমণ
  sahitto_and_sangskriti = "cmb4p9wud001dmhrcx4mwo1ym", // সাহিত্য ও সংস্কৃতি
  bangladesh = "cmb4paj3p001fmhrctspx9ry4", // বাংলাদেশ
  feature = "cmb4u23a10001mhnkzun1d9ap", //ফিচার
  offbit = "cmb4u2qd00003mhnkc79epw1e", //অফবিট
  crime = "cmb4u3i2l0005mhnk3gdk1uhl", //অপরাধ
  entertainment = "cmb6j5ymk0003mhqgko5f8ol7", // বিনোদন
}