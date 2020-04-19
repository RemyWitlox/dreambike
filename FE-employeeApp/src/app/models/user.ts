import { Role } from './role';

export class User {
  id: number;
  name: string;
  username: string;
  password: string;
  role: Role;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  expiryDuration?: Date;
}
