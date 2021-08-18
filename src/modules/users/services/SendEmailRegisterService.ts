import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/containers/providers/MailProvider/interfaces/IMailProvider';
import path from 'path';
import { v4 as uuid } from 'uuid';

interface IRequest {
  firstName: string;
  email: string;
}

@injectable()
export default class SendEmailRegisterService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({ firstName, email }: IRequest): Promise<void> {
    const token = uuid();

    const registerUserTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'register_user.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: firstName,
        address: email,
      },
      subject: 'Bem-vindo ao Forecast',
      templateData: {
        file: registerUserTemplate,
        variables: {
          appWebUrl: process.env.APP_WEB_URL || 'http://localhost:3333',
          firstName,
          link: `${process.env.APP_WEB_URL}/confirm-email?token=${token}`,
        },
      },
    });
  }
}
