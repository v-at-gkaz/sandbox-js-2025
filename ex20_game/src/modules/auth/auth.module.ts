import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
config();
const configService = new ConfigService();

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: configService.get('JWT_SECRET', 'secret'),
      signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN', '30s') },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
