import Company from '@modules/companies/entities/Company';

export default interface ICreateContactDTO {
  name: string;
  email: string;
  phones: string[];
  stateRegistration: string;
  employerIdentificationNumber: string;
  company: Company;
}
