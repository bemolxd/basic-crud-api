import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deletePost(id: number): Promise<Object> {
    try {
      const post = await this.postsRepository.findOneOrFail(id);
      this.postsRepository.remove(post);
      return {
        statusCode: 200,
        message: 'Post deleted',
      };
    } catch {
      throw new NotFoundException(`Post with id ${id} does not exist!`);
    }
  }

  async updatePost(id: number, payload: PostPayload): Promise<PostResponse> {
    try {
      const post = await this.postsRepository.findOneOrFail(id);
      return this.postsRepository.save({ ...post, ...payload });
    } catch {
      throw new NotFoundException(`Post with id ${id} does not exist!`);
    }
  }
}
