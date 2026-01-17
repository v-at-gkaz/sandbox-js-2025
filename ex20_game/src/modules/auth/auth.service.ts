import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.dbService.findOne(username);
    // FIXME !
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
