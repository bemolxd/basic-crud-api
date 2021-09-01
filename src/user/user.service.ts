import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { validateEmail } from 'src/validation';
import { Repository } from 'typeorm';
import { IUserPayload } from './types/IUserPayload';
import { IUserResponse } from './types/IUserResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<IUserResponse[]> {
    const users = await this.usersRepository
      .createQueryBuilder()
      .orderBy('id', 'DESC')
      .getMany();

    return users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async getOneById(id: number): Promise<IUserResponse> {
    try {
      return await this.usersRepository.findOneOrFail(id).then((user) => {
        const { password, ...rest } = user;
        return rest;
      });
    } catch {
      throw new NotFoundException(`User with id ${id} does not exist!`);
    }
  }

  async getUsersByName(name: string): Promise<IUserResponse[]> {
    const users = await this.usersRepository.find();
    return users
      .filter((user) =>
        user.username.toLowerCase().includes(name.toLowerCase()),
      )
      .map((user) => {
        const { password, ...rest } = user;
        return rest;
      });
  }

  // only for login
  async getOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({ email });
    } catch {
      throw new NotFoundException(`User with email ${email} does not exist!`);
    }
  }

  // only for register
  async createUser(payload: IUserPayload): Promise<IUserResponse> {
    if (!validateEmail(payload.email)) {
      throw new BadRequestException('Email is not valid');
    }

    if (this.usersRepository.findOne({ username: payload.username })) {
      throw new BadRequestException('This username is already taken!');
    }

    if (this.usersRepository.findOne({ email: payload.email })) {
      throw new BadRequestException('This email is already taken');
    }

    const hashedPassword = await argon2.hash(payload.password);

    const dto = {
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
    };

    const user = this.usersRepository.create(dto);

    try {
      this.usersRepository.save(user);
      const { password, ...rest } = user;
      return rest;
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(
    id: number,
    username: string,
    email: string,
  ): Promise<IUserResponse> {
    const user = await this.getOneById(id);

    if (!validateEmail(email)) {
      throw new BadRequestException('Email is not valid');
    }

    user.username = username;
    user.email = email;

    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<Object> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      this.usersRepository.remove(user);
      return {
        statusCode: 200,
        message: 'User deleted',
      };
    } catch {
      throw new NotFoundException(`User with id ${id} does not exist!`);
    }
  }
}
