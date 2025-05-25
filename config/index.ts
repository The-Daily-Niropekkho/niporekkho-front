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
