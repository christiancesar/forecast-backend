import UserToken from '@modules/users/entities/UserToken';

export default interface IUsersTokensRepository {
  generateToken(userId: string): Promise<string>;
  findByTokenId(token: string, userId: string): Promise<UserToken | undefined>;
  updateToken(userToken: UserToken): Promise<UserToken>;
}
