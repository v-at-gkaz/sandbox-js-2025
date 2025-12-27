import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntity } from './entities/data.entity';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  imports: [TypeOrmModule.forFeature([DataEntity])],
})
export class DatabaseModule {}
