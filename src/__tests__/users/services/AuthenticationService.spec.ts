import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeRefreshTokenRepository from '@modules/users/repositories/fakes/FakeRefreshTokenRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AuthenticationService from '@modules/users/services/AuthenticationService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeRefreshTokenRepository: FakeRefreshTokenRepository;
let authenticationService: AuthenticationService;

describe('Authentication Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeRefreshTokenRepository = new FakeRefreshTokenRepository();

    authenticationService = new AuthenticationService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeRefreshTokenRepository,
    );
  });

  it('should be able to authentication', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    user.confirmedEmail = true;

    await fakeUsersRepository.saveUser(user);

    const response = await authenticationService.execute({
      email: 'john.doe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('refreshToken');
  });

  it('should not be able to authentication with wrong password', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    user.confirmedEmail = true;

    await fakeUsersRepository.saveUser(user);

    await expect(
      authenticationService.execute({
        email: 'john.doe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authentication password not exists', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    user.confirmedEmail = true;

    await fakeUsersRepository.saveUser(user);

    await expect(
      authenticationService.execute({
        email: 'john.doe@example.com',
        password: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authentication with wrong email', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    user.confirmedEmail = true;

    await fakeUsersRepository.saveUser(user);

    await expect(
      authenticationService.execute({
        email: 'john.tre@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authentication when email not confirmation', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    // console.log(user);

    await expect(
      authenticationService.execute({
        email: 'john.tre@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
