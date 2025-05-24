/* eslint-disable import/no-anonymous-default-export */
export default {
  host:
    process.env.NODE_ENV === "production"
      ? process.env.PUBLIC_URL_PROD
      : process.env.PUBLIC_URL,
};
