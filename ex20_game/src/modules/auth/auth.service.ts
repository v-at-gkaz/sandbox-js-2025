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

  signIn(user: any): any {
    const payload = { username: user.login, sub: user.id };
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

  async validateUser(username: string, pass: string) {
    const user = await this.dbService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
