import * as mysqlDriver from 'mysql';
import { DataSourceOptions } from 'typeorm';
export function getConfig() {
  return {
    driver: mysqlDriver,
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'm4nc3',
    password: 'kazkas',
    database: 'nestjs_ababa_app',
    synchronize: false,
    migrations: ['./src/database//migrations/*.{ts,js}'],
    entities: [__dirname + '/../**/entity/*.{ts,js}'],
  } as DataSourceOptions;
}
