import IAddressRepository from '@modules/address/repositories/interfaces/IAddressRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Company from '../entities/Company';
import ICompaniesRepository from '../repositories/interfaces/ICompaniesRepository';

interface IRequest {
  companyId: string;
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
export default class UpdateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    companyId,
    name,
    description,
    email,
    phones,
    isHeadquarters,
    stateRegistration,
    employerIdentificationNumber,
    addressId,
  }: IRequest): Promise<Company> {
    const address = await this.addressRepository.findByAddressId(addressId);

    if (!address) {
      throw new AppError('Address not exists');
    }

    const companyExists = await this.companiesRepository.findByCompanyId(
      companyId,
    );

    if (!companyExists) {
      throw new AppError('Company not existis');
    }

    const company = await this.companiesRepository.updateCompany({
      companyId,
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
