import { Request, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  me(@Request() req: any) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return req.user;
  }
}
