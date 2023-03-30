import { hash } from 'bcryptjs';
import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import { AppDataSource } from '@shared/infra/typeorm/data-source';

describe('Create Category Controller', () => {
  beforeAll(async () => {
    const id = uuid();
    const password = await hash('admin', 8);

    await AppDataSource.initialize()
      .then(async () => {
        await AppDataSource.dropDatabase();
        await AppDataSource.runMigrations();
        await AppDataSource.transaction(async transactionalEntityManager => [
          await transactionalEntityManager.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'XXXXXX', 'now()')`,
          ),
        ]);
      })
      .catch(err => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(() => {
    AppDataSource.destroy();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest description',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest description',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});
