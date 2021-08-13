import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import RefreshTokenProvider from '../providers/RefreshTokenProvider/implementations/RefreshTokenProvider';
import JwtProvider from '../providers/TokenProvider/implementations/JwtProvider';
import UsersRepository from '../repositories/UsersRepository';

interface AuthenticationRequest {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  token: string;
  refreshToken: string;
}

export default class AuthenticationService {
  public async execute({
    email,
    password,
  }: AuthenticationRequest): Promise<AuthenticationResponse> {
    const jwtProvider = new JwtProvider();
    const refreshTokenProvider = new RefreshTokenProvider();
    const userRepository = getCustomRepository(UsersRepository);
    const hashProvider = new BCryptHashProvider();

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError(
        'Email or password incorrect!',
        'credential.not.matched',
        401,
      );
    }

    const passwordMatched = await hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError(
        'Email or password incorrect!',
        'credential.not.matched',
        401,
      );
    }
    const token = jwtProvider.generate(user.id, {});

    const refreshToken = await refreshTokenProvider.createRefreshToken(user.id);

    return { token, refreshToken };
  }
}
