import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (e: Error, user: any) => void): any {
    done(null, user);
  }

  deserializeUser(payload: any, done: (e: Error, payload: any) => void): any {
    done(null, payload);
  }
}
