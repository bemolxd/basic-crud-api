import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from 'src/db/entities/friendRequest.entity';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestsRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getFriendRequests(
    recipientId?: number,
    senderId?: number,
  ): Promise<FriendRequest[]> {
    if (recipientId) {
      return await this.friendRequestsRepository.find({ recipientId });
    }
    if (senderId) {
      return await this.friendRequestsRepository.find({ senderId });
    }
    return await this.friendRequestsRepository.find();
  }

  async createFriendRequest(
    recipientId: number,
    senderId: number,
  ): Promise<FriendRequest> {
    const newRequest = this.friendRequestsRepository.create({
      recipientId,
      senderId,
    });
    return await this.friendRequestsRepository.save(newRequest);
  }

  async deleteFriendRequest(id: number): Promise<Object> {
    const friendRequest = await this.friendRequestsRepository.findOne(id);
    if (!friendRequest) {
      throw new NotFoundException(
        `FriendRequest with id ${id} does not exist!`,
      );
    }
    this.friendRequestsRepository.remove(friendRequest);
    return { statusCode: 200, message: 'FriendRequest deleted' };
  }

  async addToFriends(
    requestId: number,
    senderId: number,
    recipientId: number,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ id: recipientId });
    if (!user) {
      throw new NotFoundException(
        `User with id ${recipientId} does not exist!`,
      );
    }

    try {
      await this.usersRepository.save({
        ...user,
        friendsIds: [senderId.toString()].concat(user.friendsIds),
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.deleteFriendRequest(requestId);
    } catch (error) {
      console.log(error);
    }

    return user;
  }
}
