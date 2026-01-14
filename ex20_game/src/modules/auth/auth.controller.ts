import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../database/dto/sign-in.dto';
import { SignUpDto } from '../database/dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    // FIXME: !
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    // FIXME: !
    return this.authService.signUp(signUpDto.login, signUpDto.password);
  }
}
