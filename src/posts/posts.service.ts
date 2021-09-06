import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/db/entities/post.entity';
import { Repository } from 'typeorm';
import { PostPayload, PostResponse } from './types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async getAll(): Promise<PostResponse[]> {
    return await this.postsRepository.find({ order: { created_at: 'DESC' } });
  }

  async createPost(
    authorId: number,
    payload: PostPayload,
  ): Promise<PostResponse> {
    const newPost = this.postsRepository.create({ authorId, ...payload });
    return this.postsRepository.save(newPost);
  }

  async deletePost(postId: number, userId: number): Promise<Object> {
    const post = await this.postsRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} does not exist!`);
    }

    if (post.authorId !== userId) {
      throw new UnauthorizedException(
        `User with id ${userId} has no modification rights on this post`,
      );
    }

    this.postsRepository.remove(post);

    return { statusCode: 200, message: 'Post deleted' };
  }

  async updatePost(
    postId: number,
    userId: number,
    payload: PostPayload,
  ): Promise<PostResponse> {
    const post = await this.postsRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} does not exist!`);
    }

    if (post.authorId !== userId) {
      throw new UnauthorizedException(
        `User with id ${userId} has no modification rights on this post`,
      );
    }

    return this.postsRepository.save({ ...post, ...payload });
  }
}
