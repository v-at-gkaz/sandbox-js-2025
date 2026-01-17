import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();
const configService = new ConfigService();

@Module({
  providers: [AuthService],
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
