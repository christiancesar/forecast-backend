import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import EmailValidateService from '@modules/users/services/EmailValidateService';

let fakeUsersRepository: FakeUsersRepository;
let emailValidateService: EmailValidateService;

describe('Email validate service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    emailValidateService = new EmailValidateService(fakeUsersRepository);
  });

  it('should be able to return true when the email exists', async () => {
    await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const response = await emailValidateService.execute({
      email: 'john.doe@example.com',
    });

    expect(response).toBe(true);
  });

  it('should be able to return false when the email not exists ', async () => {
    await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    const response = await emailValidateService.execute({
      email: 'john.tre@example.com',
    });

    expect(response).toBe(false);
  });
});
