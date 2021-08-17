import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

describe('Users', () => {
  it('should be able create user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    expect(user).toHaveProperty('id');
  });
});
