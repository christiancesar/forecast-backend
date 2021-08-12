import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import RefreshTokenProvider from '../providers/RefreshTokenProvider/implementations/RefreshTokenProvider';
import JwtProvider from '../providers/TokenProvider/implementations/JwtProvider';
import UsersRepository from '../repositories/UsersRepository';

interface RefreshTokenRequest {
  userId: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  token: string;
  newRefreshToken: string;
}

export default class RefreshTokenService {
  public async execute({
    userId,
    refreshToken,
  }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const jwtProvider = new JwtProvider();
    const refreshTokenProvider = new RefreshTokenProvider();
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not found!');
    }

    if (!refreshToken) {
      throw new AppError('Refresh token is required!');
    }

    const isValidRefreshToken =
      await refreshTokenProvider.checkRefreshTokenIsValid(userId, refreshToken);

    if (!isValidRefreshToken) {
      throw new AppError('Refresh token is invalid!');
    }

    await refreshTokenProvider.invalidateRefreshToken(userId, refreshToken);

    const token = jwtProvider.generate(userId, {});

    const newRefreshToken = await refreshTokenProvider.createRefreshToken(
      userId,
    );

    return {
      token,
      newRefreshToken,
    };
  }
}
