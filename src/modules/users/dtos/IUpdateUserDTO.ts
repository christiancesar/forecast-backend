import Address from '@modules/address/entities/Address';
import Company from '@modules/companies/entities/Company';

export default interface IUpdateUserDTO {
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  individualTaxNumber: string;
  password: string;
  // avatar: string;
  address: Address;
  companies: Company[];
}
