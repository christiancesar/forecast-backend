import UserToken from '@modules/users/models/UserToken';
import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import IUsersTokensRepository from '../interfaces/IUsersTokensRepository';

export default class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async generateToken(userId: string): Promise<string> {
    const token = uuid();

    const userToken = this.ormRepository.create({
      user_id: userId,
      token,
    });

    await this.ormRepository.save(userToken);

    return userToken.token;
  }

  async findByTokenId(
    token: string,
    userId: string,
  ): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token, user_id: userId },
    });

    return userToken;
  }
}
