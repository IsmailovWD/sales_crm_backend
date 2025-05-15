import { DataSource } from 'typeorm';
import { Deal } from '../modules/deal/entities/deal.entity';
import { faker } from '@faker-js/faker';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DealStage } from '../modules/deal-stage/entities/dealStage.entity';

export class FakeDealSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(Deal);
    const dealStageRepository = dataSource.getRepository(DealStage);

    const stages = await dealStageRepository.find();
    const stageIds = stages.map((s) => s.id);

    const users: Deal[] = [];

    for (let i = 0; i < 8000; i++) {
      const s = stageIds[Math.floor(Math.random() * 5) + 1];
      if (!s) continue;
      const user = userRepository.create({
        title: faker.lorem.words(3),
        contact: {
          id: 1,
        },
        stage: {
          id: s,
        },
        tags: [],
        summa: Math.floor(Math.random() * 1000),
      });

      users.push(user);
    }

    await userRepository.save(users);
    console.log('Fake deal yaratildi');
  }
}
