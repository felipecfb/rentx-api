/* eslint-disable import/no-extraneous-dependencies */
import 'dotenv/config';

import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

function getAccessKeys(EnvVarMode: string) {
  switch (EnvVarMode) {
    case 'development':
      return {
        type: 'postgres',
        host: process.env.TYPEORM_DEV_HOST,
        port: Number(process.env.TYPEORM_DEV_PORT),
        username: process.env.TYPEORM_DEV_USERNAME,
        password: process.env.TYPEORM_DEV_PASSWORD,
        database: process.env.TYPEORM_DEV_DATABASE,
        entities: [`${process.env.TYPEORM_DEV_ENTITIES_PATH}`],
        migrations: [`${process.env.TYPEORM_DEV_MIGRATIONS_PATH}`],
        seeds: [`${process.env.TYPEORM_DEV_SEEDS_PATH}`],
        synchronize: true,
      };
    case 'production':
      return {
        type: 'postgres',
        host: process.env.TYPEORM_PROD_HOST,
        port: Number(process.env.TYPEORM_PROD_PORT),
        username: process.env.TYPEORM_PROD_USERNAME,
        password: process.env.TYPEORM_PROD_PASSWORD,
        database: process.env.TYPEORM_PROD_DATABASE,
        entities: [`${process.env.TYPEORM_PROD_ENTITIES_PATH}`],
        migrations: [`${process.env.TYPEORM_PROD_MIGRATIONS_PATH}`],
        seeds: [`${process.env.TYPEORM_PROD_SEEDS_PATH}`],
        synchronize: true,
      };
    default:
      return null;
  }
}

const setVariables = getAccessKeys(process.env.NODE_ENV);

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: setVariables.host,
  port: Number(setVariables.port),
  username: setVariables.username,
  password: setVariables.password,
  database: setVariables.database,
  entities: setVariables.entities,
  migrations: setVariables.migrations,
  seeds: setVariables.seeds,
  synchronize: true,
};

const AppDataSource = new DataSource(options);

export function createConnection(): Promise<DataSource> {
  return AppDataSource.initialize();
}

export { AppDataSource };
