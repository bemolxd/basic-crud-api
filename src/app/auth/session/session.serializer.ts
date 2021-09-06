import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { RequestUser } from 'src/app/types';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: RequestUser,
    done: (e: Error, user: RequestUser) => void,
  ) {
    done(null, user);
  }

  deserializeUser(payload: any, done: (e: Error, payload: any) => void) {
    done(null, payload);
  }
}
