import { inject, injectable } from 'tsyringe';
import Company from '../entities/Company';
import ICompaniesRepository from '../repositories/interfaces/ICompaniesRepository';

@injectable()
export default class ListCompaniesService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(): Promise<Company[]> {
    const companies = await this.companiesRepository.findAllCompanies();
    return companies;
  }
}
