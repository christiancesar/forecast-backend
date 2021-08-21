import IAddressRepository from '@modules/address/repositories/interfaces/IAddressRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../entities/User';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface IRequest {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  individualTaxNumber: string;
  password: string;
  oldPassword: string;
  addressId: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    userId,
    email,
    firstName,
    individualTaxNumber,
    lastName,
    oldPassword,
    password,
    phone,
    addressId,
  }: IRequest): Promise<User> {
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

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (addressId) {
      const address = await this.addressRepository.findByAddressId(addressId);
      if (!address) {
        throw new AppError('Address not exists!');
      }

      user.address = address;
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
