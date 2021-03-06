import Address from '@modules/address/entities/Address';

export default interface ICreateCompanyDTO {
  name: string;
  description: string;
  isHeadquarters: boolean;
  email: string;
  phones: string[];
  stateRegistration: string;
  employerIdentificationNumber: string;
  address: Address;
}
