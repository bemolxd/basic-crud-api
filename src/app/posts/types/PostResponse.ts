import { User } from 'src/db/entities/user.entity';

export interface PostResponse {
  id: number;
  author: User;
  authorId: number;
  title?: string;
  body?: string;
  images?: string[];
  created_at: string;
  updated_at: string;
}
