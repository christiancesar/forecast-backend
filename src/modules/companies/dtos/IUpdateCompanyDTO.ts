import Address from '@modules/address/entities/Address';

export default interface IUpdateCompanyDTO {
  companyId: string;
  name: string;
  description: string;
  isHeadquarters: boolean;
  email: string;
  phones: string[];
  stateRegistration: string;
  employerIdentificationNumber: string;
  address: Address;
}
