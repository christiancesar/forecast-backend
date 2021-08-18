import UserToken from '@modules/users/models/UserToken';

export default interface IUsersTokensRepository {
  generateToken(userId: string): Promise<string>;
  findByTokenId(token: string, userId: string): Promise<UserToken | undefined>;
}
