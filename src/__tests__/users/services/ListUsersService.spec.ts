import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListUserService from '@modules/users/services/ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUserService: ListUserService;

describe('Show user service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUserService = new ListUserService(fakeUsersRepository);
  });

  it('should be able to return array of users', async () => {
    const userOne = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const userTwo = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Tre',
      email: 'john.tre@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const users = await listUserService.execute();

    expect(users).toEqual([userOne, userTwo]);
  });
});
