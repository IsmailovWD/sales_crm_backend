const DEFAULT = [
  {
    id: 1,
    name: 'Yangi',
    is_deleted: false,
    key: 'new',
    color: '#2080f0',
  },
  {
    id: 2,
    name: 'Qabul qilingan',
    is_deleted: false,
    key: 'accepted',
    color: '#8a2be2',
  },
  {
    id: 3,
    name: 'Yetkazib berishda',
    is_deleted: false,
    key: 'delivering',
    color: '#f0a020',
  },
  {
    id: 4,
    name: 'Yakunlandi',
    is_deleted: false,
    key: 'done',
    color: '#18a058',
  },
  {
    id: 5,
    name: 'Bekor qilindi',
    is_deleted: false,
    key: 'canceled',
    color: '#d03050',
  },
];

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { DealStage } from '../modules/deal-stage/entities/dealStage.entity';
import { SeederMeta } from '../modules/META/seederMeta.entity';

export class DealStageSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const name = DealStageSeeder.name;
    const exits = await dataSource.getRepository(SeederMeta).findOneBy({
      name,
    });

    if (exits) {
      return;
    }
    await dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(DealStage);

      // for (let i = 0; i < DEFAULT.length; i++) {
      //   const user = repo.create(DEFAULT[i]);
      //   await repo.save(user);
      // }
      await repo.save(DEFAULT);
      await manager.getRepository(SeederMeta).save({ name });
    });
  }
}
