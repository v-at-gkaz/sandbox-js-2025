import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../database/dto/sign-up.dto';

// import { AuthGuard } from './auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './rbac/roles.decorator';
import { Role } from './rbac/role.enum';
import { RolesGuard } from './rbac/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    // FIXME: !
    return this.authService.signUp(signUpDto.login, signUpDto.password);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @Roles(Role.Admin, Role.User)
  getProfile(@Request() req) {
    return req.user;
  }
}
