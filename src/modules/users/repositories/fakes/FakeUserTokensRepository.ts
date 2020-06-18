import { uuid } from 'uuidv4';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokenRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokenRepository {
  private usersTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.usersTokens.find(userToken => userToken.token === token);
  }
}

export default FakeUserTokensRepository;
