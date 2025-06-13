import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../src/modules/users/entities/user.entity';
// import { SeederMeta } from '../modules/META/seederMeta.entity';

export class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const name = UserSeeder.name;
    // const exits = await dataSource.getRepository(SeederMeta).findOneBy({
    //   name,
    // });

    // if (exits) {
    //   return;
    // }
    await dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(User);

      const user = repo.create([
        {
          fullName: 'Ismoilov Muhammadjon',
          password:
            '2b$10$KJRkx2c1nn7QXlzNL2eWx.3o3vpAjV5.zL2PVYGXTTf9Mv.vp3uym', // 123456,
          username: 'Programmer',
        },
        {
          fullName: 'Admin',
          password:
            '2b$10$KJRkx2c1nn7QXlzNL2eWx.3o3vpAjV5.zL2PVYGXTTf9Mv.vp3uym', // 123456,
          username: 'Admin',
        },
      ]);
      await repo.save(user);

      // await manager.getRepository(SeederMeta).save({ name });
    });
  }
}
