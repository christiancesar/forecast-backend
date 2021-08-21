import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import Company from '@modules/companies/entities/Company';
import { getRepository, Repository } from 'typeorm';
import ICompaniesRepository from '../interfaces/ICompaniesRepository';

export default class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  async createCompany({
    name,
    description,
    isHeadquarters,
    email,
    phones,
    stateRegistration,
    employerIdentificationNumber,
    address,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create({
      name,
      description,
      isHeadquarters,
      email,
      phones,
      stateRegistration,
      employerIdentificationNumber,
      address,
    });
    await this.ormRepository.save(company);

    return company;
  }

  async saveCompany(data: Company): Promise<Company> {
    return this.ormRepository.save(data);
  }
}
