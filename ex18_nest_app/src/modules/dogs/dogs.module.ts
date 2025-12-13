import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
  imports: [TypeOrmModule.forFeature([Dog])],
})
export class DogsModule {}
