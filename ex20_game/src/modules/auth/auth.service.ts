import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DatabaseService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.dbService.findOne(username);
    // FIXME !
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  async signUp(username: string, pass: string): Promise<any> {
    const found = await this.dbService.findOne(username);
    // FIXME !
    if (found) {
      throw new ConflictException();
    }

    try {
      const createdUser = await this.dbService.createUser(username, pass);
      const { password, ...result } = createdUser;
      return result;
    } catch (e) {
      // FIXME !
      throw new InternalServerErrorException();
    }
  }
}
