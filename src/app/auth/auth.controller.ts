import { Request, Controller, Post, UseGuards, Get } from '@nestjs/common';

import { RequestObject, RequestUser } from 'src/app/types';

import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  me(@Request() req: RequestObject): RequestUser {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestObject): RequestUser {
    return req.user;
  }

  @Get('logout')
  logout(@Request() req: RequestObject) {
    req.logOut();
    return { statusCode: 200, message: 'Logged out' };
  }
}
