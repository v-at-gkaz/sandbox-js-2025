import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { DogsModule } from './modules/dogs/dogs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Dog } from './modules/dogs/entities/dog.entity';

config();
const configService = new ConfigService();

const configParams = {
  isGlobal: true,
  envFilePath: ['.env'],
};

console.log('SQL dialect >>> ', configService.get('SUBD_DB_DIALECT', 'mysql'));

const dbType: string = configService.get('SUBD_DB_DIALECT', 'mysql');
const dbHost: string = configService.get('SUBD_DB_HOST', 'localhost');
const dbPort: number = configService.get('SUBD_DB_PORT', 5432);
const dbUser: string = configService.get('SUBD_DB_USER', 'postgres');
const dbPass: string = configService.get('SUBD_DB_PASS', 'postgres');
const dbName: string = configService.get('SUBD_DB_NAME', 'postgres');
const dbSync = configService.get('SUBD_DB_SYNC', 'no') === 'yes';

const dbConfig: any = {
  type: dbType,
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPass,
  database: dbName,
  entities: [Dog],
  synchronize: dbSync,
};

@Module({
  imports: [
    ConfigModule.forRoot(configParams),
    TypeOrmModule.forRoot(dbConfig),
    CatsModule,
    DogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
