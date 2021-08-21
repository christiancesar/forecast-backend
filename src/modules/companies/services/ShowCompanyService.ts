import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Company from '../entities/Company';
import ICompaniesRepository from '../repositories/interfaces/ICompaniesRepository';

interface IRequest {
  companyId: string;
}

@injectable()
export default class ShowCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ companyId }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findByCompanyId(companyId);
    if (!company) {
      throw new AppError('Company not exists!');
    }

    return company;
  }
}
