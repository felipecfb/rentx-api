import { hash } from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/accounts/infra/typeorm/entities/User';

export default class UserAdminsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const id = uuidV4();
    const password = await hash('admin', 8);

    const repository = dataSource.getRepository(User);
    await repository.save([
      {
        id: `${id}`,
        name: 'admin',
        username: 'root',
        email: 'admin@rentx.com',
        password: `${password}`,
        isAdmin: true,
        driver_license: '125215',
        created_at: new Date(),
      },
    ]);
    console.log('User Admin Created');
  }
}
