import config from "@/config";
import { TFileDocument } from "@/types";

export default function fileObjectToLink(src: TFileDocument | string | null) {
  // Backend baseurl

  let imageSrc;

  if (src && typeof src === "object" && "path" in src) {
    imageSrc = config.aws_cdn_url + "/" + src.path;
  } else if (src && typeof src === "object" && src.originalUrl) {
    imageSrc = src.originalUrl;
  } else if (typeof src === "string") {
    imageSrc = src;
  } else if (src) {
    imageSrc = src;
  } else {
    imageSrc =
      "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.webp";
  }
  // console.log(imageSrc);

  return imageSrc as string;
}

export function getReporter(data: any): {
  type: "reporter" | "generic_reporter" | "unknown";
  data: any;
} {
  if (data?.reporter) {
    const user = Object.values(data?.reporter).filter(Boolean)[0];
    if (user && typeof user === "object" && "first_name" in user) {
      return { type: "reporter", data: user };
    }
    return { type: "reporter", data: {} };
  } else if (data?.generic_reporter) {
    return { type: "generic_reporter", data: data?.generic_reporter };
  } else {
    return { type: "unknown", data: {} };
  }
}
