import IAddressRepository from '@modules/address/repositories/interfaces/IAddressRepository';
import ICompaniesRepository from '@modules/companies/repositories/interfaces/ICompaniesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import User from '../../entities/User';
import IHashProvider from '../../providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../../repositories/interfaces/IUsersRepository';

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
  companiesIds: string[];
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

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
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
    companiesIds,
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

    if (companiesIds) {
      const companies = await this.companiesRepository.findByCompaniesIds(
        companiesIds,
      );

      if (!companies || companies?.length !== companiesIds.length) {
        throw new AppError('One or more companies not exists!');
      }

      user.companies = companies;
    }

    const updatedUser = await this.usersRepository.updateUser({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      individualTaxNumber: user.individualTaxNumber,
      password: user.password,
      phone: user.phone,
      address: user.address,
      companies: user.companies,
    });

    return updatedUser;
  }
}
