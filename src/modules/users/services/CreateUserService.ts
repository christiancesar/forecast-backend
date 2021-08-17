import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../models/User';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

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
  ) {}

  public async execute({
    email,
    firstName,
    lastName,
    password,
    phone,
  }: RequestDTO): Promise<Omit<User, 'individualTaxNumber'>> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('Already exist  user with this email!');
    }

    const hasPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.createUser({
      email,
      firstName,
      lastName,
      password: hasPassword,
      phone,
    });

    return user;
  }
}
