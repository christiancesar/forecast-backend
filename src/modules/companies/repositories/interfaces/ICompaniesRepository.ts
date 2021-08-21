import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import Company from '@modules/companies/entities/Company';

export default interface ICompaniesRepository {
  createCompany(data: ICreateCompanyDTO): Promise<Company>;
  saveCompany(data: Company): Promise<Company>;
}
