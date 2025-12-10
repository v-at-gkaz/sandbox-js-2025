import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { DogsModule } from './modules/dogs/dogs.module';

@Module({
  imports: [CatsModule, DogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
