import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../auth/rbac/role.enum';
import { Permission } from '../auth/cbac/permission.enum';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findOne(username: string) {
    return this.usersRepository.findOne({
      where: { login: username },
    });
  }

  createUser(username: string, pass: string): Promise<UserEntity> {
    return this.usersRepository.save(
      this.usersRepository.create({
        login: username,
        password: pass,
        isActive: true,
      }),
    );
  }

  async isUserHasAccess(user: any, requiredRoles: Role[]) {
    try {
      const foundUser = await this.usersRepository.findOneBy({ id: user.id });

      if (!foundUser) {
        return false;
      }

      return (
        foundUser.isActive &&
        ((foundUser.isAdmin && requiredRoles.includes(Role.Admin)) ||
          (!foundUser.isAdmin && requiredRoles.includes(Role.User)))
      );
    } catch (e) {
      return false;
    }
  }

  async isUserHasPermission(user: any, requiredPerms: Permission[]) {
    try {
      const foundUser = await this.usersRepository.findOneBy({ id: user.id });

      if (!foundUser) {
        return false;
      }

      if (!foundUser.isActive) {
        return false;
      }

      if (foundUser.isAdmin) {
        return requiredPerms.some((perm: Permission) => {
          return [
            Permission.LIST_USERS,
            Permission.CREATE_USERS,
            Permission.UPDATE_USERS,
            Permission.DELETE_USERS,
            Permission.CHANGE_OWN_NAME,
            Permission.CHANGE_OWN_PASSWORD,
            Permission.CHANGE_PASSWORD,
          ].includes(perm);
        });
      } else {
        return requiredPerms.some((perm: Permission) => {
          return [
            Permission.CHANGE_OWN_NAME,
            Permission.CHANGE_OWN_PASSWORD,
          ].includes(perm);
        });
      }
    } catch (e) {
      return false;
    }
  }
}
