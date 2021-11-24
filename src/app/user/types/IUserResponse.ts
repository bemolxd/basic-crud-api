import { Post } from 'src/db/entities/post.entity';

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  posts: Post[];
  friendsIds: string[];
  created_at: string;
  updated_at: string;
}
