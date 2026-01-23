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
import { PermissionsGuard } from './cbac/permissions.guard';
import { RequirePermissions } from './cbac/require-permissions.decorator';
import { Permission } from './cbac/permission.enum';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile1')
  @Roles(Role.Admin)
  getProfile1(@Request() req) {
    return {
      path: 'profile1',
      payload: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile2')
  @Roles(Role.User)
  getProfile2(@Request() req) {
    return {
      path: 'profile2',
      payload: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile3')
  getProfile3(@Request() req) {
    return {
      path: 'profile3',
      payload: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile4')
  getProfile4(@Request() req) {
    return {
      path: 'profile4',
      payload: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @Get('users-list')
  @RequirePermissions(Permission.LIST_USERS, Permission.CREATE_USERS)
  getUsersList(@Request() req) {
    return {
      path: 'users-list',
      payload: ['fixme'],
    };
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @Post('change-my-name')
  @RequirePermissions(Permission.CHANGE_OWN_NAME)
  chengeUserName(@Body() body) {
    return {
      path: 'change-my-name',
      payload: ['fixme'],
    };
  }
}
