import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConfig } from './app.module';
import { join } from 'node:path';

export default new DataSource(<DataSourceOptions>{
  ...dbConfig,
  synchronize: false,
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
});
