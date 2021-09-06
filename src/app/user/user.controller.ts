import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedGuard } from 'src/app/auth/guards/authenticated.guard';

import { IUserPayload } from './types/IUserPayload';
import { IUserResponse } from './types/IUserResponse';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getAll(@Query('name') name: string): Promise<IUserResponse[]> {
    if (name) return this.userService.getUsersByName(name);
    return this.userService.getAll();
  }

  @Post()
  postCreateUser(@Body() payload: IUserPayload): Promise<IUserResponse> {
    return this.userService.createUser(payload);
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<IUserResponse> {
    return this.userService.getOneById(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async putUpdateUser(
    @Param('id') id: number,
    @Body() username: string,
    @Body() email: string,
  ): Promise<IUserResponse> {
    return this.userService.updateUser(id, username, email);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<Object> {
    return this.userService.deleteUser(id);
  }
}