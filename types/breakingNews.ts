
export interface BreakingNews {
  id: string;
  news_id: string;
  serial_number: number;
  serial_update_at: string | null;
  is_top_breaking_news: boolean;
  top_serial_number: number | null;
  top_serial_update_at: string | null;
  created_by_id: string;
  is_deleted: boolean;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  news: BNews;
}
export interface BNews {
  short_headline: string;
  headline: string;
  id: string;
  slug: string | null;
}
