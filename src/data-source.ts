// data-source.ts
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import type { DataSourceOptions } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';

import { DealStageSeeder } from './seeder/deal-stage.seeder';
import { RegionsSeeder } from './seeder/regions.seeder';
import { DistrictsSeeder } from './seeder/districts.seeder';
import { UserSeeder } from './seeder/user.seeder';
import { FakeDealSeeder } from './seeder/fake-deal.seeder';
import config from './config/config';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  port: +(config.DB_PORT || 0) || 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: false,
  logging: config.NODE_ENV === 'development',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
  seeds: [
    DealStageSeeder,
    RegionsSeeder,
    DistrictsSeeder,
    UserSeeder,
    FakeDealSeeder,
  ],
};

export const AppDataSource = new DataSource(options);

AppDataSource.initialize()
  .then(async () => {
    await runSeeders(AppDataSource);
    console.log('✅ Seed completed');
  })
  .catch(console.error);
