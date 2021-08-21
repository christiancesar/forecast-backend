import RefreshToken from '@modules/users/entities/RefreshToken';
import { getRepository, Repository } from 'typeorm';
import IRefreshTokenRepository from '../interfaces/IRefreshTokenRepository';

export default class RefreshTokenRepository implements IRefreshTokenRepository {
  private ormRepository: Repository<RefreshToken>;

  constructor() {
    this.ormRepository = getRepository(RefreshToken);
  }

  public async createRefreshToken(userId: string): Promise<string> {
    let refreshToken;

    refreshToken = this.ormRepository.create({
      userId,
    });

    refreshToken = await this.ormRepository.save(refreshToken);

    return refreshToken.token;
  }

  public async checkRefreshTokenIsValid(
    userId: string,
    token: string,
  ): Promise<boolean> {
    // token e userId devem existir e isValid tem de estar como true
    const refreshTokenIsValid = await this.ormRepository.findOne({
      where: [{ userId, token, isValid: true }],
    });

    return !!refreshTokenIsValid;
  }

  public async invalidateRefreshToken(
    userId: string,
    token: string,
  ): Promise<void> {
    const refreshToken = await this.ormRepository.findOne({
      where: [{ userId, token, isValid: true }],
    });

    if (refreshToken) {
      await this.ormRepository.update(refreshToken.id, {
        isValid: false,
      });
    }
  }
}
