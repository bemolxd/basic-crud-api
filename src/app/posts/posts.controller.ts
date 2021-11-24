import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticatedGuard } from 'src/app/auth/guards/authenticated.guard';
import { RequestObject } from 'src/app/types';

import { PostsService } from './posts.service';
import { PostPayload, PostResponse } from './types';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getAll(@Query('authorId') authorId: number): Promise<PostResponse[]> {
    if (authorId) return this.postsService.getPostsByAuthor(authorId);
    return this.postsService.getAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async createPost(
    @Body() payload: PostPayload,
    @Req() req: RequestObject,
  ): Promise<PostResponse> {
    return this.postsService.createPost(req.user.id, payload);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async deletePost(
    @Param('id') id: number,
    @Req() req: RequestObject,
  ): Promise<Object> {
    return this.postsService.deletePost(id, req.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() payload: PostPayload,
    @Req() req: RequestObject,
  ): Promise<PostResponse> {
    return this.postsService.updatePost(id, req.user.id, payload);
  }
}
