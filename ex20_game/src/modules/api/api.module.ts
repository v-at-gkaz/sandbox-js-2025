import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { GameEntity } from '../database/entities/game.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity, GameEntity])],
})
export class ApiModule {}
