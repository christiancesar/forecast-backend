import UserToken from '@modules/users/entities/UserToken';
import { v4 as uuid } from 'uuid';
import IUsersTokensRepository from '../interfaces/IUsersTokensRepository';

export default class UsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async generateToken(userId: string): Promise<string> {
    const userToken = {
      id: uuid(),
      token: uuid(),
      userId,
      expiresIn: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as UserToken;

    this.usersTokens.push(userToken);

    return userToken.token;
  }

  async findByTokenId(
    token: string,
    userId: string,
  ): Promise<UserToken | undefined> {
    const userTokenExist = this.usersTokens.find(
      userToken => userToken.userId === userId && userToken.token === token,
    );

    return userTokenExist;
  }

  async updateToken(userToken: UserToken): Promise<UserToken> {
    const userTokenIndex = await this.usersTokens.findIndex(
      element => element === userToken,
    );

    this.usersTokens[userTokenIndex] = userToken;

    return userToken;
  }
}
