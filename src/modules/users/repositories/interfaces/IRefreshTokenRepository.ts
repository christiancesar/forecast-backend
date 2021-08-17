export default interface IRefreshTokenRepository {
  createRefreshToken(user_id: string): Promise<string>;
  checkRefreshTokenIsValid(userId: string, token: string): Promise<boolean>;
  invalidateRefreshToken(userId: string, token: string): Promise<void>;
}
