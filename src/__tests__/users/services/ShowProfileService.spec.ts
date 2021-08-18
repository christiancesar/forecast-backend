import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('Show profile user service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to return user', async () => {
    const userOne = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const user = await showProfileService.execute({ userId: userOne.id });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to return user when not existis', async () => {
    await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await expect(
      showProfileService.execute({
        userId: 'user-not-exists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
