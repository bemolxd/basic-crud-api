export interface PostResponse {
  id: number;
  author: any;
  title?: string;
  body?: string;
  images?: string[];
  created_at: string;
  updated_at: string;
}
