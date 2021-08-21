import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import SendEmailRegisterService from '@modules/users/services/SendEmailRegisterService';
import FakeMailProvider from '@shared/containers/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeMailProvider: FakeMailProvider;

let sendEmailRegisterService: SendEmailRegisterService;

describe('Create user service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeMailProvider = new FakeMailProvider();

    sendEmailRegisterService = new SendEmailRegisterService(
      fakeMailProvider,
      fakeUsersRepository,
      fakeUsersTokenRepository,
    );
  });

  it('shold be able resend email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const user = await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await SendEmailRegisterService.execute({ userId: user.id });

    expect(sendMail).toHaveBeenCalled();
  });

  it('shold not be able resend email when user not exists', async () => {
    await fakeUsersRepository.createUser({
      firstName: 'Jonh',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '123456',
      phone: '65999999999',
    });

    await expect(
      SendEmailRegisterService.execute({ userId: 'user-not-exists' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
