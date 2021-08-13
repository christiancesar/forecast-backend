import { getRepository, Repository } from 'typeorm';
import RefreshToken from '@modules/users/models/RefreshToken';
import { IRefreshTokenProvider } from '../model/IRefreshTokenProvider';

export default class RefreshTokenProvider implements IRefreshTokenProvider {
  private refreshTokenRepository: Repository<RefreshToken>;

  constructor() {
    this.refreshTokenRepository = getRepository(RefreshToken);
  }

  public async createRefreshToken(userId: string): Promise<string> {
    let refreshToken;

    refreshToken = this.refreshTokenRepository.create({
      userId,
    });

    refreshToken = await this.refreshTokenRepository.save(refreshToken);

    return refreshToken.token;
  }

  public async checkRefreshTokenIsValid(
    userId: string,
    token: string,
  ): Promise<boolean> {
    // token e userId devem existir e isValid tem de estar como true
    const refreshTokenIsValid = await this.refreshTokenRepository.findOne({
      where: [{ userId, token, isValid: true }],
    });

    return !!refreshTokenIsValid;
  }

  public async invalidateRefreshToken(
    userId: string,
    token: string,
  ): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: [{ userId, token, isValid: true }],
    });

    if (refreshToken) {
      await this.refreshTokenRepository.update(refreshToken.id, {
        isValid: false,
      });
    }
  }
}
