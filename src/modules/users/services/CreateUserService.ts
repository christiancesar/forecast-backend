import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface RequestDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  individualTaxNumber: string;
  password: string;
}

export default class CreateUserService {
  public async execute({
    email,
    firstName,
    lastName,
    password,
    phone,
  }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const hashProvider = new BCryptHashProvider();

    const userExist = await usersRepository.findOne({ where: { email } });

    if (userExist) {
      throw new AppError('Already exist  user with this email!');
    }

    const hasPassword = await hashProvider.generateHash(password);

    const user = await usersRepository.createUser({
      email,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      password: hasPassword,
      phone,
    });

    return user;
  }
}
