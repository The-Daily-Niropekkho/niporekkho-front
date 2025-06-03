import { TFileDocument } from "./global";


export interface NewsDetails {
  id: string;
  category_id: string;
  headline: string;
  short_headline: string;
  slug: string;
  category_serial: number;
  home_serial: number;
  publish_date: string;
  details: string;
  details_html: string;
  media_type: string;
  excerpt: string;
  banner_image_id: string;
  reference: string;
  tags: any;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_card: string;
  schema_markup: string;
  country_id: number;
  division_id: number;
  district_id: number;
  upazilla_id: number;
  union_id: number;
  is_scheduled: boolean;
  is_breaking: boolean;
  is_featured: boolean;
  status: string;
  is_deleted: boolean;
  reporter_id: string;
  created_by_id: string;
  createdAt: string;
  updatedAt: string;
  updateContentAt: string;
  reporter: Reporter;
  country: Country;
  district: District;
  division: Division;
  upazilla: Upazilla;
  union: Union;
  banner_image: BannerImage;
  category: Category;
  allTopics: AllTopic[];
}

export interface Reporter {
  admin: any;
  writer: Writer;
}

export interface Writer {
  first_name: string;
  last_name: string;
  nick_name: string;
  profile_image: ProfileImage;
}

export interface ProfileImage {
  id: string;
  url: string;
  originalUrl: string;
  mimetype: string;
  filename: string;
  modifyFileName: string;
  path: string;
  cdn: string;
  fileUniqueId: any;
  size: number;
  platform: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  status: string;
  type: string;
  created_by_id: any;
}

export interface Country {
  name: string;
  bn_name: string;
}

export interface District {
  name: string;
  bn_name: string;
}

export interface Division {
  name: string;
  bn_name: string;
}

export interface Upazilla {
  name: string;
  bn_name: string;
}

export interface Union {
  name: string;
  bn_name: string;
}

export interface BannerImage extends TFileDocument {
  id: string;
  url: string;
  originalUrl: string;
  mimetype: string;
  filename: string;
  modifyFileName: string;
  path: string;
  cdn: string;
  fileUniqueId: any;
  size: number;
  platform: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  status: string;
  type: string;
  created_by_id: string;
  caption_title: string;
}

export interface Category {
  id: string;
  image: Image;
  slug: string;
  title: string;
}

export interface Image {
  id: string;
  url: string;
  originalUrl: string;
  mimetype: string;
  filename: string;
  modifyFileName: string;
  path: string;
  cdn: string;
  fileUniqueId: any;
  size: number;
  platform: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  status: string;
  type: string;
  created_by_id: string;
}

export interface AllTopic {
  id: string;
  title: string;
  slug: string;
  position: number;
  description: any;
  meta_title: any;
  meta_description: any;
  created_by_id: string;
  image_id: any;
  status: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}


