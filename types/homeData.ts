
export interface HomeData {
  serial_number: number;
  serial_update_at: string;
  news: HomeNews[];
}

export interface HomeNews {
  id: string;
  banner_image: BannerImage;
  headline: string;
  short_headline: string;
  slug: string;
  category_id: string;
  details: string;
  createdAt: string;
  updateContentAt: string;
  updatedAt: string;
  category: Category;
  url: string;
}
export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface BannerImage {
  id: string;
  caption_title: string;
  path: string;
  filename: string;
  originalUrl: string;
}
