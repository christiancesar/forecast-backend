import Company from '@modules/companies/entities/Company';

export default interface ICreateContactDTO {
  contactId: string;
  name: string;
  email: string;
  phones: string[];
  stateRegistration: string;
  employerIdentificationNumber: string;
  company: Company;
}
