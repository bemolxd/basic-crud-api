import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { validateEmail } from 'src/validation';
import { Repository } from 'typeorm';
import { IUserPayload } from './types/IUserPayload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder()
      .orderBy('id', 'DESC')
      .getMany();
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      return user;
    } catch {
      throw new NotFoundException(`User with id ${id} does not exist!`);
    }
  }

  async getUsersByName(name: string): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users.filter((user) =>
      user.username.toLowerCase().includes(name.toLowerCase()),
    );
  }

  async createUser(payload: IUserPayload): Promise<User> {
    if (!validateEmail(payload.email)) {
      throw new BadRequestException('Email is not valid');
    }

    const hashedPassword = await argon2.hash(payload.password);

    const dto = {
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
    };

    const user = this.usersRepository.create(dto);

    try {
      return this.usersRepository.save(user);
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(id: number, payload: IUserPayload): Promise<User> {
    if (!validateEmail(payload.email)) {
      throw new BadRequestException('Email is not valid');
    }
    const user = await this.getOneById(id);

    user.username = payload.username;
    user.email = payload.email;
    user.password = payload.password;

    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);

    return this.usersRepository.remove(user);
  }
}
