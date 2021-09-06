import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/db/entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
