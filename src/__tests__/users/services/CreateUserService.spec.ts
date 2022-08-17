import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import CreateUserService from '@modules/users/services/users/CreateUserService';
import FakeMailProvider from '@shared/containers/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeMailProvider: FakeMailProvider;

let createUser: CreateUserService;

describe('Create user service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeMailProvider = new FakeMailProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeMailProvider,
      fakeUsersTokenRepository,
    );
  });

  it('should be able to create user and send email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const user = await createUser.execute({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    expect(user).toHaveProperty('id');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await expect(
      createUser.execute({
        firstName: 'Jonh',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: '123456',
        phone: '65999999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
