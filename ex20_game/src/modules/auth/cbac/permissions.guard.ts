import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from './permission.enum';
import { PERMS_KEY } from './require-permissions.decorator';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly dbService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPerms = this.reflector.getAllAndOverride<Permission[]>(
      PERMS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPerms) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();

    return await this.dbService.isUserHasPermission(user, requiredPerms);
  }
}
