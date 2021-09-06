import { Request } from 'express';

import { RequestUser } from './RequestUser';

export interface RequestObject extends Request {
  user: RequestUser;
}
