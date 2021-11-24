import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { FriendRequest } from 'src/db/entities/friendRequest.entity';
import { User } from 'src/db/entities/user.entity';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RequestObject } from '../types';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('requests')
  async getFriendRequests(
    @Query('recipientId') recipientId: number,
    @Query('senderId') senderId: number,
  ): Promise<FriendRequest[]> {
    return await this.friendsService.getFriendRequests(recipientId, senderId);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('requests')
  async createFriendRequest(
    @Body('recipientId') recipientId: number,
    @Req() req: RequestObject,
  ): Promise<FriendRequest> {
    return await this.friendsService.createFriendRequest(
      recipientId,
      req.user.id,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('requests/:id')
  async deleteFriendRequest(@Param('id') id: number): Promise<Object> {
    return await this.friendsService.deleteFriendRequest(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('addFriend')
  async addToFriends(
    @Body('requestId') requestId: number,
    @Body('recipientId') recipientId: number,
    @Body('senderId') senderId: number,
  ): Promise<User> {
    return await this.friendsService.addToFriends(
      requestId,
      senderId,
      recipientId,
    );
  }
}
