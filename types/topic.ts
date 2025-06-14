export interface Topic {
  id: string;
  title: string;
  category_id: string;
  slug: string;
  position: number;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_by_id: string;
  image_id: string | null;
  status: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TResponseRedux<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}
