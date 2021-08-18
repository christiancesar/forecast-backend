import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ConfirmationRegisterService from '@modules/users/services/ConfirmationRegisterService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let confirmationRegisterService: ConfirmationRegisterService;

describe('Refresh token service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    confirmationRegisterService = new ConfirmationRegisterService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
    );
  });

  it('should be able confirmartion mail', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const token = await fakeUsersTokensRepository.generateToken(user.id);

    await confirmationRegisterService.execute({ token, userId: user.id });

    expect(user.confirmedEmail).toEqual(true);
  });

  it('should not be able confirmartion mail when user not exists', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const token = await fakeUsersTokensRepository.generateToken(user.id);

    await expect(
      confirmationRegisterService.execute({
        token,
        userId: 'user.id-not-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able confirmartion mail when token is invalid', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await fakeUsersTokensRepository.generateToken(user.id);

    await expect(
      confirmationRegisterService.execute({
        token: 'token-invalid',
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able confirmartion mail when token expired', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const token = await fakeUsersTokensRepository.generateToken(user.id);

    const userToken = await fakeUsersTokensRepository.findByTokenId(
      token,
      user.id,
    );

    const { expiresIn } = userToken!;

    expiresIn.setDate(expiresIn.getDate() - 2); // 24h

    userToken!.expiresIn = expiresIn;

    await fakeUsersTokensRepository.updateToken(userToken!);

    await expect(
      confirmationRegisterService.execute({
        token: userToken!.token,
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
