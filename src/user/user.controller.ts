import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import { IUserPayload } from './types/IUserPayload';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(@Query('name') name: string): Promise<IUserPayload[]> {
    if (name) return this.userService.getUsersByName(name);
    return this.userService.getAll();
  }

  @Post()
  postCreateUser(@Body() payload: IUserPayload): Promise<User> {
    return this.userService.createUser(payload);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getOneById(id);
  }

  @Put(':id')
  async putUpdateUser(
    @Param('id') id: number,
    @Body() payload: IUserPayload,
  ): Promise<User> {
    return this.userService.updateUser(id, payload);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
