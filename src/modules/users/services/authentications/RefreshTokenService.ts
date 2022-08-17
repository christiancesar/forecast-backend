import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IRefreshTokenRepository from '../../repositories/interfaces/IRefreshTokenRepository';
import IUsersRepository from '../../repositories/interfaces/IUsersRepository';

interface RefreshTokenRequest {
  userId: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  token: string;
  newRefreshToken: string;
}

@injectable()
export default class RefreshTokenService {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    refreshToken,
  }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const user = await this.usersRepository.findByUserId(userId);

    if (!user) {
      throw new AppError('User not existis!');
    }

    if (!refreshToken) {
      throw new AppError('Refresh token is required!');
    }

    const isValidRefreshToken =
      await this.refreshTokenRepository.checkRefreshTokenIsValid(
        userId,
        refreshToken,
      );

    if (!isValidRefreshToken) {
      throw new AppError('Refresh token is invalid!');
    }

    await this.refreshTokenRepository.invalidateRefreshToken(
      userId,
      refreshToken,
    );

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const newRefreshToken =
      await this.refreshTokenRepository.createRefreshToken(userId);

    return {
      token,
      newRefreshToken,
    };
  }
}
