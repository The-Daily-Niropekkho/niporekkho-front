export interface NewsUtils {
  id: string;
  news_id: string;
  total_share: number;
  total_like: number;
  total_comment: number;
  total_view: number;
  news: News;
}
export interface News {
  id: string;
  headline: string;
  short_headline: string;
  publish_date: string;
  slug: string;
  category: Category;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
}