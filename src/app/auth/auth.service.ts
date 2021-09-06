import { UnauthorizedException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { UserService } from 'src/app/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getOneByEmail(email);

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      throw new UnauthorizedException('Wrong email or password!');
    }

    return {
      id: user.id,
      username: user.username,
    };
  }
}
