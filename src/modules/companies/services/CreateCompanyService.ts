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
  owners: string[];
  addressId: string;
}

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

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
    owners,
    addressId,
  }: IRequest): Promise<Company> {
    const address = await this.addressRepository.findByAddressId(addressId);

    if (!address) {
      throw new AppError('Address not exists');
    }

    const users = await this.usersRepository.findAllUsersId(owners);

    if (!users || owners.length !== users?.length) {
      throw new AppError('One or more users your list not exists!');
    }
    let company;

    company = await this.companiesRepository.createCompany({
      name,
      description,
      isHeadquarters,
      email,
      phones,
      stateRegistration,
      employerIdentificationNumber,
      address,
    });

    company.owners = users;

    company = await this.companiesRepository.saveCompany(company);

    return company;
  }
}
