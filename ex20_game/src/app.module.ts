import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DatabaseModule } from './modules/database/database.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'node:path';
import { AuthModule } from './modules/auth/auth.module';

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

export const dbConfig: any = {
  type: dbType,
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPass,
  database: dbName,
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  synchronize: dbSync,
  namingStrategy: new SnakeNamingStrategy(),
};

@Module({
  imports: [
    ConfigModule.forRoot(configParams),
    TypeOrmModule.forRoot(dbConfig),
    DatabaseModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
