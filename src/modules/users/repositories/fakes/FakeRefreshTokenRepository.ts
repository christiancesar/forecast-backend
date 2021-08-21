import { v4 as uuid } from 'uuid';
import RefreshToken from '@modules/users/entities/RefreshToken';
import IRefreshTokenRepository from '../interfaces/IRefreshTokenRepository';

export default class RefreshTokenRepository implements IRefreshTokenRepository {
  private refreshTokens: RefreshToken[] = [];

  public async createRefreshToken(userId: string): Promise<string> {
    const refreshToken = new RefreshToken();

    Object.assign(refreshToken, {
      id: uuid(),
      userId,
      token: uuid(),
      isValid: true,
    });

    this.refreshTokens.push(refreshToken);

    return refreshToken.token;
  }

  public async checkRefreshTokenIsValid(
    userId: string,
    token: string,
  ): Promise<boolean> {
    // token e userId devem existir e isValid tem de estar como true
    const refreshTokenIsValid = this.refreshTokens.find(
      refreshToken =>
        refreshToken.token === token &&
        refreshToken.userId === userId &&
        refreshToken.isValid === true,
    );

    return !!refreshTokenIsValid;
  }

  public async invalidateRefreshToken(
    userId: string,
    token: string,
  ): Promise<void> {
    const refreshTokenExist = this.refreshTokens.find(
      refreshToken =>
        refreshToken.token === token &&
        refreshToken.userId === userId &&
        refreshToken.isValid === true,
    );

    if (refreshTokenExist) {
      const refreshTokenIndex = this.refreshTokens.indexOf(refreshTokenExist);
      this.refreshTokens[refreshTokenIndex].isValid = false;
    }
  }
}
