export interface ICategory {
  id: string;
  title: string;
  slug: string;
  position: number;
  position_update_at?: string | null;
  is_home?: boolean;
  position_in_home?: string | null;
  position_in_home_update_at?: string | null;
  description: string;
  meta_title: string;
  meta_description: string;
  created_by_id: string;
  image_id?: string | null;
  status: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  category_name?: string;
  news: INews[];
}

export interface INews {
  id: string;
  banner_image: IBannerImage ;
  headline: string;
  short_headline: string;
  details?: string;
  slug?: string | null;
  createdAt: string;
  updatedAt: string;
  video?: string | null;
  post_by_name?: string | null;
  post_by_image?: string | null;
}

export interface IBannerImage {
  id: string;
  url: string;
  originalUrl: string;
  mimetype: string;
  filename: string;
  modifyFileName: string;
  path: string;
  cdn: string;
  fileUniqueId?: string | undefined;
  size: number;
  platform: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  status: string;
  type: string;
  created_by_id: string;
  fileType: string;
}

export interface Ads {
  home_12?: { id: string; url: string; link: string };
  home_13?: { id: string; url: string; link: string };
  home_14?: { id: string; url: string; link: string };
}

export interface SideData {
  position: string;
  category_name: string;
  slug: string;
  category_id: string;
  status: string;
  post: {
    news_id: string;
    post_title: string;
    stitle?: string;
    excerpt?: string;
    image_large: string;
    image_thumb: string;
    encode_titl: string;
    category: string;
    category_name: string;
    post_date: string;
    video?: string | null;
    post_by_name?: string | null;
    post_by_image?: string | null;
  }[];
}

export interface NewsWithLatestProps {
  data: {
    news: INews[];
    title: string;
    slug: string;
  };
  sideData: SideData;
  ads: Ads;
  topnews: boolean;
}