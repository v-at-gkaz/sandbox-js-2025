import { SetMetadata } from '@nestjs/common';
import { Permission } from './permission.enum';

export const PERMS_KEY = 'perms';
export const RequirePermissions = (...perms: Permission[]) =>
  SetMetadata(PERMS_KEY, perms);
