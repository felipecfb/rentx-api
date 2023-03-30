import 'dotenv/config';

import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const database =
  process.env.NODE_ENV === 'test'
    ? 'db_rentx_test'
    : process.env.TYPEORM_DATABASE;

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: database,
  entities: ['./src/modules/**/entities/*.{ts,js}'],
  migrations: ['./src/shared/**/migrations/*.{ts,js}'],
  seeds: ['./src/shared/infra/typeorm/seeds/UserAdminSeeder.ts'],
  synchronize: true,
};

const AppDataSource = new DataSource(options);

export { AppDataSource };
