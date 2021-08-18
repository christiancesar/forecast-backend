import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('Show profile user service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const userUpdated = await updateProfileService.execute({
      userId: user.id,
      email: user.email,
      firstName: 'Renato',
      lastName: 'Alderburg',
      individualTaxNumber: '02415478645',
      phone: '94874452125',
      old_password: '',
      password: '',
    });

    expect(userUpdated.firstName).not.toEqual('John');
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const userUpdated = await updateProfileService.execute({
      userId: user.id,
      email: 'renato.alderburg@example.com',
      firstName: 'Renato',
      lastName: 'Alderburg',
      individualTaxNumber: '02415478645',
      phone: '94874452125',
      old_password: '123456',
      password: '123456789',
    });

    expect(userUpdated.password).not.toEqual('123456');
  });

  it('should not be able to update user when user not exist', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await expect(
      updateProfileService.execute({
        userId: 'user-id-not-exists',
        email: user.email,
        firstName: 'Renato',
        lastName: 'Alderburg',
        individualTaxNumber: '02415478645',
        phone: '94874452125',
        old_password: '123456',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update email user when email send null', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const userUpdated = await updateProfileService.execute({
      userId: user.id,
      email: '',
      firstName: 'Renato',
      lastName: 'Alderburg',
      individualTaxNumber: '02415478645',
      phone: '94874452125',
      old_password: '',
      password: '',
    });

    expect(userUpdated.email).toEqual('john.doe@example.com');
  });

  it('should not be able to update user when old password not matched', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        email: user.email,
        firstName: 'Renato',
        lastName: 'Alderburg',
        individualTaxNumber: '02415478645',
        phone: '94874452125',
        old_password: 'passoword-wrong',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user when email alredy exist', async () => {
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'True',
      email: 'john.true@example.com',
      password: '123456',
      phone: '65999988888',
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        email: 'john.true@example.com',
        firstName: 'Renato',
        lastName: 'Alderburg',
        individualTaxNumber: '02415478645',
        phone: '94874452125',
        old_password: 'passoword-wrong',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
