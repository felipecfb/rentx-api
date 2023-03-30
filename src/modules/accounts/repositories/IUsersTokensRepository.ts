import { IGenerateUserTokenDTO } from '../dtos/IGenerateUserTokenDTO';
import { UsersTokens } from '../infra/typeorm/entities/UsersTokens';

interface IUsersTokensRepository {
  generate({
    expires_date,
    refresh_token,
    user_id,
  }: IGenerateUserTokenDTO): Promise<UsersTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UsersTokens>;
}

export { IUsersTokensRepository };
