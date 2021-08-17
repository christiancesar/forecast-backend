import FakeRefreshTokenRepository from '@modules/users/repositories/fakes/FakeRefreshTokenRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import RefreshTokenService from '@modules/users/services/RefreshTokenService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeRefreshTokenRepository: FakeRefreshTokenRepository;
let refreshTokenService: RefreshTokenService;

describe('Refresh token service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRefreshTokenRepository = new FakeRefreshTokenRepository();
    refreshTokenService = new RefreshTokenService(
      fakeRefreshTokenRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create refresh token', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const refreshToken = await fakeRefreshTokenRepository.createRefreshToken(
      user.id,
    );

    const newRefreshToken = await refreshTokenService.execute({
      refreshToken,
      userId: user.id,
    });

    expect(newRefreshToken).toHaveProperty('token');
    expect(newRefreshToken).toHaveProperty('newRefreshToken');
  });

  it('should not be able to create refresh token when user not exists', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const refreshToken = await fakeRefreshTokenRepository.createRefreshToken(
      user.id,
    );

    await expect(
      refreshTokenService.execute({
        refreshToken,
        userId: 'user-not-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create refresh token when refreshToken is invalid', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await fakeRefreshTokenRepository.createRefreshToken(user.id);

    await expect(
      refreshTokenService.execute({
        refreshToken: 'refreshToken-not-valid',
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create refresh token when refreshToken is null', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await fakeRefreshTokenRepository.createRefreshToken(user.id);

    await expect(
      refreshTokenService.execute({
        refreshToken: '',
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
