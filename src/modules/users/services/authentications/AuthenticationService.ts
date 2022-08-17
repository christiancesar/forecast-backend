import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../../providers/HashProvider/interfaces/IHashProvider';
import IRefreshTokenRepository from '../../repositories/interfaces/IRefreshTokenRepository';
import IUsersRepository from '../../repositories/interfaces/IUsersRepository';

interface AuthenticationRequest {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  token: string;
  refreshToken: string;
}

@injectable()
export default class AuthenticationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  public async execute({
    email,
    password,
  }: AuthenticationRequest): Promise<AuthenticationResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Email or password incorrect!',
        'credential.not.matched',
        401,
      );
    }

    if (!password) {
      throw new AppError(
        'Email or password incorrect!',
        'credential.not.matched',
        401,
      );
    }

    if (!user.confirmedEmail) {
      throw new AppError(
        'Account not corfirmation',
        'credential.not.confirmation',
        401,
      );
    }
    const passwordMatched = await this.hashProvider.compareHash(
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
    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user.id,
    );

    return { token, refreshToken };
  }
}
