import Address from '@modules/address/entities/Address';
import User from '@modules/users/entities/User';

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
