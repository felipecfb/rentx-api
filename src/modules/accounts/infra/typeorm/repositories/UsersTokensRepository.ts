import { Repository } from 'typeorm';

import { IGenerateUserTokenDTO } from '@modules/accounts/dtos/IGenerateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppDataSource } from '@shared/infra/typeorm/data-source';

import { UsersTokens } from '../entities/UsersTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = AppDataSource.getRepository(UsersTokens);
  }

  async generate({
    expires_date,
    refresh_token,
    user_id,
  }: IGenerateUserTokenDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersTokens> {
    const usersTokens = await this.repository.findOneBy({
      user_id,
      refresh_token,
    });

    return usersTokens;
  }

  async deleteById(id: string) {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const userToken = await this.repository.findOneBy({ refresh_token });

    return userToken;
  }
}

export { UsersTokensRepository };
