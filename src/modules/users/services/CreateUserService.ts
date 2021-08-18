import path from 'path';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/containers/providers/MailProvider/interfaces/IMailProvider';
import AppError from '@shared/errors/AppError';
import User from '../models/User';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';
import IUsersTokensRepository from '../repositories/interfaces/IUsersTokensRepository';

interface RequestDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({
    email,
    firstName,
    lastName,
    password,
    phone,
  }: RequestDTO): Promise<
    Omit<User, 'individualTaxNumber' | 'emailConfirmed'>
  > {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('Already exist user with this email!');
    }

    const hasPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.createUser({
      email,
      firstName,
      lastName,
      password: hasPassword,
      phone,
    });

    const token = await this.usersTokensRepository.generateToken(user.id);

    const registerUserTemplate = path.resolve(
      __dirname,
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
          firstName,
          linkResend: `${process.env.APP_API_URL}/resend-email-confirmation-register?userId=${user.id}`,
          linkConfirm: `${process.env.APP_WEB_URL}/confirm-email?token=${token}?userId=${user.id}`,
        },
      },
    });

    return user;
  }
}
