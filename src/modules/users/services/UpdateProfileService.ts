import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateUserDTO from '../dto/IUpdateUserDTO';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import User from '../models/User';

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    userId,
    email,
    firstName,
    individualTaxNumber,
    lastName,
    old_password,
    password,
    phone,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findByUserId(userId);

    if (!user) {
      throw new AppError('User not existis!');
    }

    if (email && user.email !== email) {
      const emailExist = await this.usersRepository.findByEmail(email);

      if (emailExist) {
        throw new AppError('Already exist user with this email!');
      }
      user.email = email;
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.firstName = firstName === user.firstName ? user.firstName : firstName;
    user.individualTaxNumber =
      individualTaxNumber === user.individualTaxNumber
        ? user.individualTaxNumber
        : individualTaxNumber;
    user.lastName = lastName === user.lastName ? user.lastName : lastName;
    user.phone = phone === user.phone ? user.phone : phone;

    return this.usersRepository.saveUser(user);
  }
}
