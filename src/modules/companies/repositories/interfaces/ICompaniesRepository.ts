import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import IUpdateCompanyDTO from '@modules/companies/dtos/IUpdateCompanyDTO';
import Company from '@modules/companies/entities/Company';

export default interface ICompaniesRepository {
  createCompany(data: ICreateCompanyDTO): Promise<Company>;
  saveCompany(data: Company): Promise<Company>;
  updateCompany(data: IUpdateCompanyDTO): Promise<Company>;
  findAllCompanies(): Promise<Company[]>;
  findByCompanyId(companyId: string): Promise<Company | undefined>;
  findByCompaniesIds(companies: string[]): Promise<Company[] | undefined>;
}
