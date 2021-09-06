import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostPayload, PostResponse } from './types';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<PostResponse[]> {
    return this.postsService.getAll();
  }

  @Post()
  async createPost(
    @Body() payload: PostPayload,
    @Req() req: any,
  ): Promise<PostResponse> {
    return this.postsService.createPost(req.user.id, payload);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<Object> {
    return this.postsService.deletePost(id);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() payload: PostPayload,
  ): Promise<PostResponse> {
    return this.postsService.updatePost(id, payload);
  }
}
