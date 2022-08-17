import IAddressRepository from '@modules/address/repositories/interfaces/IAddressRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../../entities/User';
import IHashProvider from '../../providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../../repositories/interfaces/IUsersRepository';
import IUsersTokensRepository from '../../repositories/interfaces/IUsersTokensRepository';

interface RequestDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  addressId: string;
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

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    email,
    firstName,
    lastName,
    password,
    phone,
    addressId,
  }: RequestDTO): Promise<
    Omit<User, 'individualTaxNumber' | 'emailConfirmed'>
  > {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('Already exist user with this email!');
    }

    const address = await this.addressRepository.findByAddressId(addressId);

    if (address) {
      throw new AppError('Address not exists!');
    }

    const hasPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.createUser({
      email,
      firstName,
      lastName,
      password: hasPassword,
      phone,
      address,
    });

    return user;
  }
}
