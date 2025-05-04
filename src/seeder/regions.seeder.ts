const DEFAULT = [
  {
    id: 1,
    name: 'Qoraqalpog‘iston Respublikasi',
  },
  {
    id: 2,
    name: 'Andijon viloyati',
  },
  {
    id: 3,
    name: 'Buxoro viloyati',
  },
  {
    id: 4,
    name: 'Jizzax viloyati',
  },
  {
    id: 5,
    name: 'Qashqadaryo viloyati',
  },
  {
    id: 6,
    name: 'Navoiy viloyati',
  },
  {
    id: 7,
    name: 'Namangan viloyati',
  },
  {
    id: 8,
    name: 'Samarqand viloyati',
  },
  {
    id: 9,
    name: 'Surxandaryo viloyati',
  },
  {
    id: 10,
    name: 'Sirdaryo viloyati',
  },
  {
    id: 11,
    name: 'Toshkent viloyati',
  },
  {
    id: 12,
    name: 'Farg‘ona viloyati',
  },
  {
    id: 13,
    name: 'Xorazm viloyati',
  },
  {
    id: 14,
    name: 'Toshkent shahri',
  },
];

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Regions } from '../modules/regions/entities/regions.entity';
import { SeederMeta } from '../modules/META/seederMeta.entity';

export class RegionsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const name = Regions.name;
    const exits = await dataSource.getRepository(SeederMeta).findOneBy({
      name,
    });

    if (exits) {
      return;
    }
    await dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Regions);

      for (let i = 0; i < DEFAULT.length; i++) {
        const region = repo.create(DEFAULT[i]);
        await repo.save(region);
      }
      await manager.getRepository(SeederMeta).save({ name });
    });
  }
}
