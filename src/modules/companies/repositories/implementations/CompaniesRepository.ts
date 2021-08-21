import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import IUpdateCompanyDTO from '@modules/companies/dtos/IUpdateCompanyDTO';
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

  async findAllCompanies(): Promise<Company[]> {
    const companies = await this.ormRepository.find();
    return companies;
  }

  async findByCompanyId(companyId: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({
      where: { id: companyId },
    });

    return company;
  }

  async findByCompaniesIds(
    companiesIds: string[],
  ): Promise<Company[] | undefined> {
    const companies = await this.ormRepository.findByIds(companiesIds);
    return companies;
  }

  async updateCompany({
    companyId,
    name,
    email,
    description,
    phones,
    stateRegistration,
    isHeadquarters,
    employerIdentificationNumber,
    address,
  }: IUpdateCompanyDTO): Promise<Company> {
    const company = await this.ormRepository.save({
      id: companyId,
      name,
      email,
      description,
      phones,
      stateRegistration,
      isHeadquarters,
      employerIdentificationNumber,
      address,
    });

    return company;
  }
}
