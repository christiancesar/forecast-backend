import IMailProvider from '@shared/containers/providers/MailProvider/interfaces/IMailProvider';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../../repositories/interfaces/IUsersRepository';
import IUsersTokensRepository from '../../repositories/interfaces/IUsersTokensRepository';

interface IRequest {
  userId: string;
}

@injectable()
export default class SendEmailRegisterService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute({ userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByUserId(userId);

    if (!user) {
      throw new AppError('User not exist');
    }

    const token = await this.usersTokensRepository.generateToken(user.id);

    const registerUserTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'register_user.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.firstName,
        address: user.email,
      },
      subject: 'Bem-vindo ao Forecast',
      templateData: {
        file: registerUserTemplate,
        variables: {
          appWebUrl: process.env.APP_WEB_URL || 'http://localhost:3000',
          firstName: user.firstName,
          linkResend: `${process.env.APP_API_URL}/users/send-mail-register?userId=${user.id}`,
          linkConfirm: `${process.env.APP_WEB_URL}/confirm-email?token=${token}?userId=${user.id}`,
        },
      },
    });
  }
}
