import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  providers: [DatabaseService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [DatabaseService],
})
export class DatabaseModule {}
