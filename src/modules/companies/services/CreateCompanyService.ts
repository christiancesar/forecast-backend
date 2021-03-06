import IAddressRepository from '@modules/address/repositories/interfaces/IAddressRepository';
import User from '@modules/users/entities/User';
import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Company from '../entities/Company';
import ICompaniesRepository from '../repositories/interfaces/ICompaniesRepository';

interface IRequest {
  name: string;
  description: string;
  isHeadquarters: boolean;
  email: string;
  phones: string[];
  stateRegistration: string;
  employerIdentificationNumber: string;
  addressId: string;
}

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    name,
    description,
    isHeadquarters,
    email,
    phones,
    stateRegistration,
    employerIdentificationNumber,
    addressId,
  }: IRequest): Promise<Company> {
    const address = await this.addressRepository.findByAddressId(addressId);

    if (!address) {
      throw new AppError('Address not exists');
    }

    // const users = await this.usersRepository.findAllUsersId(owners);

    // if (!users || owners.length !== users?.length) {
    //   throw new AppError('One or more users your list not exists!');
    // }

    const company = await this.companiesRepository.createCompany({
      name,
      description,
      email,
      employerIdentificationNumber,
      isHeadquarters,
      phones,
      address,
      stateRegistration,
    });

    return company;
  }
}
