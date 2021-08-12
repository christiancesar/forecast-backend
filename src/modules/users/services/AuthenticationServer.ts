import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
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

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    if (user.password !== password) {
      throw new AppError('Email or password incorrect!');
    }
    const token = jwtProvider.generate(user.id, {});
    const refreshToken = await refreshTokenProvider.createRefreshToken(user.id);

    return { token, refreshToken };
  }
}
