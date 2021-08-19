import path from 'path';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/containers/providers/MailProvider/interfaces/IMailProvider';
import AppError from '@shared/errors/AppError';
import Address from '@modules/address/models/Address';
import IAddressRepository from '@modules/address/repositories/interfaces/IAddressRepository';
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

interface ICreateUserServiceDTO extends RequestDTO {
  address: Address;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('AddresRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    email,
    firstName,
    lastName,
    password,
    phone,
    address,
  }: ICreateUserServiceDTO): Promise<
    Omit<User, 'individualTaxNumber' | 'emailConfirmed'>
  > {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('Already exist user with this email!');
    }

    const newAddres = await this.addressRepository.createAddress(address);

    const hasPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.createUser({
      email,
      firstName,
      lastName,
      password: hasPassword,
      phone,
      addressId: newAddres.id,
    });

    return user;
  }
}
